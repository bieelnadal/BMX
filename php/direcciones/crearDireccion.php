<?php
// headers
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// includes
include_once("../conexion/db.php");

// clases
$bd = new claseBD();
$con = $bd->obtenerConexion();
class Result
{
}
$response = new Result();

// input body
$json = file_get_contents('php://input');
$direccion = json_decode($json);

// query
$queryInsert = "INSERT INTO `direccion`(`idDireccion`, `Direccion`, `Pais`, `Localidad`, `codigoPostal`, `idUsuario`) VALUES (null,'$direccion->Direccion',$direccion->Pais,'$direccion->Localidad','$direccion->codigoPostal',$direccion->idUsuario";



$querySelect = "SELECT * FROM `direccion` WHERE `Direccion` = '$direccion->Direccion'";

$resInsert = mysqli_query($con, $queryInsert);

$resSelect = mysqli_query($con, $querySelect);

if ($resSelect) {

    $response->resultado = 'ok';
    $response->mensaje = 'Se ha registrado correctamente';
    $response->data = mysqli_fetch_array($resSelect);
    echo json_encode($response);
} else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error con la base de datos';
    echo json_encode($response);
    exit;
}

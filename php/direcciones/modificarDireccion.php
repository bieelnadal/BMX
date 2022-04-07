<?php
// headers
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");

// includes
include_once("../conexion/db.php");

// clases
// clase conexión
$bd = new claseBD();
$con = $bd->obtenerConexion();

// clase respuesta
class Result
{
}
$response = new Result();

// input body
$json = file_get_contents('php://input');
$direccion = json_decode($json);



$queryUpdate = "UPDATE `direccion` SET `idDireccion`=$direccion->idDireccion,`Direccion`='$direccion->Direccion',`Pais`=$direccion->Pais,`Localidad`='$direccion->Localidad',`codigoPostal`='$direccion->codigoPostal',`idUsuario`=$direccion->idUsuario, `Predeterminado`=$direccion->Predeterminado WHERE `idDireccion`=$direccion->idDireccion";
$resUpdate = mysqli_query($con, $queryUpdate);

// validacion de la query
// si se hace bien el insert
if ($resUpdateSinPass) {

    // si se hace bien el select devolvemos el alumno recién registrado
    $resSelect = mysqli_query($con, $querySelect);
    if ($resSelect) {
        $response->resultado = 'ok';
        $response->mensaje = 'Se modificó la dirección con éxito';
        $response->user = $user;
        $data = mysqli_fetch_array($resSelect);
        $response->data = $data;
        echo json_encode($response);
        exit;
    } else {
        $response->resultado = 'error';
        $response->mensaje = 'Hubo un error al modificar la dirección';
        $response->user = $user;
        echo json_encode($response);
        exit;
    }
} else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar al alumno';
    $response->user = $user;
    echo json_encode($response);
    exit;
}

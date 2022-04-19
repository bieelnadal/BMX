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

$queryBorrarPredeterminado = "UPDATE `direccion` SET `Predeterminado`=0 WHERE `idUsuario`=$direccion->idUsuario";
mysqli_query($con, $queryBorrarPredeterminado);

$queryUpdate = "UPDATE `direccion` SET `Predeterminado`=1 WHERE `idDireccion`=$direccion->idDireccion";
$resUpdate = mysqli_query($con, $queryUpdate);

// validacion de la query
// si se hace bien el insert
if ($resUpdateSinPass) {

    // si se hace bien el select devolvemos el alumno recién registrado
    $resSelect = mysqli_query($con, $querySelect);
    if ($resSelect) {
        $response->resultado = 'ok';
        $response->mensaje = 'Se modificó el predeterminado con éxito';
        $response->user = $user;
        $data = mysqli_fetch_array($resSelect);
        $response->data = $data;
        echo json_encode($response);
        exit;
    } else {
        $response->resultado = 'error';
        $response->mensaje = 'Hubo un error al modificar el predeterminado';
        $response->user = $user;
        echo json_encode($response);
        exit;
    }
} else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error';
    $response->user = $user;
    echo json_encode($response);
    exit;
}

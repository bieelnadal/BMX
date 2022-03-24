<?php
// headers
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// includes
include_once("../conexion/db.php");

// clases
// clase conexión
$bd = new claseBD();
$con = $bd->obtenerConexion();

// clase respuesta
class Result{}
$response = new Result();

// input body
$json = file_get_contents('php://input');
$user = json_decode($json);

// encriptar pass
$encryptedPass = sha1($user->Passcode);

// query
$query = "SELECT Passcode FROM `usuarios` WHERE idUsuario='$user->idUsuario'";
$res = mysqli_query($con, $query);

// validación de la query
if ($res) {
    $datosPass = mysqli_fetch_assoc($res);
    if ($datosPass['Passcode'] != $encryptedPass) {
        $response->resultado = 'error';
        $response->mensaje = 'Esta pass no está en uso';
        $response->oldpass = $datosPass['Passcode'];
        $response->newpass = $encryptedPass;
        echo json_encode($response);
    } else {
        $response->resultado = 'ok';
        $response->mensaje = 'Esta pass está en uso';
        $response->oldpass = $datosPass['Passcode'];
        $response->newpass = $encryptedPass;
        echo json_encode($response);
    }
} else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema con la base de datos';
    echo json_encode($response);
}

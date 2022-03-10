<?php
// headers
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$user = json_decode($json);


include_once("../conexion/db.php");
include_once("../JWT/generarToken.php");


$db = new claseBD();
$con = $db->obtenerConexion();
class Result
{
}
$response = new Result();

$hash = $user->passcode;
// echo json_encode("Hash passcode ".$hash);
$hash = sha1($hash);
// echo json_encode("Passcode ".$user->passcode);
// echo json_encode("hash ".$hash);

$queryLogin = "SELECT * FROM usuarios WHERE Email='$user->email' and Passcode='$hash'";

$resulta = mysqli_query($con, $queryLogin);

if ($resulta) {
  $data = mysqli_fetch_array($resulta);
  $response->select = 'Select a base de datos correcto';

  $response->resultado = 'ok';
  $response->mensaje = 'Se encontró al usuario';
  $response->data = $data;
  $response->accessToken = json_encode($jwt);
  echo json_encode($response);
} else {
  $response->resultado = 'error';
  $response->mensaje = 'No se pudo realizar el select a base de datos';
  echo json_encode($response);
}

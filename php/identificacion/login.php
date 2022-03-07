<?php
// headers
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$user = json_decode($json);

// includes
include_once("../conexion/db.php");
//include_once("../tokenJWT/generarToken.php");

// clases
$bd = new claseBD();
$con = $bd->obtenerConexion();
class Result
{
}
$response = new Result();

$hash = $user->pass;
$hash = sha1($hash);
// query
$queryLogin = "SELECT * FROM usuarios WHERE Email='$user->email' and Passcode='$hash'";

$resulta = mysqli_query($con, $queryLogin);

// si la query ha sido correcta entramos
if ($resulta) {
  $dataAlumno = mysqli_fetch_array($resulta);
  $response->select = 'Select a base de datos correcto';

  $response->resultado = 'ok';
  $response->mensaje = 'Se encontró al usuario';
  $response->data = $dataAlumno;
  $response->accessToken = json_encode($jwt);
  echo json_encode($response);
} else {
  $response->resultado = 'error';
  $response->mensaje = 'No se pudo realizar el select a base de datos';
  echo json_encode($response);
}

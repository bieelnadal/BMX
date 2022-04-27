<?php
// headers

header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Method: POST');
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

$hash = $user->Passcode;

$hash = sha1($hash);

$queryLogin = "SELECT * FROM usuarios WHERE Email='$user->Email' and Passcode='$hash'";

$resulta = mysqli_query($con, $queryLogin);

if ($resulta) {

  $data = mysqli_fetch_array($resulta);
  $response->select = 'Select a base de datos correcto';

 


  if (!is_null($data)) {
    $data['Passcode']=$user->Passcode;
    $response->resultado = 'ok';
    $response->mensaje = 'Se encontró al usuario';

    $response->resultado = 'ok';
    $response->mensaje = 'Se encontró al usuario';
    $response->data = $data;
    $response->accessToken = json_encode($jwt);
    echo json_encode($response);
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'error';
    echo json_encode($response);
  }
} else {
  $response->resultado = 'error';
  $response->mensaje = 'No se pudo realizar el select a base de datos';
  echo json_encode($response);
}

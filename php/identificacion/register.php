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
$usuario = json_decode($json);

// Hash pwd
$hash = sha1($usuario->Passcode);

// query
$queryInsert = "INSERT INTO `usuarios`(`idUsuario`, `Nombre`, `Apellidos`, `Email`, `Passcode`, `Imagen`, `DNI`, `idAdmin`) VALUES 
(NULL,'$usuario->Nombre','$usuario->Apellidos','$usuario->Email','$hash','$usuario->Imagen','$usuario->DNI',0)";



$querySelect = "SELECT * FROM `usuarios` WHERE Email = '$usuario->Email'";

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

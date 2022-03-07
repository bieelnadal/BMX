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
$hash = sha1($usuario->passcode);

// query
$queryInsert = "INSERT INTO `usuarios`(`idUsuario`, `Nombre`, `Apellidos`, `Email`, `Passcode`, `idDireccion`, `Imagen`, `DNI`, `idAdmin`) VALUES 
(NULL,'$usuario->nombre','$usuario->apellidos','$usuario->email','$hash',0,'$usuario->imagen','$usuario->dni',0)";



//$querySelect = "SELECT * FROM `usuario` WHERE nick = '$usuario->nombre' OR email = '$usuario->email'";



$resInsert = mysqli_query($con, $queryInsert);

if ($resSelect) {
  $response->resultado = 'ok';
  $response->mensaje = 'Se ha registrado correctamente';
} else {
  $response->resultado = 'error';
  $response->mensaje = 'Hubo un error con la base de datos';
  echo json_encode($response);
  exit;
}

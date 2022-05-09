<?php
// headers
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');

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

// variable donde guardar los datos del fetch
global $datos;
$json = file_get_contents('php://input');
$idComprador = json_decode($json);

// query
$query = "SELECT * FROM `usuarios` WHERE idUsuario ='$_GET[idDireccion]'";
$registros = mysqli_query($con, $query);

if($_GET['Activo'] == 0 && &_GET['Subasta'] == 1){
$query2 = "INSERT INTO `subasta`(`idComprador`) VALUES ('$idComprador->idComprador')";
$registros2 = mysqli_query($con, $query2);
}

// si la query ha sido correcta hacemos fetch
if ($registros) {
  $datos = mysqli_fetch_array($registros);
  // header('Content-Type: application/json');
  $response->resultado = 'ok';
  $response->data = $datos;
  echo json_encode($response);
} else {
  $response->resultado = 'error';
  $response->mensaje = 'Hubo un problema con la base de datos.';
  echo json_encode($response);
}

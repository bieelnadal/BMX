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
$Subasta = json_decode($json);



// query
$queryInsert = "INSERT INTO `subasta`(`idComprador`, `precioInicial`, `precioFinal`, `vendido`, `fechaInicial`, `fechaFinal`, `idSubasta`, `idProducto`) VALUES ('$Subasta->idComprador','$Subasta->precioInicial','$Subasta->precioFinal',0,'$Subasta->fechaInicial','$Subasta->fechaFinal',0,'$Subasta->idProducto')";


$resInsert = mysqli_query($con, $queryInsert);




if ($resInsert) {

  $response->resultado = 'ok';
  $response->mensaje = 'Se ha creado correctamente';
  echo json_encode($response);
} else {
  $response->resultado = 'error';
  $response->mensaje = 'Hubo un error con la base de datos';
  echo json_encode($response);
  exit;
}

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

$mifecha = date('Y-m-d H:i:s');
echo $mifecha;


// query
$queryInsert = "INSERT INTO `producto`(`idComprador`, `precioInicial`, `precioFinal`, `vendido`, `fechaInicial`, `fechaFinal`, `idSubasta`, `idProducto`)
VALUES ( NULL,'$Subasta->idComprador','$Subasta->precioInicial','$Subasta->precioFinal', '$Subasta->vendido',$Subasta->fechaInicial,$Subasta->fechaFinal,$Subasta->idSubasta,$Subasta->idProducto";


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



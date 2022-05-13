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
global $datosPuja;

//Sacar mayor puja de una subasta y idusuario
$queryMayorPuja = "SELECT idUsuario, Precio FROM `pujas` WHERE idSubasta='$_GET[idSubasta]' ORDER BY Precio DESC LIMIT 1";
$registrosMayorPuja = mysqli_query($con, $queryMayorPuja);

if ($registrosMayorPuja) {
    $resultadoPuja = mysqli_fetch_array($registrosMayorPuja);


    //Update tabla subasta
    $queryUpdateSubasta = "UPDATE `subasta` SET `idComprador`='$resultadoPuja[idUsuario]', vendido=1 WHERE idSubasta='$_GET[idSubasta]'";
    $resultadoSubasta = mysqli_query($con, $queryUpdateSubasta);


    //Update tabla producto
    $queryUpdateProducto = "UPDATE `producto` SET Precio='$resultadoPuja[Precio]', Estado=1 WHERE idProducto = '$_GET[idProducto]'";
    $resultadoProducto = mysqli_query($con, $queryUpdateProducto);


    $response->resultado = 'ok';
    $response->mensaje = 'Se ha realizado la consulta.';
    $json = json_encode($response);
    header('Content-Type: application/json');
    echo $json;
} else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema con la base de datos.';
    echo json_encode($response);
}

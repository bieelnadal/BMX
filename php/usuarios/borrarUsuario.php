<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Methods: DELETE");
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  // includes
  include_once("../conexion/db.php");

  // clases
  // clase conexión
  $bd = new claseBD();
  $con = $bd->obtenerConexion();

  // clase respuesta
  class Result {}
  $response = new Result();

    // input body
    $json = file_get_contents('php://input');

  // query
  $query = "DELETE FROM usuarios WHERE idUsuario='$_GET[idUsuario]'";

  mysqli_query($con, $query);

  $response->resultado = 'ok';
  $response->mensaje = 'Se ha borrado al usuario';
  echo json_encode($response); // MUESTRA EL JSON GENERADO
?>


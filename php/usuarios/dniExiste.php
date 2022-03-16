<?php
  // headers
  header('Access-Control-Allow-Origin: *'); 
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
  
  // query
  $query = "SELECT * FROM `usuarios` WHERE DNI='$_GET[DNI]'";
  $res = mysqli_query($con, $query);

  // validación de la query
  if ($res) {
      $datosEmail = mysqli_fetch_assoc($res);
      if ($datosEmail == '' || $datosEmail == null) {
        $response->resultado = 'ok';
        $response->mensaje = 'Este dni no está en uso';
        echo json_encode($response);
      } else {
        $response->resultado = 'error';
        $response->mensaje = 'Este dni está en uso';
        echo json_encode($response);  
      }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema con la base de datos';
    echo json_encode($response);  
  }

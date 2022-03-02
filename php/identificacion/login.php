<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  $json = file_get_contents('php://input');
  $user = json_decode($json);

  // includes
  include_once("../conexion/db.php");
  include_once("../tokenJWT/generarToken.php");

  // clases
  $bd = new claseBD();
  $con = $bd->obtenerConexion();
  class Result{}
  $response = new Result();

  // query
  $queryAlumno = "SELECT * FROM usuarios WHERE Email='$user->email' and Passcode='$user->pass'";

  $resulta = mysqli_query($con, $queryAlumno);

  // si la query ha sido correcta entramos
  if ($resulta) {
    $dataAlumno = mysqli_fetch_array($resulta);
    $response->select = 'Select a base de datos correcto';

      $response->resultado = 'ok';
      $response->mensaje = 'Se encontró al alumno';
      $response->data = $dataAlumno;
      $response->accessToken = json_encode($jwt);
      echo json_encode($response);
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'No se pudo realizar el select a base de datos';
    echo json_encode($response);
  }

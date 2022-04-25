<?php
// headers
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");

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

// input body
$json = file_get_contents('php://input');
$user = json_decode($json);

$querySelect = "SELECT * FROM `usuarios` WHERE idUsuario = $user->idUsuario";

if (isset($user->Passcode)) {

  // encriptar pass
  $encryptedPass = sha1($user->Passcode);
  $queryUpdate = "UPDATE `usuarios` SET `Email`='$user->Email',`Passcode`='$encryptedPass',`Nombre`='$user->Nombre',`Apellidos`='$user->Apellidos',`Imagen`='$user->Imagen', `idAdmin`='$user->idAdmin' WHERE idUsuario = '$user->idUsuario'";
  $resUpdate = mysqli_query($con, $queryUpdate);

  // validacion de la query
  // si se hace bien el insert
  if ($resUpdate) {

    // si se hace bien el select devolvemos el alumno recién registrado
    $resSelect = mysqli_query($con, $querySelect);
    if ($resSelect) {
      $response->resultado = 'ok';
      $response->mensaje = 'Se modificó al usaurio con éxito';
      $data = mysqli_fetch_array($resSelect);
      $response->data = $data;
      echo json_encode($response);
      exit;
    } else {
      $response->resultado = 'error';

      $response->mensaje = 'Hubo un error al cargar el usuario insertado';
      echo json_encode($response);
      exit;
    }
  } else {

    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar al usuario';
    echo json_encode($response);
    exit;
  }
} else {
  $queryUpdateSinPass = "UPDATE `usuarios` SET `Email`='$user->Email',`Nombre`='$user->Nombre',`Apellidos`='$user->Apellidos',`Imagen`='$user->Imagen', `DNI`='$user->DNI', `idAdmin`='$user->idAdmin' WHERE idUsuario = $user->idUsuario";
  $resUpdateSinPass = mysqli_query($con, $queryUpdateSinPass);

  // validacion de la query
  // si se hace bien el insert
  if ($resUpdateSinPass) {

    // si se hace bien el select devolvemos el alumno recién registrado
    $resSelect = mysqli_query($con, $querySelect);
    if ($resSelect) {
      $response->resultado = 'ok';
      $response->mensaje = 'Se modificó al alumno con éxito';
      $data = mysqli_fetch_array($resSelect);
      $response->data = $data;
      echo json_encode($response);
      exit;
    } else {
      $response->resultado = 'error';

      $response->user = $user;
      echo json_encode($response);
      exit;
    }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar al alumno';
    $response->user = $user;
    echo json_encode($response);
    exit;
  }
}

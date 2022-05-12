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
$prod = json_decode($json);

$querySelect = "SELECT * FROM `producto` WHERE idUsuario = $prod->idProducto";

if (isset($prod->Passcode)) {

    // encriptar pass
    $encryptedPass = sha1($prod->Passcode);
    $queryUpdate = "UPDATE `usuarios` SET `Email`='$prod->Email',`Passcode`='$encryptedPass',`Nombre`='$prod->Nombre',`Apellidos`='$prod->Apellidos',`Imagen`='$prod->Imagen', `idAdmin`='$prod->idAdmin' WHERE idUsuario = '$prod->idUsuario'";
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
    $queryUpdateSinPass = "UPDATE `producto` SET `Nombre`='$prod->Nombre',`Imagen`='$prod->Imagen',`Descripcion`='$prod->Descripcion',`idCategoria`='$prod->idCategoria', `Activo`='$prod->Activo', `Precio`='$prod->Precio' WHERE idProducto = $prod->idProducto";
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

            $response->prod = $prod;
            echo json_encode($response);
            exit;
        }
    } else {
        $response->resultado = 'error';
        $response->mensaje = 'Hubo un error al registrar al alumno';
        $response->prod = $prod;
        echo json_encode($response);
        exit;
    }
}
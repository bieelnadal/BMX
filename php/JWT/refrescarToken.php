<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

include_once("../JWT/generarToken.php");

if ($jwt) {
    echo json_encode($jwt);
}else{
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema a la hora de generar el token';
    echo json_encode($response);
}
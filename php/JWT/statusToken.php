<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

include_once('./generarToken.php');

class Result
{
}

$response = new Result();

$json = file_get_contents('php://input');
$token = json_decode($json);

if ($decoded->exp < time()) {
    header('HTTP/1.1 401 unauthorized');
    exit;
}

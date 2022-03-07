<?php
require_once '../../jwt/src/BeforeValidException.php';
require_once '../../jwt/src/ExpiredException.php';
require_once '../../jwt/src/SignatureInvalidException.php';
require_once '../../jwt/src/JWT.php';
require_once '../../jwt/src/JWK.php';
require_once '../../jwt/src/Key.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = "example_key";
$iat = time();
$nbf = $iat + 10;

$exp = $nbf + 10;

$payload = array(
    "iss" => "http://example.org",
    "aud" => "http://example.org",
    "iat" => $iat,
    "nbf" => $nbf,
    "exp" => $exp
);

$jwt = JWT::encode($payload, $key, 'HS256');
JWT::$leeway = 60;
$decoded = JWT::decode($jwt, new Key($key, 'HS256'));

$decoded_array = (array) $decoded;

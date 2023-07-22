<?php
// api/verify_token.php

require_once '../config/db.php';
require '../vendor/autoload.php'; // Carga la librería JWT


$secret_key = 'PhJWTMo$';

// Función para verificar el token JWT
function verifyJWT($token) {
    global $secret_key;
    try {
        // Decodificar el payload del token
        $payload = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))), true);

        // Verificar la firma del token
        if (isset($payload['user_id'])) {
            return $payload;
        } else {
            throw new Exception("Invalid token");
        }
    } catch (Exception $e) {
        throw new Exception("Invalid token");
    }
}

// Verificar si se ha recibido un token en el cuerpo de la solicitud
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data['token'])) {
    $token = $data['token'];
    try {
        // Verificar el token
        $decoded_token = verifyJWT($token);
        // Si el token es válido, devolver una respuesta con un mensaje y un indicador de que es válido
        http_response_code(200);
        echo json_encode(['valid' => true, 'message' => 'Token is valid']);
    } catch (Exception $e) {
        // Si el token no es válido, devolver una respuesta con un mensaje y un indicador de que no es válido
        http_response_code(401);
        echo json_encode(['valid' => false, 'message' => 'Invalid token']);
    }
} else {
    // Si no se proporcionó un token en la solicitud, devolver una respuesta con un mensaje de error
    http_response_code(400);
    echo json_encode(['message' => 'Token missing']);
}
?>

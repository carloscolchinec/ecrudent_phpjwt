<?php

require_once '../config/db.php';
require '../vendor/autoload.php';
use \Firebase\JWT\JWT;

// Clave secreta para firmar los tokens JWT
$secret_key = 'PhJWTMo$';

// Función para generar un token JWT con información del usuario
function generateJWT($user_id, $first_name, $last_name, $email) {
    global $secret_key;
    $payload = array(
        "user_id" => $user_id,
        "first_name" => $first_name,
        "last_name" => $last_name,
        "email" => $email,
        "exp" => time() + 3600 // El token expirará en 1 hora 
    );
    return JWT::encode($payload, $secret_key, 'HS256'); 
}

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data['email']) && isset($data['password'])) {
    // Obtener las credenciales de inicio de sesión enviadas por el usuario
    $email = $data['email'];
    $password = $data['password'];
    
    try {
        // Consultar la base de datos para obtener el usuario que coincide con el email y contraseña proporcionados
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email AND password = :password");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Usuario autenticado correctamente, generar un nuevo token JWT para el usuario
            $user_id = $user['id'];
            $first_name = $user['first_name'];
            $last_name = $user['last_name'];
            $jwt = generateJWT($user_id, $first_name, $last_name, $email);

            // Devolver el token en una respuesta JSON
            http_response_code(200);
            echo json_encode(['token' => $jwt]);
        } else {
            // Credenciales inválidas o usuario no encontrado, devolver un mensaje de error en una respuesta JSON
            http_response_code(401);
            echo json_encode(['message' => 'Credenciales inválidas o usuario no encontrado']);
        }
    } catch (PDOException $e) {
        // Error en la consulta, devolver un mensaje de error en una respuesta JSON
        http_response_code(500);
        echo json_encode(['message' => 'Error en la base de datos']);
    }
} else {
    // No se enviaron las credenciales, devolver un mensaje de error en una respuesta JSON
    http_response_code(400);
    echo json_encode(['message' => 'Faltan credenciales']);
}

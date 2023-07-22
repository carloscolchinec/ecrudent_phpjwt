<?php
// config/db.php

// Configuración de la base de datos
$db_host = 'localhost';
$db_name = 'db_phjwt';
$db_user = 'root';
$db_pass = '';

// Conexión a la base de datos mediante PDO
try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    // Habilitar las excepciones en caso de errores de PDO
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}

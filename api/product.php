<?php
// api/product.php

require_once '../config/db.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Obtener el ID del producto desde la URL si está definido
        $productId = isset($_GET['id']) ? $_GET['id'] : null;

        // Si se proporcionó un ID en la URL, obtener el producto por su ID
        if (!empty($productId)) {
            // Consulta para obtener el producto por su ID
            $query = "SELECT * FROM products WHERE id = :id";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':id', $productId);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verificar si el producto existe en la base de datos
            if (!$product) {
                http_response_code(404);
                echo json_encode(['message' => 'Producto no encontrado']);
                exit;
            }

            // Devolver el producto en una respuesta JSON
            http_response_code(200);
            echo json_encode($product);
        } else {
            // Si no se proporcionó un ID en la URL, obtener todos los productos
            $query = "SELECT * FROM products";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Devolver los productos en una respuesta JSON
            http_response_code(200);
            echo json_encode($products);
        }
    } catch (PDOException $e) {
        // En caso de error en la base de datos, devolver un mensaje de error
        http_response_code(500);
        echo json_encode(['message' => 'Error al obtener los productos']);
    }
}
// Endpoint para crear un nuevo producto
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Obtener los datos del producto desde el cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);
        $product_name = $data['product_name'];
        $description = $data['description'];
        $price = $data['price'];
        $stock = $data['stock'];
        $expiry_date = $data['expiry_date'];

        // Validar que los campos no estén vacíos
        if (empty($product_name) || empty($description) || empty($price) || empty($stock) || empty($expiry_date)) {
            http_response_code(400);
            echo json_encode(['message' => 'Todos los campos son obligatorios']);
            exit;
        }

        // Consulta para insertar el nuevo producto en la base de datos
        $query = "INSERT INTO products (product_name, description, price, stock, expiry_date) VALUES (:product_name, :description, :price, :stock, :expiry_date)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':product_name', $product_name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':stock', $stock);
        $stmt->bindParam(':expiry_date', $expiry_date);
        $stmt->execute();

        // Devolver una respuesta de éxito
        http_response_code(201);
        echo json_encode(['message' => 'Producto creado exitosamente']);
    } catch (PDOException $e) {
        // En caso de error en la base de datos, devolver un mensaje de error
        http_response_code(500);
        echo json_encode(['message' => 'Error al crear el producto']);
    }
}

// Endpoint para actualizar un producto
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    try {
        // Obtener los datos del producto desde el cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        $product_name = $data['product_name'];
        $description = $data['description'];
        $price = $data['price'];
        $stock = $data['stock'];
        $expiry_date = $data['expiry_date'];

        // Validar que los campos no estén vacíos
        if (empty($id) || empty($product_name) || empty($description) || empty($price) || empty($stock) || empty($expiry_date)) {
            http_response_code(400);
            echo json_encode(['message' => 'Todos los campos son obligatorios']);
            exit;
        }

        // Consulta para actualizar el producto en la base de datos
        $query = "UPDATE products SET product_name = :product_name, description = :description, price = :price, stock = :stock, expiry_date = :expiry_date WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':product_name', $product_name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':stock', $stock);
        $stmt->bindParam(':expiry_date', $expiry_date);
        $stmt->execute();

        // Devolver una respuesta de éxito
        http_response_code(200);
        echo json_encode(['message' => 'Producto actualizado exitosamente']);
    } catch (PDOException $e) {
        // En caso de error en la base de datos, devolver un mensaje de error
        http_response_code(500);
        echo json_encode(['message' => 'Error al actualizar el producto']);
    }
}

// Endpoint para eliminar un producto
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try {
        // Obtener el ID del producto desde el cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];

        // Validar que el ID no esté vacío
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['message' => 'El ID del producto es obligatorio']);
            exit;
        }

        // Consulta para eliminar el producto de la base de datos
        $query = "DELETE FROM products WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        // Devolver una respuesta de éxito
        http_response_code(200);
        echo json_encode(['message' => 'Producto eliminado exitosamente']);
    } catch (PDOException $e) {
        // En caso de error en la base de datos, devolver un mensaje de error
        http_response_code(500);
        echo json_encode(['message' => 'Error al eliminar el producto']);
    }
}
?>

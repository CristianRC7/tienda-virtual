<?php
include_once 'conexion.php';
include_once 'cors.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id']) && isset($data['nombre_producto']) && isset($data['id_categoria']) && isset($data['id_genero']) && isset($data['id_marca']) && isset($data['precio'])) {
    $id = $data['id'];
    $nombre_producto = $data['nombre_producto'];
    $id_categoria = $data['id_categoria'];
    $id_genero = $data['id_genero'];
    $id_marca = $data['id_marca'];
    $precio = $data['precio'];

    $query = "UPDATE productos SET nombre_producto = ?, id_categoria = ?, id_genero = ?, id_marca = ?, precio = ? WHERE id = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param('siiddi', $nombre_producto, $id_categoria, $id_genero, $id_marca, $precio, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar el producto']);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}

$conexion->close();
?>

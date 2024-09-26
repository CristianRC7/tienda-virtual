<?php
include_once 'conexion.php';
include_once 'cors.php';

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id']) && isset($data['nombre_producto']) && isset($data['id_categoria']) && isset($data['id_genero']) && isset($data['id_marca'])) {
    $id = $data['id'];
    $nombre_producto = $data['nombre_producto'];
    $id_categoria = $data['id_categoria'];
    $id_genero = $data['id_genero'];
    $id_marca = $data['id_marca'];

    // Update the product in the database
    $query = "UPDATE productos 
              SET nombre_producto = ?, id_categoria = ?, id_genero = ?, id_marca = ?
              WHERE id = ?";
    
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("siiii", $nombre_producto, $id_categoria, $id_genero, $id_marca, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Producto actualizado con éxito"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar el producto"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}

$conexion->close();
?>

<?php
include_once 'conexion.php';
include_once 'cors.php';

$input = json_decode(file_get_contents("php://input"), true);
$nombre_categoria = $input['nombre_categoria'];

$sql = "INSERT INTO categorias (nombre_categoria) VALUES (?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param('s', $nombre_categoria);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
$conexion->close();
?>

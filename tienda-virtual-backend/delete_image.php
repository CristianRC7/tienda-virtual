<?php
include_once 'conexion.php';
include_once 'cors.php';

$id_imagen = $_POST['id_imagen'];

$query = "DELETE FROM imagenes WHERE id = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("i", $id_imagen);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
$conexion->close();
?>

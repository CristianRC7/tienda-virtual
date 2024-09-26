<?php
include_once 'conexion.php';
include_once 'cors.php';

$id_producto = $_GET['id_producto'];

$query = "SELECT * FROM imagenes WHERE id_producto = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("i", $id_producto);
$stmt->execute();
$result = $stmt->get_result();

$images = [];
while ($row = $result->fetch_assoc()) {
    $images[] = $row;
}

echo json_encode($images);
$stmt->close();
$conexion->close();
?>

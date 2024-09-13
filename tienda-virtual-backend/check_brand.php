<?php
include_once 'conexion.php';
include_once 'cors.php';

$input = json_decode(file_get_contents("php://input"), true);
$nombre_marca = strtolower($input['nombre_marca']);

$sql = "SELECT COUNT(*) as count FROM marcas WHERE LOWER(nombre_marca) = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param('s', $nombre_marca);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();
$conexion->close();

echo json_encode(['exists' => $count > 0]);
?>

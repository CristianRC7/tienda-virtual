<?php
include_once 'conexion.php';
include_once 'cors.php';

$data = json_decode(file_get_contents("php://input"));
$usuario = $data->usuario;

$query = "SELECT COUNT(*) as count FROM usuarios WHERE usuario = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();

echo json_encode(['exists' => $count > 0]);
?>

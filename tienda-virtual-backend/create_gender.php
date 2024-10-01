<?php
include_once 'conexion.php';
include_once 'cors.php';

$input = json_decode(file_get_contents("php://input"), true);
$genero = $input['genero'];

$sql = "INSERT INTO generos (genero) VALUES (?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param('s', $genero);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
$conexion->close();
?>

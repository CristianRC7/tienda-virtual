<?php
include_once 'conexion.php';
include_once 'cors.php';

$input = json_decode(file_get_contents("php://input"), true);
$nombre_marca = strtolower($input['nombre_marca']);

$checkSql = "SELECT COUNT(*) as count FROM marcas WHERE LOWER(nombre_marca) = ?";
$checkStmt = $conexion->prepare($checkSql);
$checkStmt->bind_param('s', $nombre_marca);
$checkStmt->execute();
$checkStmt->bind_result($count);
$checkStmt->fetch();
$checkStmt->close();

if ($count > 0) {
    echo json_encode(['success' => false, 'message' => 'La marca ya existe']);
} else {
    $sql = "INSERT INTO marcas (nombre_marca) VALUES (?)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param('s', $nombre_marca);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al crear la marca']);
    }

    $stmt->close();
}

$conexion->close();
?>

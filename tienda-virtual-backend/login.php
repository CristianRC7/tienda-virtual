<?php
include_once 'conexion.php';
include_once 'cors.php';

$input = json_decode(file_get_contents("php://input"), true);
$usuario = $input['usuario'];
$contrasena = $input['contrasena'];

$sql = "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param('ss', $usuario, $contrasena);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
$conexion->close();
?>

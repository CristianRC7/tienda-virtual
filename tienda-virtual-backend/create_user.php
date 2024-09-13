<?php
include_once 'conexion.php';
include_once 'cors.php';

$input = json_decode(file_get_contents("php://input"), true);
$usuario = $input['usuario'];
$nombre_completo = $input['nombre_completo'];
$contrasena = md5($input['contrasena']); 

$sqlCheck = "SELECT * FROM usuarios WHERE usuario = ?";
$stmtCheck = $conexion->prepare($sqlCheck);
$stmtCheck->bind_param('s', $usuario);
$stmtCheck->execute();
$resultCheck = $stmtCheck->get_result();

if ($resultCheck->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'El usuario ya está registrado.']);
} else {
    $sql = "INSERT INTO usuarios (usuario, nombre_completo, contrasena) VALUES (?, ?, ?)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param('sss', $usuario, $nombre_completo, $contrasena);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Usuario creado exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al crear el usuario.']);
    }
}

$stmtCheck->close();
$stmt->close();
$conexion->close();
?>

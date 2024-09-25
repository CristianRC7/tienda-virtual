<?php
include './conexion.php';
include './cors.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id) && isset($data->usuario) && isset($data->nombre_completo) && isset($data->contrasena)) {
    $id = $data->id;
    $usuario = $data->usuario;
    $nombre_completo = $data->nombre_completo;
    $contrasena = md5($data->contrasena); 

    $query = "UPDATE usuarios SET usuario = '$usuario', nombre_completo = '$nombre_completo', contrasena = '$contrasena' WHERE id = $id";
    
    if ($conexion->query($query)) {
        echo json_encode(["success" => true, "message" => "Usuario actualizado"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar usuario"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}

$conexion->close();
?>

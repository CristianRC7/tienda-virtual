<?php
include 'conexion.php';
include 'cors.php';

$id = $_GET['id'];

if (isset($id)) {
    $query = "DELETE FROM usuarios WHERE id = $id";
    if ($conexion->query($query)) {
        echo json_encode(["success" => true, "message" => "Usuario eliminado"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al eliminar usuario"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "ID no proporcionado"]);
}

$conexion->close();
?>

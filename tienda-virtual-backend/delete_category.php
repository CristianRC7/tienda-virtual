<?php
include './conexion.php';
include './cors.php';

$id = $_GET['id'];

if (isset($id)) {
    $query = "DELETE FROM categorias WHERE id = $id";
    if ($conexion->query($query)) {
        echo json_encode(["success" => true, "message" => "Categoría eliminada"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al eliminar categoría"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "ID no proporcionado"]);
}

$conexion->close();
?>

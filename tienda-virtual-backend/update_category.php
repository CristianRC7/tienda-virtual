<?php
include './conexion.php';
include './cors.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id) && isset($data->nombre_categoria)) {
    $id = $data->id;
    $nombre_categoria = $data->nombre_categoria;

    $query = "UPDATE categorias SET nombre_categoria = '$nombre_categoria' WHERE id = $id";
    
    if ($conexion->query($query)) {
        echo json_encode(["success" => true, "message" => "Categoría actualizada"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar categoría"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}

$conexion->close();
?>

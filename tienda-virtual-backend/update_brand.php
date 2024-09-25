<?php
include './conexion.php';
include './cors.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id) && isset($data->nombre_marca)) {
    $id = $data->id;
    $nombre_marca = $data->nombre_marca;

    $query = "UPDATE marcas SET nombre_marca = '$nombre_marca' WHERE id = $id";
    
    if ($conexion->query($query)) {
        echo json_encode(["success" => true, "message" => "Marca actualizada"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar marca"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}

$conexion->close();
?>

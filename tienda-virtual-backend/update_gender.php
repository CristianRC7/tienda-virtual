<?php
include 'conexion.php';
include 'cors.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id) && isset($data->genero)) {
    $id = $data->id;
    $genero = $data->genero;

    $query = "UPDATE generos SET genero = '$genero' WHERE id = $id";
    
    if ($conexion->query($query)) {
        echo json_encode(["success" => true, "message" => "Genero actualizado"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar el genero"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}

$conexion->close();
?>

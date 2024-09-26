<?php
include_once 'conexion.php';
include_once 'cors.php';

$query = "SELECT * FROM categorias";
$result = $conexion->query($query);

$categories = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
}

echo json_encode($categories);

$conexion->close();
?>

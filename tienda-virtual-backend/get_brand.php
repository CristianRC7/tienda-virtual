<?php
include_once 'conexion.php';
include_once 'cors.php';

$query = "SELECT * FROM marcas";
$result = $conexion->query($query);

$brands = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $brands[] = $row;
    }
}

echo json_encode($brands);

$conexion->close();
?>

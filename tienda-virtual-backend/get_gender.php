<?php
include_once 'conexion.php';
include_once 'cors.php';

$query = "SELECT id, genero FROM generos";
$result = $conexion->query($query);

$genders = [];
while($row = $result->fetch_assoc()) {
    $genders[] = $row;
}

echo json_encode($genders);
?>

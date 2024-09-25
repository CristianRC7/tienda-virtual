<?php
include_once './conexion.php';
include_once './cors.php';

$query = "SELECT * FROM usuarios";
$result = $conexion->query($query);

$users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);

$conexion->close();
?>

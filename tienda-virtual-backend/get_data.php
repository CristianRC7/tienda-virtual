<?php
include_once 'conexion.php';
include_once 'cors.php';

if (isset($_GET['table'])) {
    $table = $_GET['table'];

    $allowed_tables = ['categorias', 'generos', 'marcas'];
    
    if (in_array($table, $allowed_tables)) {
        $query = "SELECT * FROM $table";
        $result = $conexion->query($query);

        if ($result->num_rows > 0) {
            $data = [];

            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }

            echo json_encode($data);
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(['error' => 'Tabla no válida']);
    }
} else {
    echo json_encode(['error' => 'Falta el parámetro "table"']);
}

$conexion->close();
?>

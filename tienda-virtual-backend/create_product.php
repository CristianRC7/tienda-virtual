<?php
include_once 'conexion.php';
include_once 'cors.php';

$nombre_producto = $_POST['nombre_producto'];
$id_categoria = $_POST['id_categoria'];
$id_genero = $_POST['id_genero'];
$id_marca = $_POST['id_marca'];

$imagenes = [];
for ($i = 1; $i <= 3; $i++) {
    if (isset($_FILES["imagen_$i"])) {
        $imagen_name = basename($_FILES["imagen_$i"]['name']);
        $image_extension = pathinfo($imagen_name, PATHINFO_EXTENSION); 
        $unique_name = uniqid() . '.' . $image_extension; 

        $target_dir = "images/";
        $target_file = $target_dir . $unique_name;

        if (move_uploaded_file($_FILES["imagen_$i"]['tmp_name'], $target_file)) {
            $imagenes[] = $unique_name;  
        }
    }
}

$query = "INSERT INTO productos (nombre_producto, id_categoria, id_genero, id_marca) VALUES (?, ?, ?, ?)";
$stmt = $conexion->prepare($query);
$stmt->bind_param("siii", $nombre_producto, $id_categoria, $id_genero, $id_marca);

if ($stmt->execute()) {
    $producto_id = $conexion->insert_id;

    foreach ($imagenes as $url_imagen) {
        $query_imagen = "INSERT INTO imagenes (id_producto, url_imagen) VALUES (?, ?)";
        $stmt_imagen = $conexion->prepare($query_imagen);
        $stmt_imagen->bind_param("is", $producto_id, $url_imagen);
        $stmt_imagen->execute();
    }

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
$conexion->close();
?>

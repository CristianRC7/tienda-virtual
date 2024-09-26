<?php
include_once 'conexion.php';
include_once 'cors.php';

$id_producto = $_POST['id_producto'];

if (isset($_FILES['imagen'])) {
    $imagen_name = basename($_FILES['imagen']['name']);
    $image_extension = pathinfo($imagen_name, PATHINFO_EXTENSION); 
    $unique_name = uniqid() . '.' . $image_extension;

    $target_dir = "images/";
    $target_file = $target_dir . $unique_name;

    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $target_file)) {
        $query = "INSERT INTO imagenes (id_producto, url_imagen) VALUES (?, ?)";
        $stmt = $conexion->prepare($query);
        $stmt->bind_param("is", $id_producto, $unique_name);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }
        
        $stmt->close();
    }
}

$conexion->close();
?>

<?php
include_once 'conexion.php';
include_once 'cors.php';

$data = json_decode(file_get_contents("php://input"), true);
$id_imagen = $data['id_imagen'] ?? null;

if (!$id_imagen) {
    echo json_encode(['success' => false, 'message' => 'ID de imagen no proporcionado']);
    exit;
}

$query = "SELECT url_imagen FROM imagenes WHERE id = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("i", $id_imagen);
$stmt->execute();
$stmt->bind_result($url_imagen);
$stmt->fetch();
$stmt->close();

if ($url_imagen) {
    $filePath = __DIR__ . '/images/' . $url_imagen;
    if (file_exists($filePath)) {
        unlink($filePath); 
    }

    $query = "DELETE FROM imagenes WHERE id = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("i", $id_imagen);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Imagen eliminada con éxito']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar la imagen en la base de datos']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Imagen no encontrada']);
}

$conexion->close();
?>

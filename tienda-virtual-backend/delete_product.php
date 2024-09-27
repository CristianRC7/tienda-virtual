<?php
include_once 'conexion.php';
include_once 'cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['id_producto']) && !empty($data['id_producto'])) {
        $id_producto = $data['id_producto'];

        $query = "DELETE FROM productos WHERE id = ?";
        $stmt = $conexion->prepare($query);

        // Ejecutar la consulta
        if ($stmt->execute([$id_producto])) {
            echo json_encode(['success' => true, 'message' => 'Producto eliminado con éxito']);
        } else {
            $errorInfo = $stmt->errorInfo();
            echo json_encode(['success' => false, 'message' => 'Error eliminando el producto: ' . $errorInfo[2]]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No se recibió el ID del producto']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>

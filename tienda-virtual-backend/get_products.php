<?php
include("conexion.php");
include("cors.php");

$search = isset($_GET['search']) ? $_GET['search'] : '';

$sql = "SELECT p.id, p.nombre_producto, c.nombre_categoria, m.nombre_marca, g.genero, i.url_imagen 
        FROM productos p
        LEFT JOIN categorias c ON p.id_categoria = c.id
        LEFT JOIN marcas m ON p.id_marca = m.id
        LEFT JOIN generos g ON p.id_genero = g.id
        LEFT JOIN imagenes i ON p.id = i.id_producto
        WHERE p.nombre_producto LIKE ? 
        OR m.nombre_marca LIKE ? 
        OR c.nombre_categoria LIKE ?
        OR g.genero LIKE ?";

$stmt = $conexion->prepare($sql);
$searchParam = '%' . $search . '%';
$stmt->bind_param('ssss', $searchParam, $searchParam, $searchParam, $searchParam);
$stmt->execute();
$result = $stmt->get_result();

$productos = [];
while ($row = $result->fetch_assoc()) {
    $id = $row['id'];
    if (!isset($productos[$id])) {
        $productos[$id] = [
            'id' => $id,
            'nombre_producto' => $row['nombre_producto'],
            'nombre_categoria' => $row['nombre_categoria'],
            'nombre_marca' => $row['nombre_marca'],
            'genero' => $row['genero'],
            'imagenes' => []
        ];
    }
    $productos[$id]['imagenes'][] = $row['url_imagen'];
}

echo json_encode(array_values($productos));
?>

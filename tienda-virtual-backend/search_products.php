<?php
include_once 'conexion.php';
include_once 'cors.php';

$query = "
  SELECT 
    p.id, 
    p.nombre_producto, 
    c.nombre_categoria, 
    g.genero, 
    m.nombre_marca
  FROM productos p
  JOIN categorias c ON p.id_categoria = c.id
  JOIN generos g ON p.id_genero = g.id
  JOIN marcas m ON p.id_marca = m.id
  ORDER BY p.id ASC
";

$result = $conexion->query($query);

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
?>

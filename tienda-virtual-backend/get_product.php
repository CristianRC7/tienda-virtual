<?php
include 'conexion.php';
include 'cors.php';

$query = "SELECT productos.*, categorias.nombre_categoria, generos.genero, marcas.nombre_marca 
          FROM productos 
          LEFT JOIN categorias ON productos.id_categoria = categorias.id
          LEFT JOIN generos ON productos.id_genero = generos.id
          LEFT JOIN marcas ON productos.id_marca = marcas.id";

$result = $conexion->query($query);

$products = [];

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $products[] = $row;
  }
}

echo json_encode($products);
$conexion->close();
?>

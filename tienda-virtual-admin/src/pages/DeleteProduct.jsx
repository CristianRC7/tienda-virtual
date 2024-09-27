import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import CONFIG from '../services/Config';

function DeleteProduct() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${CONFIG.API_URL}/search_products.php`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = (id_producto) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${CONFIG.API_URL}/delete_product.php`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_producto }),
          });
          const data = await response.json();

          if (data.success) {
            Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
            fetchProducts(); 
          } else {
            Swal.fire('Error', data.message || 'Error eliminando el producto', 'error');
          }
        } catch (error) {
          Swal.fire('Error', 'Error eliminando el producto', 'error');
        }
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Eliminar Producto</h1>
      <input
        type="text"
        placeholder="Buscar producto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter(product => 
              product.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(product => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">{product.nombre_producto}</td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => handleDelete(product.id)} 
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeleteProduct;

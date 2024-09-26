import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import CONFIG from '../services/Config';

function EditProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [genders, setGenders] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchGenders();
    fetchBrands();
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

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${CONFIG.API_URL}/get_category.php`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchGenders = async () => {
    try {
      const response = await fetch(`${CONFIG.API_URL}/get_gender.php`);
      const data = await response.json();
      setGenders(data);
    } catch (error) {
      console.error('Error fetching genders:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${CONFIG.API_URL}/get_brand.php`);
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleEdit = (product) => {
    // Create a dropdown for each foreign key relationship (category, gender, brand)
    const categoryOptions = categories.map(category => `<option value="${category.id}" ${category.nombre_categoria === product.nombre_categoria ? 'selected' : ''}>${category.nombre_categoria}</option>`).join('');
    const genderOptions = genders.map(gender => `<option value="${gender.id}" ${gender.genero === product.genero ? 'selected' : ''}>${gender.genero}</option>`).join('');
    const brandOptions = brands.map(brand => `<option value="${brand.id}" ${brand.nombre_marca === product.nombre_marca ? 'selected' : ''}>${brand.nombre_marca}</option>`).join('');

    Swal.fire({
      title: 'Editar Producto',
      html: `
        <input id="nombre_producto" class="swal2-input" placeholder="Nombre Producto" value="${product.nombre_producto}">
        <select id="categoria" class="swal2-input">${categoryOptions}</select>
        <select id="genero" class="swal2-input">${genderOptions}</select>
        <select id="marca" class="swal2-input">${brandOptions}</select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const nombre_producto = document.getElementById('nombre_producto').value;
        const id_categoria = document.getElementById('categoria').value;
        const id_genero = document.getElementById('genero').value;
        const id_marca = document.getElementById('marca').value;

        return { nombre_producto, id_categoria, id_genero, id_marca };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedProduct = {
            id: product.id,
            nombre_producto: result.value.nombre_producto,
            id_categoria: result.value.id_categoria,
            id_genero: result.value.id_genero,
            id_marca: result.value.id_marca,
          };

          const response = await fetch(`${CONFIG.API_URL}/update_product.php`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
          });

          const data = await response.json();
          if (data.success) {
            Swal.fire('Éxito', 'Producto actualizado con éxito', 'success');
            fetchProducts(); // Refetch the product list
          } else {
            Swal.fire('Error', 'Error al actualizar el producto', 'error');
          }
        } catch (error) {
          Swal.fire('Error', 'Ocurrió un error', 'error');
        }
      }
    });
  };

  const filteredProducts = products.filter(product =>
    product.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buscar y Editar Productos</h1>
      
      <input
        type="text"
        placeholder="Buscar por nombre de producto"
        className="mb-4 p-2 border rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre Producto</th>
            <th className="py-2 px-4 border-b">Marca</th>
            <th className="py-2 px-4 border-b">Categoría</th>
            <th className="py-2 px-4 border-b">Género</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.nombre_producto}</td>
              <td className="py-2 px-4 border-b">{product.nombre_marca}</td>
              <td className="py-2 px-4 border-b">{product.nombre_categoria}</td>
              <td className="py-2 px-4 border-b">{product.genero}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleEdit(product)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditProduct;

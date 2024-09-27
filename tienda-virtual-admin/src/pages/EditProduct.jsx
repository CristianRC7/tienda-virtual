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
            fetchProducts();
          } else {
            Swal.fire('Error', 'Error al actualizar el producto', 'error');
          }
        } catch (error) {
          Swal.fire('Error', 'Ocurrió un error', 'error');
        }
      }
    });
  };

  const handleViewImages = async (product) => {
    try {
      const response = await fetch(`${CONFIG.API_URL}/get_image.php?id_producto=${product.id}`);
      const images = await response.json();
  
      const imageElements = images.map(image => `
        <div class="image-container flex items-center space-x-2 mb-2">
          <img src="${CONFIG.API_URL}/images/${image.url_imagen}" alt="Producto" class="w-24 h-24 object-cover">
          <button class="delete-image bg-red-500 text-white px-2 py-1 rounded" data-id="${image.id}">Eliminar</button>
        </div>
      `).join('');
  
      Swal.fire({
        title: 'Imágenes del Producto',
        html: `
          <div>${imageElements}</div>
          <input type="file" id="new_image" class="swal2-input w-32 h-8" style="height: auto; padding: 0.2rem; font-size: 0.875rem;">
        `,
        showCancelButton: true,
        confirmButtonText: 'Subir Imagen',
        preConfirm: () => {
          const newImage = document.getElementById('new_image').files[0];
          return newImage;
        }
      }).then(async (result) => {
        if (result.isConfirmed && result.value) {
          const formData = new FormData();
          formData.append('imagen', result.value);
          formData.append('id_producto', product.id);
  
          const uploadResponse = await fetch(`${CONFIG.API_URL}/upload_image.php`, {
            method: 'POST',
            body: formData,
          });
  
          const uploadData = await uploadResponse.json();
          if (uploadData.success) {
            Swal.fire('Éxito', 'Imagen subida con éxito', 'success');
            handleViewImages(product); 
          } else {
            Swal.fire('Error', 'Error al subir la imagen', 'error');
          }
        }
      });
  
      document.querySelectorAll('.delete-image').forEach(button => {
        button.addEventListener('click', async (e) => {
          const imageId = e.target.getAttribute('data-id');
          const deleteResponse = await fetch(`${CONFIG.API_URL}/delete_image.php`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_imagen: imageId }),
          });
  
          const deleteData = await deleteResponse.json();
          if (deleteData.success) {
            Swal.fire('Éxito', 'Imagen eliminada con éxito', 'success');
            handleViewImages(product);
          } else {
            Swal.fire('Error', 'Error al eliminar la imagen', 'error');
          }
        });
      });
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
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
            <th className="border px-4 py-2">Categoría</th>
            <th className="border px-4 py-2">Género</th>
            <th className="border px-4 py-2">Marca</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter(product => product.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(product => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">{product.nombre_producto}</td>
                <td className="border px-4 py-2">{product.nombre_categoria}</td>
                <td className="border px-4 py-2">{product.genero}</td>
                <td className="border px-4 py-2">{product.nombre_marca}</td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => handleEdit(product)} 
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleViewImages(product)} 
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Ver Imágenes
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

import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import LoadingButton from '../components/LoadingButton'; 
import { getCategorias, getGeneros, getMarcas } from '../services/apiService'; 
import CONFIG from '../services/Config';

function CreateProduct() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [genero, setGenero] = useState('');
  const [marca, setMarca] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [precio, setPrecio] = useState(''); 
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategorias = await getCategorias();
        const fetchedGeneros = await getGeneros();
        const fetchedMarcas = await getMarcas();

        setCategorias(fetchedCategorias);
        setGeneros(fetchedGeneros);
        setMarcas(fetchedMarcas);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      Swal.fire({
        title: 'Error',
        text: 'Solo puedes subir un máximo de 3 imágenes',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      setImagenes(files);
    }
  };

  const handlePrecioChange = (e) => {
    const value = e.target.value;
    // Ensure only numbers and a decimal point can be entered
    if (/^\d*\.?\d*$/.test(value)) {
      setPrecio(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imagenes.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Debes cargar al menos una imagen',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 3000,
      });
      return;
    }

    if (precio === '') {
      Swal.fire({
        title: 'Error',
        text: 'Debes ingresar un precio',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 3000,
      });
      return;
    }

    setLoading(true); 

    const formData = new FormData();
    formData.append('nombre_producto', nombreProducto);
    formData.append('id_categoria', categoria);
    formData.append('id_genero', genero);
    formData.append('id_marca', marca);
    formData.append('precio', precio); // Add price to form data
    imagenes.forEach((imagen, index) => {
      formData.append(`imagen_${index + 1}`, imagen);
    });

    try {
      const response = await fetch(`${CONFIG.API_URL}/create_product.php`, {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      if (result.success) {
        Swal.fire({
          title: 'Éxito',
          text: 'Producto creado exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });

        setNombreProducto('');
        setCategoria('');
        setGenero('');
        setMarca('');
        setPrecio(''); // Reset price field
        setImagenes([]);

        fileInputRef.current.value = ''; 
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al crear el producto',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error de conexión con el servidor',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre del Producto</label>
            <input
              type="text"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre_categoria}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Género</label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Selecciona un género</option>
              {generos.map((gen) => (
                <option key={gen.id} value={gen.id}>
                  {gen.genero}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Marca</label>
            <select
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Selecciona una marca</option>
              {marcas.map((marc) => (
                <option key={marc.id} value={marc.id}>
                  {marc.nombre_marca}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Precio (en Bolivianos)</label>
            <input
              type="text"
              value={precio}
              onChange={handlePrecioChange}
              placeholder="Ingrese el precio"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Imágenes (máximo 3)</label>
            <input
              type="file"
              accept=".png"
              multiple
              onChange={handleImageChange}
              ref={fileInputRef} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <LoadingButton 
            loading={loading} 
            text="Crear Producto" 
            onClick={handleSubmit} 
          />
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;

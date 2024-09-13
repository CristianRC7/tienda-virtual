import { useState } from 'react';
import Swal from 'sweetalert2';
import CONFIG from '../Config';
import LoadingButton from '../components/LoadingButton';

function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${CONFIG.API_URL}/create_category.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_categoria: categoryName }),
      });

      const result = await response.json();
      if (result.success) {
        Swal.fire({
          title: 'Éxito!',
          text: 'Categoría creada exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        setCategoryName('');
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Error al crear la categoría',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Hubo un error en la conexión con el servidor.',
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
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Categoría</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre de la Categoría</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <LoadingButton
            type="submit"
            text="Crear Categoría"
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
}

export default CreateCategory;

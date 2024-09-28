import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import CONFIG from '../services/Config';

function EditCategory() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch(`${CONFIG.API_URL}/get_category.php`) 
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setFilteredCategories(data); 
      })
      .catch((error) => console.error('Error fetching categories:', error));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = categories.filter((category) =>
      category.nombre_categoria.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${CONFIG.API_URL}/delete_category.php?id=${id}`, { method: 'DELETE' })
          .then(() => {
            fetchCategories();
            Swal.fire('Eliminado!', 'La categoría ha sido eliminada.', 'success');
          })
          .catch((error) => console.error('Error eliminando categoría:', error));
      }
    });
  };

  const handleEdit = (category) => {
    Swal.fire({
      title: 'Editar Categoría',
      input: 'text',
      inputValue: category.nombre_categoria,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: (newName) => {
        if (!newName) {
          Swal.showValidationMessage('El nombre no puede estar vacío');
          return;
        }
        return fetch(`${CONFIG.API_URL}/update_category.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: category.id, nombre_categoria: newName }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              fetchCategories();
              Swal.fire('Actualizado!', 'La categoría ha sido actualizada.', 'success');
            } else {
              Swal.fire('Error', 'Hubo un problema actualizando la categoría.', 'error');
            }
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema actualizando la categoría.', 'error');
          });
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar Categoría</h1>
      <input
        type="text"
        placeholder="Buscar categoría"
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full"
      />
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Nombre de Categoría</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <tr key={category.id}>
                <td className="border px-4 py-2">{category.nombre_categoria}</td>
                <td className="border px-4 py-2 flex space-x-4">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(category)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(category.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-4">No se encontraron categorías.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EditCategory;

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import CONFIG from '../services/Config';

function EditGender() {
  const [Genders, setGenders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGenders, setFilteredGenders] = useState([]);

  useEffect(() => {
    fetchGenders();
  }, []);

  const fetchGenders = () => {
    fetch(`${CONFIG.API_URL}/get_gender.php`) 
      .then((response) => response.json())
      .then((data) => {
        setGenders(data);
        setFilteredGenders(data); 
      })
      .catch((error) => console.error('Error fetching categories:', error));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = Genders.filter((gender) =>
      gender.genero.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredGenders(filtered);
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
        fetch(`${CONFIG.API_URL}/delete_gender.php?id=${id}`, { method: 'DELETE' })
          .then(() => {
            fetchGenders();
            Swal.fire('Eliminado!', 'El genero ha sido eliminada.', 'success');
          })
          .catch((error) => console.error('Error eliminando el genero:', error));
      }
    });
  };

  const handleEdit = (gender) => {
    Swal.fire({
      title: 'Editar Genero',
      input: 'text',
      inputValue: gender.genero,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: (newName) => {
        if (!newName) {
          Swal.showValidationMessage('El nombre no puede estar vacío');
          return;
        }
        return fetch(`${CONFIG.API_URL}/update_gender.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: gender.id, genero: newName }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              fetchGenders();
              Swal.fire('Actualizado!', 'El genero ha sido actualizada.', 'success');
            } else {
              Swal.fire('Error', 'Hubo un problema actualizando el genero.', 'error');
            }
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema actualizando el genero.', 'error');
          });
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar Genero</h1>
      <input
        type="text"
        placeholder="Buscar genero"
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full"
      />
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Nombre de Genero</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredGenders.length > 0 ? (
            filteredGenders.map((gender) => (
              <tr key={gender.id}>
                <td className="border px-4 py-2">{gender.genero}</td>
                <td className="border px-4 py-2 flex space-x-4">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(gender)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(gender.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-4">No se encontraron generos.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EditGender;

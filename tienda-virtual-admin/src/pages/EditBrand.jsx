import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import CONFIG from '../services/Config';

function EditBrand() {
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = () => {
    fetch(`${CONFIG.API_URL}/get_brand.php`) 
      .then((response) => response.json())
      .then((data) => {
        setBrands(data);
        setFilteredBrands(data); 
      })
      .catch((error) => console.error('Error fetching categories:', error));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = brands.filter((brand) =>
      brand.nombre_marca.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBrands(filtered);
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
        fetch(`${CONFIG.API_URL}/delete_brand.php?id=${id}`, { method: 'DELETE' })
          .then(() => {
            fetchBrands();
            Swal.fire('Eliminado!', 'La categoría ha sido eliminada.', 'success');
          })
          .catch((error) => console.error('Error eliminando categoría:', error));
      }
    });
  };

  const handleEdit = (brand) => {
    Swal.fire({
      title: 'Editar Marca',
      input: 'text',
      inputValue: brand.nombre_marca,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: (newName) => {
        if (!newName) {
          Swal.showValidationMessage('El nombre no puede estar vacío');
          return;
        }
        return fetch(`${CONFIG.API_URL}/update_brand.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: brand.id, nombre_marca: newName }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              fetchBrands();
              Swal.fire('Actualizado!', 'La categoría ha sido actualizada.', 'success');
            } else {
              Swal.fire('Error', 'Hubo un problema actualizando la marca.', 'error');
            }
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema actualizando la marca.', 'error');
          });
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar Marca</h1>
      <input
        type="text"
        placeholder="Buscar Marca"
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full"
      />
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Nombre de Marca</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
  {filteredBrands.length > 0 ? (
    filteredBrands.map((brand) => (
      <tr key={brand.id}>
        {/* Cambia 'brand.nombre_categoria' por 'brand.nombre_marca' */}
        <td className="border px-4 py-2">{brand.nombre_marca}</td> 
        <td className="border px-4 py-2 flex space-x-4">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            onClick={() => handleEdit(brand)}
          >
            Editar
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            onClick={() => handleDelete(brand.id)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="2" className="text-center py-4">No se encontraron marcas.</td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
}

export default EditBrand;

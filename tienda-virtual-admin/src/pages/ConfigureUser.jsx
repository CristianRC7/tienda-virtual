import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import CONFIG from '../services/Config';

function ConfigureUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch(`${CONFIG.API_URL}/get_user.php`) 
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data); 
      })
      .catch((error) => console.error('Error fetching users:', error));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = users.filter((user) =>
      user.nombre_completo.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
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
        fetch(`${CONFIG.API_URL}/delete_user.php?id=${id}`, { method: 'DELETE' })
          .then(() => {
            fetchUsers();
            Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
          })
          .catch((error) => console.error('Error eliminando usuario:', error));
      }
    });
  };

  const handleEdit = (user) => {
    Swal.fire({
      title: 'Editar Usuario',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Usuario" value="${user.usuario}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Nombre Completo" value="${user.nombre_completo}">` +
        `<input id="swal-input3" type="password" class="swal2-input" placeholder="Contraseña">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const usuario = document.getElementById('swal-input1').value;
        const nombreCompleto = document.getElementById('swal-input2').value;
        const contrasena = document.getElementById('swal-input3').value;

        if (!usuario || !nombreCompleto || !contrasena) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return;
        }

        return fetch(`${CONFIG.API_URL}/update_user.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: user.id,
            usuario,
            nombre_completo: nombreCompleto,
            contrasena
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              fetchUsers();
              Swal.fire('Actualizado!', 'El usuario ha sido actualizado.', 'success');
            } else {
              Swal.fire('Error', 'Hubo un problema actualizando el usuario.', 'error');
            }
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema actualizando el usuario.', 'error');
          });
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar Usuario</h1>
      <input
        type="text"
        placeholder="Buscar Usuario"
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full"
      />
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Usuario</th>
            <th className="border px-4 py-2 text-left">Nombre Completo</th>
            <th className="border px-4 py-2 text-left">Contraseña</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.usuario}</td>
                <td className="border px-4 py-2">{user.nombre_completo}</td>
                <td className="border px-4 py-2">********</td> 
                <td className="border px-4 py-2 flex space-x-4">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(user)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No se encontraron usuarios.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ConfigureUser;

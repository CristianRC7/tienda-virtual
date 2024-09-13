import { useState } from 'react';
import Swal from 'sweetalert2';
import CONFIG from '../Config';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const checkResponse = await fetch(`${CONFIG.API_URL}/check_user.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: username }),
      });

      const checkResult = await checkResponse.json();
      if (checkResult.exists) {
        Swal.fire({
          title: 'Error!',
          text: 'El usuario ya está registrado.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return;
      }

      const response = await fetch(`${CONFIG.API_URL}/create_user.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: username,
          nombre_completo: fullName,
          contrasena: password,
        }),
      });

      const result = await response.json();
      if (result.success) {
        Swal.fire({
          title: 'Éxito!',
          text: 'Usuario creado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        setUsername('');
        setFullName('');
        setPassword('');
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Error al crear el usuario.',
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre de Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre Completo</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg focus:outline-none hover:bg-indigo-600"
          >
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CONFIG from './config';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${CONFIG.API_URL}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario: username, contrasena: password }),
      });
      const data = await response.json();

      if (data.success) {
        navigate('/admin/pages/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas',
          text: 'El usuario o la contraseña no son correctos',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007bff',
          timer: 4000,
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-lg rounded-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Inicio de Sesion</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mx-auto block">Ingresar</button>
      </form>
    </div>
  );
};

export default AdminLogin;

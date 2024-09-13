import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaPlus, FaUser, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/login'; 
  };

  const handleMenuClick = () => {
    setIsOpen(false); 
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="flex">
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}></div>
      <div className={`fixed left-0 top-0 w-64 h-full bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={toggleSidebar} className="text-gray-500">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link to="/dashboard" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                <FaHome className="mr-2" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/createcategory" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                <FaPlus className="mr-2" /> Crear Categoría
              </Link>
            </li>
            <li>
              <Link to="/createbrand" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                <FaPlus className="mr-2" /> Crear Marca
              </Link>
            </li>
            <li>
              <button
                className="flex items-center p-2 w-full text-left hover:bg-gray-100"
                onClick={toggleUserMenu}
              >
                <FaUser className="mr-2" /> Menu Usuarios
                {isUserMenuOpen ? <FaChevronDown className="ml-auto" /> : <FaChevronRight className="ml-auto" />}
              </button>
              {/* Submenu */}
              <div
                className={`pl-8 mt-2 transition-all duration-300 ease-in-out ${isUserMenuOpen ? 'max-h-40' : 'max-h-0 overflow-hidden'}`}
              >
                <ul className="transition-all duration-300 ease-in-out">
                  <li>
                    <Link to="/createuser" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                      <FaPlus className="mr-2" /> Crear Usuario
                    </Link>
                  </li>
                  <li>
                    <Link to="/configureuser" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                      <FaUser className="mr-2" /> Configurar Usuario
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <button onClick={handleLogout} className="w-full text-center p-2 hover:bg-red-700 hover:text-white">
            Cerrar Sesión
          </button>
        </nav>
      </div>
      <button 
        onClick={toggleSidebar} 
        className={`fixed top-4 left-4 z-50 text-gray-500 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-300'}`}
      >
        <FaBars size={24} />
      </button>
    </div>
  );
};

export default Sidebar;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaPlus, FaUser, FaChevronDown, FaChevronRight, FaCog, FaTags, FaSignOutAlt, FaProductHunt, FaVenusMars } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

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

  const toggleSubMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
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
              <Link 
                to="/dashboard" 
                className={`flex items-center p-2 hover:bg-gray-100 ${window.location.pathname === '/dashboard' ? 'bg-gray-200 text-blue-600' : ''}`} 
                onClick={handleMenuClick}
              >
                <FaHome className="mr-2" /> Inicio
              </Link>
            </li>

            {/* Submenu para Category */}
            <li>
              <button
                className={`flex items-center p-2 w-full text-left hover:bg-gray-100 ${activeMenu === 'category' ? 'bg-gray-200 text-blue-600' : ''}`}
                onClick={() => toggleSubMenu('category')}
              >
                <FaTags className="mr-2" /> Categoría
                {activeMenu === 'category' ? <FaChevronDown className="ml-auto" /> : <FaChevronRight className="ml-auto" />}
              </button>
              <ul className={`pl-8 mt-2 transition-transform duration-300 ${activeMenu === 'category' ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                <li>
                  <Link to="/createcategory" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                    <FaPlus className="mr-2" /> Crear Categoría
                  </Link>
                </li>
                <li>
                  <Link to="/editcategory" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                    <FaCog className="mr-2" /> Editar Categoría
                  </Link>
                </li>
              </ul>
            </li>

            {/* Submenu para Brand */}
            <li>
              <button
                className={`flex items-center p-2 w-full text-left hover:bg-gray-100 ${activeMenu === 'brand' ? 'bg-gray-200 text-blue-600' : ''}`}
                onClick={() => toggleSubMenu('brand')}
              >
                <FaProductHunt className="mr-2" /> Marca
                {activeMenu === 'brand' ? <FaChevronDown className="ml-auto" /> : <FaChevronRight className="ml-auto" />}
              </button>
              <ul className={`pl-8 mt-2 transition-transform duration-300 ${activeMenu === 'brand' ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                <li>
                  <Link to="/createbrand" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                    <FaPlus className="mr-2" /> Crear Marca
                  </Link>
                </li>
                <li>
                  <Link to="/editbrand" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                    <FaCog className="mr-2" /> Editar Marca
                  </Link>
                </li>
              </ul>
            </li>

              {/* Submenu para Gender */}
            <li>
              <button
                className={`flex items-center p-2 w-full text-left hover:bg-gray-100 ${activeMenu === 'gender' ? 'bg-gray-200 text-blue-600' : ''}`}
                onClick={() => toggleSubMenu('gender')}
              >
                <FaVenusMars className="mr-2" /> Genero
                {activeMenu === 'gender' ? <FaChevronDown className="ml-auto" /> : <FaChevronRight className="ml-auto" />}
              </button>
              <ul className={`pl-8 mt-2 transition-transform duration-300 ${activeMenu === 'gender' ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                <li>
                  <Link to="/creategender" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                    <FaPlus className="mr-2" /> Crear Genero
                  </Link>
                </li>
                <li>
                  <Link to="/editgender" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                    <FaCog className="mr-2" /> Editar Genero
                  </Link>
                </li>
              </ul>
            </li>
            
            {/* Submenu para Products */}
            <li>
              <button
                className={`flex items-center p-2 w-full text-left hover:bg-gray-100 ${activeMenu === 'product' ? 'bg-gray-200 text-blue-600' : ''}`}
                onClick={() => toggleSubMenu('product')}
              >
                <FaProductHunt className="mr-2" /> Productos
                {activeMenu === 'product' ? <FaChevronDown className="ml-auto" /> : <FaChevronRight className="ml-auto" />}
              </button>
              <ul className={`pl-8 mt-2 transition-transform duration-300 ${activeMenu === 'product' ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                <li>
                  <Link to="/createproduct" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                    <FaPlus className="mr-2" /> Crear Producto
                  </Link>
                </li>
                <li>
                  <Link to="/editproduct" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                    <FaCog className="mr-2" /> Editar Producto
                  </Link>
                </li>
              </ul>
            </li>
            {/* Submenu para User */}
            <li>
              <button
                className={`flex items-center p-2 w-full text-left hover:bg-gray-100 ${activeMenu === 'user' ? 'bg-gray-200 text-blue-600' : ''}`}
                onClick={() => toggleSubMenu('user')}
              >
                <FaUser className="mr-2" /> Usuarios
                {activeMenu === 'user' ? <FaChevronDown className="ml-auto" /> : <FaChevronRight className="ml-auto" />}
              </button>
              <ul className={`pl-8 mt-2 transition-transform duration-300 ${activeMenu === 'user' ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                <li>
                  <Link to="/createuser" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                    <FaPlus className="mr-2" /> Crear Usuario
                  </Link>
                </li>
                <li>
                  <Link to="/configureuser" className="flex items-center p-2 hover:bg-gray-100" onClick={handleMenuClick}>
                    <FaCog className="mr-2" /> Configurar Usuario
                  </Link>
                </li>
              </ul>
            </li>
          </ul>


          <button onClick={handleLogout} className="w-full text-center p-2 mt-4 hover:bg-red-700 hover:text-white flex items-center justify-center">
            <FaSignOutAlt className="mr-2" /> Cerrar Sesión
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

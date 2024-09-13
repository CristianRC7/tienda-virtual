import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaPlus } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
                <FaPlus className="mr-2" /> Create Category
              </Link>
            </li>
          </ul>
          <button onClick={handleLogout} className="w-full text-left p-2 hover:bg-gray-100">
            Logout
          </button>
        </nav>
      </div>
      <button onClick={toggleSidebar} className={`fixed top-4 left-4 z-50 text-gray-500 ${isOpen ? 'hidden' : 'block'}`}>
        <FaBars size={24} />
      </button>
    </div>
  );
};

export default Sidebar;

import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const SubMenu = ({ icon, title, activeMenu, setActiveMenu, menuName, links }) => {
  const isActive = activeMenu === menuName;
  const toggleMenu = () => {
    setActiveMenu(isActive ? null : menuName);
  };

  return (
    <li>
      <button
        className={`flex items-center p-2 w-full text-left hover:bg-gray-100 ${isActive ? 'bg-gray-200' : ''}`}
        onClick={toggleMenu}
      >
        {icon} {title}
        {isActive ? <FaChevronDown className="ml-auto" /> : <FaChevronRight className="ml-auto" />}
      </button>
      <ul className={`pl-8 mt-2 transition-all duration-300 ease-in-out ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.to} className="flex items-center p-2 hover:bg-gray-100">
              {link.icon} {link.text}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default SubMenu;

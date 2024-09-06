import React, { useState } from 'react'
import { ShoppingBag, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const toggleMenu = () => setMenuAbierto(!menuAbierto)

  const handleLinkClick = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const offset = 64
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      if (menuAbierto) {
        setMenuAbierto(false)
      }
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-gray-800" />
            <span className="ml-2 text-xl font-bold text-gray-800">Elegancia</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="#inicio" 
              className="text-gray-600 relative hover:text-gray-900 transition-all duration-300 hover:after:scale-x-100 after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bg-gray-900 after:bottom-0 after:left-0 after:transition-transform after:duration-300"
              onClick={(e) => handleLinkClick(e, 'inicio')}
            >
              Inicio
            </a>
            <a 
              href="#nosotros" 
              className="text-gray-600 relative hover:text-gray-900 transition-all duration-300 hover:after:scale-x-100 after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bg-gray-900 after:bottom-0 after:left-0 after:transition-transform after:duration-300"
              onClick={(e) => handleLinkClick(e, 'nosotros')}
            >
              Nosotros
            </a>
            <a 
              href="#productos" 
              className="text-gray-600 relative hover:text-gray-900 transition-all duration-300 hover:after:scale-x-100 after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bg-gray-900 after:bottom-0 after:left-0 after:transition-transform after:duration-300"
              onClick={(e) => handleLinkClick(e, 'productos')}
            >
              Productos
            </a>
            <a 
              href="#contactanos" 
              className="text-gray-600 relative hover:text-gray-900 transition-all duration-300 hover:after:scale-x-100 after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bg-gray-900 after:bottom-0 after:left-0 after:transition-transform after:duration-300"
              onClick={(e) => handleLinkClick(e, 'contactanos')}
            >
              Contactanos
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <div className={`transform transition-transform duration-300 ease-in-out ${menuAbierto ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}`}>
                {menuAbierto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </div>
            </button>
          </div>
        </div>
      </div>
      {menuAbierto && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="#inicio" 
              className="block px-3 py-2 text-base font-medium text-gray-600 relative hover:text-gray-900 transition-all duration-300 hover:after:scale-x-100 after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bg-gray-900 after:bottom-0 after:left-0 after:transition-transform after:duration-300"
              onClick={(e) => handleLinkClick(e, 'inicio')}
            >
              Inicio
            </a>
            <a 
              href="#nosotros" 
              className="block px-3 py-2 text-base font-medium text-gray-600 relative hover:text-gray-900 transition-all duration-300 hover:after:scale-x-100 after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bg-gray-900 after:bottom-0 after:left-0 after:transition-transform after:duration-300"
              onClick={(e) => handleLinkClick(e, 'nosotros')}
            >
              Nosotros
            </a>
            <a 
              href="#productos" 
              className="block px-3 py-2 text-base font-medium text-gray-600 relative hover:text-gray-900 transition-all duration-300 hover:after:scale-x-100 after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bg-gray-900 after:bottom-0 after:left-0 after:transition-transform after:duration-300"
              onClick={(e) => handleLinkClick(e, 'productos')}
            >
              Productos
            </a>
            <a 
              href="#contactanos" 
              className="block px-3 py-2 text-base font-medium text-gray-600 relative hover:text-gray-900 transition-all duration-300 hover:after:scale-x-100 after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bg-gray-900 after:bottom-0 after:left-0 after:transition-transform after:duration-300"
              onClick={(e) => handleLinkClick(e, 'contactanos')}
            >
              Contactanos
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

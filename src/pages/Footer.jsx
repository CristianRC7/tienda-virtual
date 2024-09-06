import React from 'react'
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer id='contactanos' className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Horarios de Atención</h3>
            <p className="text-gray-300 mb-2">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-300">Sábados: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-300">Domingos: Cerrado</p>
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-gray-300 mb-2">Teléfono: <a href="tel:(123) 456-7890" className="hover:text-gray-200">(123) 456-7890</a></p>
            <p className="text-gray-300">Email: <a href="mailto:info@elegancia.com" className="hover:text-gray-200">info@elegancia.com</a></p>
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Facebook">
                <FaFacebookF className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Instagram">
                <FaInstagram className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="TikTok">
                <FaTiktok className="h-7 w-7" />
              </a>
            </div>
            <p className="text-gray-300 text-sm">¡Síguenos para estar al tanto de nuestras últimas novedades y promociones!</p>
          </div>
        </div>
      
        <div className="mt-8 flex justify-center">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.5135500184633!2d-63.20363052495074!3d-17.767545574629214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e7f83ad7f1af%3A0x2c4f35a75cd60786!2sUTEPSA!5e0!3m2!1ses!2sbo!4v1725596784006!5m2!1ses!2sbo" 
            width="600" 
            height="450" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de ubicación"
          ></iframe>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300 text-sm">&copy; 2024 Elegancia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

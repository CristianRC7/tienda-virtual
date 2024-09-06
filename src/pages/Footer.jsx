import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Elegancia</h3>
              <p className="text-gray-300">Ofreciendo la mejor moda desde 2010</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <p className="text-gray-300">Teléfono: (123) 456-7890</p>
              <p className="text-gray-300">Email: info@elegancia.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300">&copy; 2023 Elegancia. Todos los derechos reservados.</p>
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
        </div>
      </footer>
  )
}

export default Footer

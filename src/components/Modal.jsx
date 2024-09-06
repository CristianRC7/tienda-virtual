import React, { useState } from 'react'

const Modal = ({ isOpen, onClose, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!isOpen) return null

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 p-4">
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>

        <div className="flex flex-col items-center">
          {/* Imagen del producto */}
          <div className="w-full mb-4">
            <img
              src={`http://localhost/tienda-virtual-backend/images/${images[currentIndex]}`}
              alt="Producto"
              className="w-full h-auto max-h-96 object-contain rounded-md shadow-lg"
            />
          </div>

          {/* Controles de navegación */}
          <div className="flex justify-between w-full mt-4">
            <button
              onClick={handlePrevImage}
              className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 focus:outline-none transition-all"
            >
              &larr; Anterior
            </button>
            <button
              onClick={handleNextImage}
              className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 focus:outline-none transition-all"
            >
              Siguiente &rarr;
            </button>
          </div>

          {/* Indicador de imagen actual */}
          <div className="mt-4 text-sm text-gray-500">
            Imagen {currentIndex + 1} de {images.length}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

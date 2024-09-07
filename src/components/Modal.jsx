import { useState } from 'react';

const Modal = ({ isOpen, onClose, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl font-bold"
        >
          &times;
        </button>

        <div className="p-4">
          {/* Imagen del producto */}
          <div className="w-full mb-4 flex justify-center">
            <img
              src={`http://localhost/tienda-virtual-backend/images/${images[currentIndex]}`}
              alt= "Imagen del producto"
              className="w-72 h-72 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Controles de navegacion */}
          <div className="flex justify-between items-center w-full mt-4">
            <button
              onClick={handlePrevImage}
              className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 focus:outline-none transition-transform transform hover:scale-105"
            >
              &larr; Anterior
            </button>
            <button
              onClick={handleNextImage}
              className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 focus:outline-none transition-transform transform hover:scale-105"
            >
              Siguiente &rarr;
            </button>
          </div>

          {/* Indicador de imagen actual */}
          <div className="mt-4 text-center text-sm text-gray-600">
            Imagen {currentIndex + 1} de {images.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

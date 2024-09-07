import { useEffect, useState } from 'react';
import { X, Trash, MessageCircle } from 'lucide-react';

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4; // Definimos 4 productos por página

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);

    // Deshabilitar scroll cuando el modal está abierto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = ''; // Restablecemos el scroll al desmontar el componente
    };
  }, [isOpen]);

  // Función para eliminar un item del carrito
  const removeFromCart = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Función para generar el mensaje de WhatsApp
  const handleWhatsAppClick = () => {
    const message = `Quiero más detalles de estos productos:\n${cartItems
      .map(item => `- ${item.nombre_producto} (${item.nombre_marca})`)
      .join('\n')}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/59175057788?text=${encodedMessage}`, '_blank');
  };

  // Función para manejar la paginación
  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < Math.ceil(cartItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Obtener los productos de la página actual
  const currentItems = cartItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Carrito de Compras</h2>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
          {currentItems.length > 0 ? (
            <div className="space-y-4">
              {currentItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">{item.nombre_producto}</h3>
                    <p className="text-gray-600">{item.nombre_marca}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart((currentPage - 1) * itemsPerPage + index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 transition-colors duration-300"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Consultar via WhatsApp
                </button>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handlePageChange('prev')}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                >
                  Anterior
                </button>
                <button
                  onClick={() => handlePageChange('next')}
                  disabled={currentPage === Math.ceil(cartItems.length / itemsPerPage)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === Math.ceil(cartItems.length / itemsPerPage) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                >
                  Siguiente
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">El carrito está vacío.</p>
          )}
        </div>
      </div>
    )
  );
};

export default CartModal;

import React, { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import Modal from '../components/Modal'
import CONFIG from '../config'

const ProductsSection = () => {
  const [productos, setProductos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [loading, setLoading] = useState(true)

  const itemsPerPage = 9
  const startIndex = (currentPage - 1) * itemsPerPage
  const selectedProducts = productos.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(productos.length / itemsPerPage)

  useEffect(() => {
    fetch(`${CONFIG.API_URL}/get_products.php`)
      .then((response) => response.json())
      .then((data) => {
        setProductos(data)
        setLoading(false) 
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
        setLoading(false) 
      })
  }, [])

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const openModal = (images) => {
    setSelectedImages(images)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImages([])
  }

  return (
    <section id="productos" className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Nuestros Productos</h2>
        
        {loading ? (
          <div className="flex flex-wrap justify-center gap-6">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 w-full sm:w-80 h-80 animate-pulse">
                <div className="bg-gray-300 w-full h-48 rounded-md mb-4"></div>
                <div className="bg-gray-300 w-3/4 h-6 mb-2"></div>
                <div className="bg-gray-300 w-1/2 h-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedProducts.map((producto) => (
              <div key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  className="w-full h-64 object-cover cursor-pointer"
                  src={`${CONFIG.API_URL}/images/${producto.imagenes[0]}`}
                  alt={producto.nombre_producto}
                  onClick={() => openModal(producto.imagenes)}
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{producto.nombre_producto}</h3>
                  <p className="text-gray-600">{producto.nombre_marca}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href={`https://wa.me/59175057788?text=Me%20interesa%20el%20producto%20${encodeURIComponent(producto.nombre_producto)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Consultar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
              className={`mr-4 px-4 py-2 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
            >
              Anterior
            </button>
            <button
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} images={selectedImages} />
    </section>
  )
}

export default ProductsSection

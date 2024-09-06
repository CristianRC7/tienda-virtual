import React, { useState } from 'react'
import { MessageCircle } from 'lucide-react'

const productos = [
  { id: 1, nombre: "Camisa Elegante", marca: "Elegance", imagen: "/placeholder.svg?height=300&width=300" },
  { id: 2, nombre: "Polera Deportiva", marca: "SportLine", imagen: "/placeholder.svg?height=300&width=300" },
  { id: 3, nombre: "Pantalón Casual", marca: "CasualWear", imagen: "/placeholder.svg?height=300&width=300" },
  { id: 4, nombre: "Chaqueta de Cuero", marca: "LeatherCraft", imagen: "/placeholder.svg?height=300&width=300" },
  { id: 5, nombre: "Vestido de Noche", marca: "Glamour", imagen: "/placeholder.svg?height=300&width=300" },
  { id: 6, nombre: "Jeans Clásicos", marca: "DenimStyle", imagen: "/placeholder.svg?height=300&width=300" },
  { id: 7, nombre: "Polera", marca: "Trendline", imagen: "/placeholder.svg?height=300&width=300" },
  { id: 8, nombre: "Polera Azul", marca: "BlueWave", imagen: "/placeholder.svg?height=300&width=300" },
  { id: 9, nombre: "Camisa Clásica", marca: "ClassicFit", imagen: "/placeholder.svg?height=300&width=300" },
  { id: 10, nombre: "Zapatos de Cuero", marca: "LeatherCraft", imagen: "/placeholder.svg?height=300&width=300" },
  { id: 11, nombre: "Bufanda de Lana", marca: "CozyWear", imagen: "/placeholder.svg?height=300&width=300" },
  { id: 12, nombre: "Sombrero de Paja", marca: "SummerVibes", imagen: "/placeholder.svg?height=300&width=300" }
]

const ProductsSection = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Calcular el índice de productos mostrados por página
  const startIndex = (currentPage - 1) * itemsPerPage
  const selectedProducts = productos.slice(startIndex, startIndex + itemsPerPage)

  // Calcular el número total de páginas
  const totalPages = Math.ceil(productos.length / itemsPerPage)

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <section id="productos" className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Nuestros Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedProducts.map((producto) => (
            <div key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-64 object-cover" src={producto.imagen} alt={producto.nombre} />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{producto.nombre}</h3>
                <p className="text-gray-600">{producto.marca}</p>
                <div className="mt-4 flex items-center justify-between">
                  <a
                    href={`https://wa.me/1234567890?text=Me%20interesa%20el%20producto%20${encodeURIComponent(producto.nombre)}`}
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

        {/* Paginación */}
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
      </div>
    </section>
  )
}

export default ProductsSection

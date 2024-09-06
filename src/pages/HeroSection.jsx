import React from 'react'
import portada from '../images/portada.png'

const HeroSection = () => {
  return (
    <section id="inicio" className="relative bg-gray-900 text-white">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={portada}
          alt="Imagen de portada de la tienda"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Bienvenido a Elegancia</h1>
        <p className="mt-6 text-xl max-w-3xl">Descubre las últimas tendencias en moda y encuentra tu estilo único con nuestra colección exclusiva de ropa y accesorios.</p>
      </div>
    </section>
  )
}

export default HeroSection

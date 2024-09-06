import React from 'react';
import portada from '../images/portada.png';

const HeroSection = () => {
  return (
    <section id="inicio" className="relative bg-gray-900 text-white min-h-screen">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={portada}
          alt="Imagen de portada de la tienda"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      </div>
      <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">Bienvenido a Elegancia</h1>
          <p className="mt-8 text-2xl sm:text-3xl lg:text-4xl max-w-3xl mx-auto">
            Descubre las últimas tendencias en moda y encuentra tu estilo único con nuestra colección exclusiva de ropa y accesorios.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

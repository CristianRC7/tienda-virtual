import { useState, useEffect } from 'react';
import portada1 from '../images/portada.png';
import portada2 from '../images/portada2.jpeg';
import portada3 from '../images/portada3.jpg';

const HeroSection = () => {
  const images = [portada1, portada2, portada3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="inicio" className="relative bg-gray-900 text-white min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Imagen ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
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

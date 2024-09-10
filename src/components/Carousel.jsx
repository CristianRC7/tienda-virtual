import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Carousel = ({ images, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-64 overflow-hidden cursor-pointer" onClick={onImageClick}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Imagen ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute inset-0 opacity-50"></div>
      )}
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default Carousel;

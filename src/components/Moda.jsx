import React from 'react'

const Modal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <img src={imageSrc} alt="Producto" className="max-w-full max-h-full" />
      </div>
    </div>
  )
}

export default Modal

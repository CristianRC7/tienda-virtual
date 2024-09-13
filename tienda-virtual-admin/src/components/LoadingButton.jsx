//import React from 'react';
import PropTypes from 'prop-types';

const LoadingButton = ({ loading, text, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-indigo-500 text-white py-2 rounded-lg focus:outline-none hover:bg-indigo-600 disabled:opacity-50"
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-3"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          {text}
        </span>
      ) : (
        text
      )}
    </button>
  );
};

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LoadingButton;
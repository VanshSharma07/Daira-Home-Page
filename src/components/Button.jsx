import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ label, route, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(route);
  };

  return (
    <button 
      onClick={handleClick} 
      className="bg-orange-500 text-white font-bold py-2 px-6 rounded-md text-sm"
    >
      {label}
    </button>
  );
};

export default Button;
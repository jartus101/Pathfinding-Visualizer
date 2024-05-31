import React from 'react';
import './Node.css';

const Node = ({ color, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      style={{ backgroundColor: color, opacity: 0.8 }} 
      className='Node'>
    </button>
  );
}

export default Node;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartItems } = useCart();

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition">
          🛒 E-Commerce App
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-lg font-medium hover:text-gray-300 transition"
          >
            Home
          </Link>
          
          <Link 
            to="/cart" 
            className="relative text-lg font-medium hover:text-gray-300 transition"
          >
            <FaShoppingCart className="inline-block text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

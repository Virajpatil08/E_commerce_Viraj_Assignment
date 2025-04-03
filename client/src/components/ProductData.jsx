import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { FaPlus } from "react-icons/fa";

const ProductData = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-white rounded-xl shadow-lg p-5 transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className="overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-90 object-cover transition-transform transform group-hover:scale-110"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 mt-1">{product.description}</p>
            <p className="text-lg font-bold text-gray-900 mt-2">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-green-600 transition-colors cursor-pointer"
            >
              <FaPlus /> Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductData;
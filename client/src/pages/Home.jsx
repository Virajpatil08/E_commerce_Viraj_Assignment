import React from "react";
import ProductData from "../components/ProductData";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Welcome To Our Store
        </h2>

        <h2 className="text-3xl font-semibold mb-6 text-center">
          Latest Products
        </h2>
        <ProductData />
      </div>
    </div>
  );
};
export default Home;

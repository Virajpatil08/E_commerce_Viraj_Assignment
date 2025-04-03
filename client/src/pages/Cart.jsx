import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  address: Yup.string().required("Address is required"),
});

const Cart = React.memo(() => {
  const { cartItems, total, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
    toast.success(`${item.name} quantity added!`);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
      toast.success(`${item.name} quantity removed!`);
    } else {
      updateQuantity(item.id, 0);
      toast.success(`${item.name} removed from cart!`);
    }
  };

  const placeOrder = async (values) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/order", {
        ...values,
        items: cartItems,
      });
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Order failed! " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const cartTotal = useMemo(() => total, [total]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <Link to="/" className="text-blue-500 hover:text-blue-700 cursor-pointer">
            ← Back to Home
          </Link>
        </div>
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-3xl font-semibold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-4">Add items to place an order.</p>
            <Link to="/">
              <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                Go to Home
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 justify-center">
            <div className="w-full lg:w-1/2 bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Shopping Cart Item Details</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b py-2">
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                  </div>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="mt-4 font-semibold text-xl">Total: ${cartTotal}</div>
            </div>
            <div className="w-full lg:w-1/2 bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Add Customer Details</h2>
              <Formik
                initialValues={{ firstName: "", lastName: "", address: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => placeOrder(values)}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">First Name</label>
                      <Field
                        name="firstName"
                        placeholder="First Name"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Last Name</label>
                      <Field
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Address</label>
                      <Field
                        name="address"
                        placeholder="Address"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        as="textarea"
                      />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 cursor-pointer"
                    >
                      {loading ? "Placing Order..." : "Place Order"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
});

export default Cart;

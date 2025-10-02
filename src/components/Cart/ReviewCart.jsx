import React, { useEffect, useState } from "react";
import { FaTicketAlt, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import rudrakshImg from "../../assets/rudraksh.png";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function ReviewCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const user = JSON.parse(localStorage.getItem("user"));
  // const userToken = user?.token;

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart`, {
        withCredentials: true,
      });
      const items = res.data.data.items;
      setCartItems(items || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to fetch cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove item from cart
  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`,
        {
          withCredentials: true,
        }
      );
      // Update local state
      setCartItems(
        cartItems.filter((item) => item.productId._id !== productId)
      );
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to remove item.");
    }
  };

  // Calculate totals
  const totalMRP = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const discount = 0; // calculate if you have discount info
  const totalAmount = totalMRP - discount;

  if (loading) return <p className="text-center mt-4">Loading cart...</p>;
  if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;

  return (
    <>
      <Header />{" "}
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.productId._id}
            className="rounded-2xl shadow-md bg-white"
          >
            <div className="flex items-start p-4 gap-4">
              <img
                src={
                  item.productId.coverImage
                    ? `${import.meta.env.VITE_BACKEND_URL}/${
                        item.productId.coverImage
                      }`
                    : rudrakshImg
                }
                alt={item.productId.name}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="font-semibold text-lg">
                    {item.productId.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {item.productId.description || "No description"}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-red-600 font-semibold text-lg">
                    ₹{item.productId.price}
                  </span>
                  <span className="line-through text-gray-400 text-sm">
                    ₹{item.productId.oldPrice || item.productId.price}
                  </span>
                </div>
                <div>
                  <span className="text-sm">Qty:</span>
                  {"   "}
                  <span>{item.quantity}</span>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4 gap-3 flex">
              <button
                onClick={() => removeItem(item.productId._id)}
                className="w-40 py-2 rounded bg-[#ba3400] text-white font-medium mb-2 hover:cursor-pointer"
              >
                Remove
              </button>
              <button className="w-40 py-2 rounded border-2 border-[#ba3400] text-[#bb0e00] font-medium mb-2 hover:cursor-pointer">
                Move to Wishlist
              </button>
            </div>
          </div>
        ))}

        {/* Totals Section */}
        <div className="rounded-2xl shadow-md bg-white">
          <div className="flex items-center justify-between mx-4 p-3 rounded-lg border-gray-400 border mt-3">
            <div className="flex items-center gap-4 text-gray-700 font-medium">
              <FaTicketAlt className="text-[#ba3400]" />
              <span>Coupon Code</span>
            </div>
            <FaChevronRight className="text-gray-500" />
          </div>
          <div className="p-4 text-sm">
            <h3 className="font-semibold text-gray-600 mb-3">
              Product Details
            </h3>
            <div className="flex justify-between mb-2">
              <span>Total MRP</span>
              <span>₹ {totalMRP}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount on MRP</span>
              <span>₹ {discount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping Fee</span>
              <span className="pl-2">Free</span>
            </div>
            <hr className="my-2 border-gray-400" />
            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹ {totalAmount}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0">Including Tax and GST</p>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/payment")}
            className="bg-[#ba3400] text-white py-2 px-6 rounded text-lg font-medium shadow-md hover:cursor-pointer"
          >
            Continue Payment
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

import React, { useState, useEffect } from "react";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  //   const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/cart`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.data.items);
        const items = res.data.data.items;

        if (res.data.status) {
          const transformedItems = items.map((item) => ({
            id: item._id, // optional: the cart item _id
            productId: item.productId._id, // ONLY the ObjectId
            name: item.productId.name || item.productId.title,
            price: item.productId.price,
            quantity: item.quantity,
            favorited: item.favorited || false,
          }));

          setCartItems(transformedItems);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      setUpdating(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`,
        { quantity: newQuantity },
        { withCredentials: true } // cookie-based auth
      );

      if (res.data.status) {
        setCartItems((items) =>
          items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Failed to update quantity. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleQuantityChange = (productId, change) => {
    const currentItem = cartItems.find((item) => item.productId === productId);
    if (currentItem) {
      const newQuantity = Math.max(1, currentItem.quantity + change);
      updateQuantity(productId, newQuantity);
    }
  };

  const removeItem = async (productId) => {
    try {
      setUpdating(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`,
        { withCredentials: true }
      );

      if (res.data.status) {
        setCartItems((items) =>
          items.filter((item) => item.productId !== productId)
        );
      }
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const toggleFavorite = (id) => {
    // This is local state only - you might want to add API call for favorites
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, favorited: !item.favorited } : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const CartItem = ({ item }) => (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-3">
      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
        <div className="w-12 h-12 bg-orange-800 rounded-full relative overflow-hidden">
          <div className="absolute inset-1 bg-orange-600 rounded-full">
            <div className="absolute inset-1 bg-orange-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-red-600 font-semibold">
            ₹{item.price?.toLocaleString()}
          </span>
        </div>
      </div>

      <button onClick={() => toggleFavorite(item.id)} className="p-1">
        <FaHeart
          className={`w-5 h-5 ${
            item.favorited ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>
    </div>
  );

  const QuantityControls = ({ item }) => (
    <div className="flex items-center gap-4 px-4 pb-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleQuantityChange(item.productId, -1)}
          disabled={updating}
          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaMinus className="w-4 h-4" />
        </button>
        <span className="font-medium min-w-[20px] text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.productId, 1)}
          disabled={updating}
          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPlus className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={() => removeItem(item.productId)}
        disabled={updating}
        className="text-gray-500 hover:text-red-500 text-sm ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Remove
      </button>
    </div>
  );

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your cart...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="max-w-6xl mx-auto p-4">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => {
                const fetchCartItems = async () => {
                  try {
                    setLoading(true);
                    const res = await axios.get(
                      `${import.meta.env.VITE_BACKEND_URL}/cart`,
                      { withCredentials: true }
                    );
                    if (res.data.status) {
                      const items = res.data.data.items;

                      if (res.data.status) {
                        const transformedItems = items.map((item) => ({
                          id: item._id, // optional: the cart item _id
                          productId: item.productId._id, // ONLY the ObjectId
                          name: item.productId.name || item.productId.title,
                          price: item.productId.price,
                          quantity: item.quantity,
                          favorited: item.favorited || false,
                        }));

                        setCartItems(transformedItems);
                      }
                    }
                  } catch (err) {
                    console.error("Error fetching cart:", err);
                    setError("Failed to load cart. Please try again.");
                  } finally {
                    setLoading(false);
                  }
                };
                fetchCartItems();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="max-w-6xl mx-auto p-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Add some products to get started!
            </p>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        {updating && (
          <div className="fixed top-0 left-0 right-0 bg-red-700 text-white text-center py-2 z-50">
            Updating cart...
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6">Shopping Cart</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="mb-4">
                <CartItem item={item} />
                <QuantityControls item={item} />
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-xl font-bold text-red-600">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  disabled={updating}
                  onClick={() => navigate("/cart-page")}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    !updating
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {updating ? "Processing..." : "Check Out"}
                </button>

                <button
                  disabled={updating}
                  className="w-full py-3 px-4 rounded-lg font-medium border border-red-600 text-red-600 hover:bg-red-50 mt-3 transition-colors disabled:opacity-50"
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;

import React from "react";
import axios from "axios";

export default function BookCard({ book, onClick, userToken }) {
  const truncateDescription = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
        {
          productId: book._id,
          quantity: 1,
          kind: "Book",
        },
        {
          withCredentials: true,
        }
      );
      alert("Item added to cart!");
      console.log(response.data.cart);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to add item to cart");
    }
  };

  return (
    <div className="flex flex-col justify-between p-2 bg-white shadow-lg rounded-md">
      <div
        onClick={onClick}
        className="cursor-pointer transition-shadow duration-300 text-center w-[300px]"
      >
        <img
          src={book.image}
          alt={book.title}
          className="h-40 object-cover mx-auto rounded mb-4"
        />
        <h3 className="font-semibold text-gray-900 mb-1 text-sm">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {truncateDescription(book.description, 10)}
        </p>
        <p className="text-sm font-semibold text-gray-900">{book.price}</p>
      </div>
      <div className="flex gap-[1rem]">
        <button className="flex-1 border-2 py-[5px] border-red-700 rounded-md text-red-700 text-sm cursor-pointer">
          View Details
        </button>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-[5px] rounded-md cursor-pointer bg-amber-800 text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

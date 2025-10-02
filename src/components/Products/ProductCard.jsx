import React from "react";

const ProductCard = ({
  title,
  orderId,
  qty,
  price,
  reviews,
  rating,
  image,
}) => {
  return (
    <div className="bg-white flex items-center min-shadow gap-[1rem] rounded-2xl p-3 max-w-[450px] h-[150px]  border border-gray-200">
      <div className="w-full h-full flex-1/3 flex items-center">
        <img src={image} alt={title} className="h-full object-contain" />
      </div>
      <div className="flex-2/3">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">ORD-{orderId}</p>
        <p className="text-sm text-gray-500">Qnt: {qty}</p>
        <p className="font-bold text-[#c02c07] mt-2">
          ₹{price.toLocaleString()}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 mr-1">⭐</span>
          <span className="text-sm text-gray-700">{rating}</span>
          <span className="text-sm text-gray-500 ml-1">
            ({reviews} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

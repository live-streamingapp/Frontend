import React from "react";
import ProductCard from "./ProductCard";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import product1 from "../../assets/product1.png";
import product2 from "../../assets/product2.png";
import product3 from "../../assets/product3.png";
import product4 from "../../assets/product4.png";
import product5 from "../../assets/product5.png";
import product from "../../assets/rudraksh.png";

const categories = [product1, product2, product3, product4, product5];

const products = [
  {
    id: 1,
    title: "7 Mukhi Rudraksha",
    orderId: "9845",
    qty: 10,
    price: 1299,
    rating: 4.9,
    reviews: 560,
    image: product,
  },
  {
    id: 2,
    title: "7 Mukhi Rudraksha",
    orderId: "9845",
    qty: 10,
    price: 1299,
    rating: 4.9,
    reviews: 560,
    image: product,
  },
  {
    id: 3,
    title: "7 Mukhi Rudraksha",
    orderId: "9845",
    qty: 10,
    price: 1299,
    rating: 4.9,
    reviews: 560,
    image: product,
  },
  {
    id: 4,
    title: "7 Mukhi Rudraksha",
    orderId: "9845",
    qty: 10,
    price: 1299,
    rating: 4.9,
    reviews: 560,
    image: product,
  },
  {
    id: 5,
    title: "7 Mukhi Rudraksha",
    orderId: "9845",
    qty: 10,
    price: 1299,
    rating: 4.9,
    reviews: 560,
    image: product,
  },
  {
    id: 6,
    title: "7 Mukhi Rudraksha",
    orderId: "9845",
    qty: 10,
    price: 1299,
    rating: 4.9,
    reviews: 560,
    image: product,
  },
  // Add more products here
];

const Products = () => {
  return (
    <>
      <Header />
      <div className="px-[1rem] py-6">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex flex-col items-center border-2 border-[#FFA4A4] bg-[#ffe6e3] px-4 py-3 rounded-xl cursor-pointer hover:bg-[#ffd5bd] transition"
            >
              <span className="h-[80px]">
                <img
                  src={categories[i]}
                  alt="products"
                  className="h-full object-contain"
                />
              </span>
              <p className="text-sm mt-1">{cat.name}</p>
            </div>
          ))}
        </div>

        {/* Slider */}
        <div className="bg-[#ffe6e3] rounded-xl flex items-center justify-center mb-8 py-[1rem]">
          <div className="w-[300px] h-[300px] rounded-lg border border-gray-300 relative bg-gradient-to-t from-gray-400 to-gray-200 p-[10px]">
            <img
              src="/images/diamond.webp"
              alt="New Arrival"
              className="rounded-lg object-cover h-full w-full"
            />
            <div className="absolute w-full flex items-center bottom-0 left-0 h-[80px] bg-black/30 backdrop-blur-[3px] text-white px-4 py-2 rounded-md">
              New Gemstones Arrival! • Get ₹999
            </div>
          </div>
        </div>

        {/* Recent Products */}
        <h2 className=" text-center text-2xl font-semibold mb-4">
          Recent Products
        </h2>
        <div className="flex gap-[1rem] flex-wrap justify-center px-[1rem]">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;

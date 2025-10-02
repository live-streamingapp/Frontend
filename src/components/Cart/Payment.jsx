import { useState, useEffect } from "react";
import axios from "axios";
import { FaCreditCard, FaWallet } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  const [netBanking, setNetBanking] = useState("");
  const [upiId, setUpiId] = useState("");

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Totals
  const [totalMRP, setTotalMRP] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem("user"))?.token;

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/cart`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const items = res.data.cart.items || [];
        setCartItems(items);

        // Calculate totals dynamically
        const mrp = items.reduce(
          (acc, item) => acc + (item.productId.price || 0) * item.quantity,
          0
        );
        const discounted = items.reduce(
          (acc, item) =>
            acc +
            ((item.productId.oldPrice || item.productId.price || 0) -
              (item.productId.price || 0)) *
              item.quantity,
          0
        );

        setTotalMRP(mrp + discounted);
        setDiscount(discounted);
        setTotalAmount(mrp);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Payment Methods */}
      <div className="bg-white p-4 rounded-2xl shadow space-y-4">
        <h2 className="font-semibold">Choose Payment Method</h2>

        {/* Card Payment */}
        <label
          className={`flex flex-col space-y-2 p-2 rounded-xl cursor-pointer border ${
            selectedMethod === "card" ? "border-[#bb0e00]" : "border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              checked={selectedMethod === "card"}
              onChange={() => setSelectedMethod("card")}
              className="w-4 h-4 accent-[#bb0e00] cursor-pointer"
            />
            <span className="flex items-center gap-2 font-medium">
              <FaCreditCard /> Credit or Debit Card
            </span>
          </div>

          {selectedMethod === "card" && (
            <div className="flex flex-col space-y-2 mt-2 ml-6">
              <input
                type="text"
                placeholder="Card Number"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                }
                className="border p-2 rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Name on Card"
                value={cardDetails.cardName}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardName: e.target.value })
                }
                className="border p-2 rounded-lg w-full"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Expiry MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  className="border p-2 rounded-lg w-1/2"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  className="border p-2 rounded-lg w-1/2"
                />
              </div>
            </div>
          )}
        </label>

        {/* Net Banking */}
        <label
          className={`flex flex-col space-y-2 p-2 rounded-xl cursor-pointer border ${
            selectedMethod === "netbanking"
              ? "border-[#bb0e00]"
              : "border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              checked={selectedMethod === "netbanking"}
              onChange={() => setSelectedMethod("netbanking")}
              className="w-4 h-4 accent-[#bb0e00] cursor-pointer"
            />
            <span className="font-medium">Net Banking</span>
          </div>

          {selectedMethod === "netbanking" && (
            <div className="flex flex-col mt-2 ml-6 space-y-2">
              <select
                value={netBanking}
                onChange={(e) => setNetBanking(e.target.value)}
                className="border p-2 rounded-lg w-1/2"
              >
                <option>Choose Bank</option>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
            </div>
          )}
        </label>

        {/* UPI Payment */}
        <label
          className={`flex flex-col space-y-2 p-2 rounded-xl cursor-pointer border ${
            selectedMethod === "upi" ? "border-[#bb0e00]" : "border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              checked={selectedMethod === "upi"}
              onChange={() => setSelectedMethod("upi")}
              className="w-4 h-4 accent-[#bb0e00] cursor-pointer"
            />
            <span className="flex items-center gap-1 font-medium">
              Other UPI Apps
            </span>
          </div>

          {selectedMethod === "upi" && (
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="border p-2 rounded-lg mt-2 ml-6 w-1/2"
            />
          )}
        </label>

        {/* Coupon Code */}
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer">
          <span className="flex items-center gap-2 font-medium">
            <MdLocalOffer className="text-[#ba1f00]" /> Apply Coupon Code
          </span>
        </div>

        {/* Confirm Payment Button */}
        <button className="w-full mt-4 bg-[#ba1f00] text-white py-3 rounded-xl hover:cursor-pointer">
          Pay ₹ {totalAmount.toLocaleString()}
        </button>
      </div>

      {/* Payment Summary */}
      <div className="bg-white p-4 rounded-2xl shadow space-y-2">
        <div className="flex justify-between">
          <span>Total MRP</span>
          <span>₹ {totalMRP.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>₹ {discount.toLocaleString()}</span>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total Amount</span>
          <span>₹ {totalAmount.toLocaleString()}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Including Tax and GST</p>
      </div>
    </div>
  );
}

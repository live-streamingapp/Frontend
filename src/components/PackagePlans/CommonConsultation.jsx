import React from "react";
import { FaCaretRight, FaShoppingCart } from "react-icons/fa";
// 🔹 Reusable Card Component
function CommonConsultation({ plan, style }) {
  return (
    <div
      className={`p-6 flex flex-col justify-between shadow-lg rounded-bl-2xl rounded-tr-2xl ${style.gradient} flex-1 min-w-[250px] max-w-[320px]`}
    >
      <div>
        <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
        <p className="text-sm text-center mb-4 opacity-80">{plan.desc}</p>

        <p className="text-4xl font-extrabold text-center">
          <sup className="text-[15px]">₹ </sup>
          {plan.price.split(".")[0]}
          <sup className="text-[15px] font-normal">
            .{plan.price.split(".")[1]}
          </sup>
        </p>
        <span className="block text-center opacity-50">Per Month</span>

        <ul className="mt-4 space-y-2">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <FaCaretRight className={style.icon} />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`mt-6 px-5 py-2 font-semibold rounded-md flex items-center justify-center gap-2 mx-auto ${style.button}`}
      >
        <FaShoppingCart />
        Buy Now
      </button>
    </div>
  );
}

export default CommonConsultation;

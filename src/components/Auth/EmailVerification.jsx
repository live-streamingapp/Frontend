import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

export default function EmailVerification() {
  const navigate = useNavigate();
  const [code, setCode] = useState([null, null, null, null, null, null]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const otp = code.join("");
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    try {
      setLoading(true);

      // Get the user data from localStorage
      const userString = localStorage.getItem("user");
      if (!userString) {
        setError("No verification session found. Please register again.");
        return;
      }

      const userData = JSON.parse(userString);
      const token = userData.token; // Extract token from user object

      if (!token) {
        setError("Verification token not found. Please register again.");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/verify-otp`,
        {
          token,
          otp,
        }
      );

      console.log("OTP Verified:", res.data.data);

      // Show success message
      setMessage("Email verified successfully! Redirecting to login...");

      // After successful verification, you might want to update the user object
      const updatedUserData = {
        ...userData,
        verified: true, // Add verified flag
      };
      localStorage.setItem("user", JSON.stringify(updatedUserData));

      // cleanup and redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.error("Verification error:", err);

      // Better error handling
      if (err.response) {
        const errorMessage = err.response.data?.message;

        if (errorMessage === "User already verified") {
          setMessage("Your email is already verified. You can login now.");
          setTimeout(() => navigate("/auth/login"), 2000);
        } else if (errorMessage === "Verification token expired") {
          setError("Verification session expired.");
          setMessage("Please register again to get a new verification code.");
        } else {
          setError(errorMessage || "Verification failed");
        }
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFCFC] overflow-hidden px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-transparent border border-red-600 rounded-[15px] p-12 z-10"
      >
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-[24px] font-medium text-black mb-2">
            Email Verification
          </h2>
          <p className="text-[16px] text-black/60 text-center">
            Please enter the 6-digit code we sent to your email address.
          </p>

          {/* OTP Inputs */}
          <div className="grid grid-cols-6 gap-1 md:gap-3">
            {code.map((val, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                maxLength="1"
                value={val}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={`h-[60px] max-w-[60px] rounded-[10px] border text-center text-[24px] text-[#BB0E00] font-normal focus:outline-none ${
                  val ? "border-[#BC3D03]" : "border-gray-400"
                }`}
                required
              />
            ))}
          </div>

          {/* Success Message */}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[55px] bg-gradient-to-b from-[#BB0E00] to-[#B94400] text-white text-[14px] font-semibold rounded-[10px] shadow-inner border border-[#BB0E00] disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify and Proceed"}
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/reset-password/${token}`,
        { password, confirmPassword }
      );

      alert(res.data.message);
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FCFCFC] flex items-center justify-center px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute w-[545px] h-[545px] bg-[#BB0E00] opacity-[0.18] rounded-full blur-[329.9px] top-[-170px] left-[1049px]" />
      <div className="absolute w-[545px] h-[545px] bg-[#BB0E00] opacity-[0.18] rounded-full blur-[329.9px] top-[622px] left-[-179px]" />

      <form
        onSubmit={handleSubmit}
        className="w-[500px] p-[40px] border border-[#FF0000] rounded-[15px] bg-transparent flex flex-col gap-[20px] z-10"
      >
        <div className="flex flex-col items-center gap-[10px] w-full">
          <h2 className="text-[22px] font-medium text-black text-center font-sans">
            Reset Password
          </h2>
          {email && (
            <p>
              Enter the code we've sent to <b>{email}</b>
            </p>
          )}
          <p className="text-sm text-[rgba(0,0,0,0.6)] text-center font-sans leading-tight">
            Your new password must be different <br /> from previously used
            passwords.
          </p>
        </div>

        {/* Password Field */}
        <div className="relative w-full p-[10px] flex items-center bg-white shadow-[0_0_13px_rgba(0,0,0,0.08)] rounded-[10px]">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none border-none"
          />
          {showPassword ? (
            <IoEyeOffOutline
              size={"1.25rem"}
              className="cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEyeOutline
              size={"1.25rem"}
              className="cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="relative w-full p-[10px] flex items-center bg-white shadow-[0_0_13px_rgba(0,0,0,0.08)] rounded-[10px]">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full outline-none border-none"
          />
          {showConfirmPassword ? (
            <IoEyeOffOutline
              size={"1.25rem"}
              className="cursor-pointer"
              onClick={() => setShowConfirmPassword(false)}
            />
          ) : (
            <IoEyeOutline
              size={"1.25rem"}
              className="cursor-pointer"
              onClick={() => setShowConfirmPassword(true)}
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full h-[50px] px-[15px] text-white text-sm font-semibold font-sans rounded-[10px] border border-[#BB0E00] outline outline-[#BB0E00] outline-offset-[-1px] 
            bg-gradient-to-b from-[#BB0E00] to-[#B94400] shadow-[inset_0_4px_12.4px_rgba(255,255,255,0.25)] flex items-center justify-center"
        >
          Continue
        </button>
      </form>

      <div className="absolute bottom-6 text-center text-[12px] text-[rgba(0,0,0,0.6)] font-normal font-sans leading-[18.6px] z-10">
        By proceeding, you agree to abide by our <br />
        <a href="#" className="text-black underline font-medium">
          Terms
        </a>{" "}
        and{" "}
        <a href="#" className="text-black underline font-medium">
          Conditions
        </a>
        .
      </div>
    </div>
  );
}

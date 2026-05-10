import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import authservice from "../services/auth.service";
import { toast } from "react-toastify";

const ForgotPasswordModal = ({ isOpen, onClose }) => {

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [sendingOtp, setSendingOtp] = useState(false);

  const [resettingPassword, setResettingPassword] = useState(false);

  const [form, setForm] = useState({
    otp: "",
    password: "",
    confirmPassword: ""
  });

  if (!isOpen) return null;


  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      setSendingOtp(true);

      const data = await authservice.forgotPassword(email);

      toast.success(data.message || "OTP sent to your email");

      setStep(2);

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Failed to send OTP"
      );

    } finally {
      setSendingOtp(false);
    }
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    try {

      setResettingPassword(true);

      const data =
        await authservice.verifyOtpForgotPassword({
          email,
          ...form
        });

      toast.success(
        data.message ||
        "Password reset successfully"
      );

      onClose();

      setStep(1);

      setEmail("");

      setForm({
        otp: "",
        password: "",
        confirmPassword: ""
      });

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Failed to reset password"
      );

    } finally {

      setResettingPassword(false);

    }
  };


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };



  return (
    <div className="
      fixed inset-0
      bg-black/30
      backdrop-blur-sm
      flex items-center justify-center
      z-50
    ">

      <motion.div
        initial={{ scale: .85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          bg-white
          w-full max-w-md
          rounded-2xl
          shadow-xl
          p-6
          relative
        "
      >

        {/* Close */}
        <button
          disabled={sendingOtp || resettingPassword}
          onClick={onClose}
          className="
            absolute top-4 right-4 text-gray-500
            disabled:opacity-50
          "
        >
          <FaTimes />
        </button>


        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Forgot Password
        </h2>



        {/* STEP 1 */}
        {step === 1 && (
          <form
            onSubmit={handleSendOtp}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <div className="relative">

                <FaEnvelope className="
                  absolute left-4 top-4 text-gray-400
                " />

                <input
                  type="email"
                  required
                  value={email}
                  disabled={sendingOtp}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="
                    w-full border rounded-lg
                    pl-12 pr-4 py-3
                    disabled:bg-gray-100
                  "
                />

              </div>

            </div>

            <button
              disabled={sendingOtp}
              className="
                w-full bg-blue-700 text-white
                py-3 rounded-lg
                hover:bg-blue-800
                disabled:opacity-70
                disabled:cursor-not-allowed
              "
            >
              {sendingOtp
                ? "Sending OTP..."
                : "Send OTP"}
            </button>

          </form>
        )}



        {/* STEP 2 */}
        {step === 2 && (
          <form
            onSubmit={handleResetPassword}
            className="space-y-5"
          >

            {/* OTP */}
            <div>
              <label className="block mb-2 font-medium">
                OTP
              </label>

              <div className="relative">

                <FaKey className="
                  absolute left-4 top-4 text-gray-400
                " />

                <input
                  name="otp"
                  required
                  disabled={resettingPassword}
                  value={form.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="
                    w-full border rounded-lg
                    pl-12 pr-4 py-3
                    disabled:bg-gray-100
                  "
                />

              </div>
            </div>


            {/* Password */}
            <div>
              <label className="block mb-2 font-medium">
                New Password
              </label>

              <div className="relative">

                <FaLock className="
                  absolute left-4 top-4 text-gray-400
                " />

                <input
                  type="password"
                  name="password"
                  required
                  disabled={resettingPassword}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="
                    w-full border rounded-lg
                    pl-12 pr-4 py-3
                    disabled:bg-gray-100
                  "
                />

              </div>
            </div>


            {/* Confirm Password */}
            <div>
              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <div className="relative">

                <FaLock className="
                  absolute left-4 top-4 text-gray-400
                " />

                <input
                  type="password"
                  name="confirmPassword"
                  required
                  disabled={resettingPassword}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="
                    w-full border rounded-lg
                    pl-12 pr-4 py-3
                    disabled:bg-gray-100
                  "
                />

              </div>
            </div>


            <button
              disabled={resettingPassword}
              className="
                w-full bg-blue-700 text-white
                py-3 rounded-lg
                disabled:opacity-70
                disabled:cursor-not-allowed
              "
            >
              {resettingPassword
                ? "Resetting Password..."
                : "Reset Password"}
            </button>

          </form>
        )}

      </motion.div>
    </div>
  );
};

export default ForgotPasswordModal;
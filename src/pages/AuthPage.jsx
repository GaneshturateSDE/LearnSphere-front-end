import React, { use, useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiType,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { USER_TYPES } from "../constants/user.constant";
import authService from "../services/auth.service.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { toast } from "react-toastify";
import ForgotPasswordModal from "../components/ForgotPasswordModal.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigation = useNavigate();
  const userTypeRef = useRef();
  const  [signUpPayload, setSignUpPayload] = useState({
    name: "",
    email: "",
    userType: "",
    profileUrl: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const { storeUser, storeToken } = useAuth();

  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    

    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(Math.min(strength, 5));
  }, [password]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        const result = await authService.login(data);
        storeToken(result.token);
        storeUser(result.user);
        reset();
        toast.success(result.message || "Login successful");
      } else {
        const result = await authService.signup(data);
        reset();
        if (result.otp) setIsOtp(true);

        toast.success(result.message);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(error?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  const otpRef = useRef();

  const verifyOtp = async () => {
    setIsLoading(true);
    const otpValue = otpRef.current.value.trim();
    console.log("Verifying OTP:", otpValue);
    try {
      const result = await authService.verifyOtp(otpValue);
      storeToken(result.token);
      toast.success(result.message || "OTP verified successfully");
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error(error?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsOtp(false);
      }, 4000);
    }
  };

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    console.log(decoded);

    /*
      decoded.email
      decoded.name
      decoded.picture
    */

    const payload = {
      email: decoded.email,
      name: decoded.name,
      profileUrl: decoded.picture,
    };
    console.log("Google login payload:", payload);

    try {
      setSignUpPayload({...payload});
      const data = await authService.loginWithGoogle(payload);
      storeToken(data.token);
      storeUser(data.user);
      toast.success(data.message || "Login successful");
      navigation("/");
    
      
    } catch (error) {
      console.error("Google login error:", error);
      toast.warning(error?.message)
      setIsSignup(true);
    }
  };

  const signupWithGoogle = async () => {
    try {
      console.log("User type selected for Google signup:", userTypeRef.current.value);
      const data = await authService.signupWithGoogle({...signUpPayload, userType: userTypeRef.current.value});
      storeToken(data.token);
      storeUser(data.user);

      toast.success(data.message || "Signup successful");
      navigation("/");
    } catch (error) {
      console.error("Google signup error:", error);
    }
  };

  const toggleAuthMode = () => {
    reset();
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
      <div className="w-full flex justify-around ">
        <div>
          <img
            src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-2-x1.webp"
            alt=""
            srcSet=""
          />
        </div>
        {!isOtp ? (
          <div className="bg-white w-1/3 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            {/* Header (fixed height) */}
            <div className="text-center p-6 bg-white">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-600">
                {isLogin
                  ? "Login to access your dashboard"
                  : "Join us to start learning"}
              </p>
            </div>

            {/* Toggle Buttons (fixed height) */}
            <div className="flex bg-gray-100 p-1 mx-6 rounded-lg">
              <button
                className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${isLogin ? "bg-white shadow-sm text-blue-600 font-medium" : "text-gray-600"}`}
                onClick={toggleAuthMode}
                disabled={isLogin}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${!isLogin ? "bg-white shadow-sm text-blue-600 font-medium" : "text-gray-600"}`}
                onClick={toggleAuthMode}
                disabled={!isLogin}
              >
                Sign Up
              </button>
            </div>

            {/* Form Container (grows from bottom) */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isLogin ? "max-h-96" : "max-h-[570px]"}`}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-6 py-4 space-y-5"
              >
                {/* Name (only for signup) */}
                {!isLogin && (
                  <div className="space-y-1 animate-fadeIn">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters",
                          },
                        })}
                        className="pl-10 mt-1 block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}
                {/* User Type (only for signup) */}
                {!isLogin && (
                  <div className="space-y-1 animate-fadeIn">
                    <label className="block text-sm font-medium text-gray-700">
                      Signup AS
                    </label>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiType className="text-gray-400" />
                      </div>

                      <select
                        {...register("userType", {
                          required: "User type is required",
                        })}
                        className="pl-10 mt-1 block w-full border border-gray-300 rounded-lg p-2.5 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                   bg-white"
                      >
                        <option value="">Select Signup Type </option>
                        <option value={USER_TYPES.STUDENT}>STUDENT</option>
                        <option value={USER_TYPES.INSTRUCTOR}>
                          INSTRUCTOR
                        </option>
                      </select>
                    </div>

                    {errors.userType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.userType.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="pl-10 mt-1 block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="pl-10 mt-1 block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {!isLogin && password && (
                    <div className="mt-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${i <= passwordStrength ? getStrengthColor(passwordStrength) : "bg-gray-200"}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {getStrengthText(passwordStrength)}
                      </p>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Forgot Password (only for login) */}
                {isLogin && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
                      onClick={() => setForgotPasswordOpen(true)}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {isLogin ? "Logging in..." : "Creating account..."}
                    </span>
                  ) : isLogin ? (
                    "Login"
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
            </div>

            {isLogin && (
              <div className="w-full flex justify-center px-6">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => console.log("Login failed")}
                />
              </div>
            )}

            <div className="px-6 pb-6 mt-2 text-center text-sm text-gray-600">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={toggleAuthMode}
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={toggleAuthMode}
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white w-1/3 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex items-center justify-center p-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-600 mb-4">
                OTP Sent!
              </h2>
              <div className="flex gap-7">
                <input
                  type="text"
                  ref={otpRef}
                  required
                  className="pl-10 mt-1 block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="enter OTP here"
                />
                <button
                  onClick={() => verifyOtp()}
                  className="px-4  bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  {isLoading && (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {isLoading ? "verifying..." : "Verify OTP"}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ForgotPasswordModal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
      {isSignup && (
        <div
          className=" fixed inset-0
      bg-white/30
      border
      
      backdrop-blur-sm
      justify-center
      z-50 rounded-lg shadow-lg flex flex-col items-center space-y-4"
        >
          <h1 className="text-3xl text-blue-600 font-bold">Create New Account</h1>
          <div className="space-y-1 w-1/5 animate-fadeIn">
            <label className="block text-sm font-medium text-gray-700">
              Signup AS
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiType className="text-gray-400" />
              </div>

              <select
                ref={userTypeRef}
                name="signupUserType"
                className="pl-10 mt-1 block w-full border border-gray-300 rounded-lg p-2.5 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                   bg-white"
              >
                <option value="">Select Signup Type </option>
                <option value={USER_TYPES.STUDENT}>STUDENT</option>
                <option value={USER_TYPES.INSTRUCTOR}>INSTRUCTOR</option>
              </select>
            </div>
          </div>
          <div className="w-1/5 ">
            <button
              className="bg-blue-600 w-full rounded px-4 py-2 "
              type="button"
              onClick={signupWithGoogle}
            >
              Signup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions for password strength
function getStrengthColor(strength) {
  if (strength <= 2) return "bg-red-400";
  if (strength === 3) return "bg-yellow-400";
  return "bg-green-500";
}

function getStrengthText(strength) {
  if (strength <= 2) return "Weak password";
  if (strength === 3) return "Moderate password";
  if (strength === 4) return "Strong password";
  return "Very strong password";
}

export default AuthPage;

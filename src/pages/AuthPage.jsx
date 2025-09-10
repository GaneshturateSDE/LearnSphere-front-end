import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    const password = watch('password', '');

    React.useEffect(() => {
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
                console.log("Logging in with:", data);
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                console.log("Signing up with:", data);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (error) {
            console.error("Authentication error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleAuthMode = () => {
        reset();
        setIsLogin(!isLogin);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    {/* Header (fixed height) */}
                    <div className="text-center p-6 bg-white">
                        <h2 className="text-3xl font-bold text-blue-600 mb-2">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-gray-600">
                            {isLogin ? "Login to access your dashboard" : "Join us to start learning"}
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
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isLogin ? 'max-h-96' : 'max-h-[500px]'}`}>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                            {/* Name (only for signup) */}
                            {!isLogin && (
                                <div className="space-y-1 animate-fadeIn">
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
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
                                                    message: "Name must be at least 3 characters"
                                                }
                                            })}
                                            className="pl-10 mt-1 block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>
                            )}

                            {/* Email */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
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
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className="pl-10 mt-1 block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
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
                                                message: "Password must be at least 6 characters"
                                            }
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
                                                    className={`h-1 flex-1 rounded-full ${i <= passwordStrength ? getStrengthColor(passwordStrength) : 'bg-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {getStrengthText(passwordStrength)}
                                        </p>
                                    </div>
                                )}
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Forgot Password (only for login) */}
                            {isLogin && (
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {isLogin ? "Logging in..." : "Creating account..."}
                                    </span>
                                ) : (
                                    isLogin ? "Login" : "Sign Up"
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="px-6 pb-6 text-center text-sm text-gray-600">
                        {isLogin ? (
                            <>
                                Don't have an account?{' '}
                                <button
                                    onClick={toggleAuthMode}
                                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition"
                                >
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
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
            </div>
        </div>
    );
};

// Helper functions for password strength
function getStrengthColor(strength) {
    if (strength <= 2) return 'bg-red-400';
    if (strength === 3) return 'bg-yellow-400';
    return 'bg-green-500';
}

function getStrengthText(strength) {
    if (strength <= 2) return 'Weak password';
    if (strength === 3) return 'Moderate password';
    if (strength === 4) return 'Strong password';
    return 'Very strong password';
}

export default AuthPage;
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import Logo from "/logo.png";
import toast from "react-hot-toast";

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (user && user.role === "admin") {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleLogin = async (data) => {
        const result = await login(data.email, data.password);

        if (result.success) {
            toast.success("Login successful!");
            navigate("/dashboard");
        } else {
            toast.error(result.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="p-20">
            {/* Left: Form */}
            <div className="flex flex-col md:flex-row bg-[#F3FAEF]">
                <div className="w-full md:w-1/2  flex items-center justify-center px-6 py-10">
                    <div className="w-full max-w-md space-y-6">
                        {/* Logo */}
                        <Link to={"/"} className="w-full mx-auto text-center">
                            <img src={Logo} className="h-16 mx-auto " alt="logo" />
                        </Link>

                        {/* Headings */}
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 font-family-primary mt-1">
                                Login to your Account
                            </h2>
                            <p className="text-sm text-gray-500 pt-0.5">
                                See what’s going on with your business
                            </p>
                        </div>

                        {/* Google Button */}
                        <button className="w-full border border-gray-300 rounded px-4 py-2 flex items-center justify-center gap-2 text-sm hover:bg-gray-100 cursor-pointer">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="w-4 h-4"
                            />
                            Continue with Google
                        </button>

                        {/* Or divider */}
                        <div className="flex items-center justify-between">
                            <hr className="w-1/3 border-gray-300" />
                            <span className="text-sm text-gray-500">or sign in with email</span>
                            <hr className="w-1/3 border-gray-300" />
                        </div>

                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email")}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
                                    placeholder="example@domain.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        className="mt-1 w-full px-3 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-3 right-3 text-gray-400"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Forgot */}
                            <div className="text-right">
                                <a href="#" className="text-sm text-green-700 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#3E6D2F] text-white font-semibold py-2 rounded flex items-center justify-center gap-2 hover:bg-[#345b28] transition cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                                ) : (
                                    <>
                                        <LogIn className="h-5 w-5" />
                                        Sign in
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Register link */}
                        <p className="text-center text-sm text-gray-600">
                            Not Registered Yet?{" "}
                            <Link
                                to="/register"
                                className="text-green-700 font-medium hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right: Image */}
                <div className="w-full md:w-1/2 h-[300px] md:h-[650px]">
                    <img
                        src="/login.png"
                        alt="Login Illustration"
                        className="w-full h-full object-cover rounded-l-3xl"
                    />
                </div>
            </div>
        </div>
    );
}

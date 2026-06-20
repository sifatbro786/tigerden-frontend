import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import Logo from "/logo2.png";
import toast from "react-hot-toast";

const schema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
    const { register: signup, user } = useAuth();
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

    const handleRegister = async (data) => {
        const result = await signup(data.name, data.email, data.password);

        if (result.success) {
            toast.success("Registration successful!");
            navigate("/dashboard");
        } else {
            toast.error(result.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="p-20">
            <div className="flex flex-col md:flex-row bg-[#F3FAEF]">
                <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">
                    <div className="w-full max-w-md space-y-6">
                        <Link to="/" className="w-full mx-auto text-center">
                            <img src={Logo} className="h-16 mx-auto" alt="logo" />
                        </Link>

                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 font-family-primary mt-1">
                                Create a New Account
                            </h2>
                            <p className="text-sm text-gray-500">
                                Join and grow your business with us
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register("name")}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
                                    placeholder="Your name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

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
                                        <UserPlus className="h-5 w-5" />
                                        Register
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-green-700 font-medium hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right: Image */}
                <div className="w-full md:w-1/2 h-[300px] md:h-[650px]">
                    <img
                        src="/register.png"
                        alt="Register Illustration"
                        className="w-full h-full object-cover rounded-l-3xl"
                    />
                </div>
            </div>
        </div>
    );
}

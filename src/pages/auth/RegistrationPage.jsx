// src/pages/auth/RegistrationPage.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus, Compass, Waves, Mountain } from "lucide-react";

const schema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
});

export default function RegistrationPage() {
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
        if (user && (user.role === "admin" || user.role === "super_admin")) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleRegister = async (data) => {
        const result = await signup(data.name, data.email, data.password, data.phone);
        if (result.success) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
            <div className="w-full max-w-6xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-emerald-100/50">
                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    {/* Decorative Element */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                        <span className="text-xs font-medium text-emerald-600 tracking-wider uppercase">
                            Tigersden Tourism
                        </span>
                    </div>

                    {/* Logo & Brand */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                <span className="text-2xl font-bold text-white">🐯</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Join the Adventure
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Start your journey with us today
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none"
                                placeholder="John Doe"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email Address
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none"
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Phone Number (Optional)
                            </label>
                            <input
                                type="tel"
                                {...register("phone")}
                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none"
                                placeholder="+880 1XXX-XXXXXX"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none pr-12"
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    {/* Decorative Footer */}
                    <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                            <Compass className="w-3 h-3" /> Explore
                        </span>
                        <span className="w-px h-4 bg-gray-200"></span>
                        <span className="flex items-center gap-1">
                            <Waves className="w-3 h-3" /> Adventure
                        </span>
                        <span className="w-px h-4 bg-gray-200"></span>
                        <span className="flex items-center gap-1">
                            <Mountain className="w-3 h-3" /> Discover
                        </span>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:block w-1/2 relative bg-gradient-to-br from-emerald-600 to-teal-700 p-8">
                    <div className="h-full rounded-2xl overflow-hidden relative">
                        <img
                            src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop"
                            alt="Travel Community"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

                        {/* Overlay Quote */}
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                            <blockquote className="text-xl font-light italic leading-relaxed">
                                "Travel is the only thing you buy that makes you richer."
                            </blockquote>
                            <p className="text-sm text-white/70 mt-2 font-medium">— Unknown</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

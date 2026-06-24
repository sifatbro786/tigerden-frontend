// src/pages/auth/LoginPage.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, Compass, Waves, Mountain, X } from "lucide-react";
import Logo from "/logo.png";

// Google OAuth - Load script dynamically
const loadGoogleScript = () => {
    return new Promise((resolve) => {
        if (document.getElementById("google-oauth-script")) {
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.id = "google-oauth-script";
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.body.appendChild(script);
    });
};

const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z
    .object({
        email: z.string().email("Invalid email address"),
        otp: z.string().length(6, "OTP must be 6 digits"),
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export default function LoginPage() {
    const { login, googleLogin, forgotPassword, resetPassword, user } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const {
        register: registerForgot,
        handleSubmit: handleForgotSubmit,
        formState: { errors: forgotErrors, isSubmitting: forgotSubmitting },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const {
        register: registerReset,
        handleSubmit: handleResetSubmit,
        formState: { errors: resetErrors, isSubmitting: resetSubmitting },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: resetEmail,
        },
    });

    // FIXED: Check if user exists before accessing role
    useEffect(() => {
        if (user && (user.role === "admin" || user.role === "super_admin")) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    useEffect(() => {
        // Initialize Google OAuth
        const initGoogleLogin = async () => {
            await loadGoogleScript();

            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: async (response) => {
                        const result = await googleLogin(response.credential);
                        if (result.success) {
                            navigate("/dashboard");
                        }
                    },
                });
                window.google.accounts.id.renderButton(
                    document.getElementById("google-signin-button"),
                    {
                        theme: "outline",
                        size: "large",
                        width: "300px",
                        text: "continue_with",
                        logo_alignment: "center",
                    },
                );
            }
        };

        initGoogleLogin();
    }, [googleLogin, navigate]);

    const handleLogin = async (data) => {
        const result = await login(data.email, data.password);
        if (result.success) {
            navigate("/dashboard");
        }
    };

    const handleForgotPassword = async (data) => {
        const result = await forgotPassword(data.email);
        if (result.success) {
            setResetEmail(data.email);
            setShowForgotPassword(false);
            setShowResetPassword(true);
        }
    };

    const handleResetPassword = async (data) => {
        const result = await resetPassword(data.email, data.otp, data.newPassword);
        if (result.success) {
            setShowResetPassword(false);
            navigate("/login");
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
                            <Link
                                to="/"
                                className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30"
                            >
                                <img src={Logo} alt="Tigerden Tourism" className="object-cover" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                                <p className="text-sm text-gray-500">
                                    Sign in to manage your adventures
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
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
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none pr-12"
                                    placeholder="••••••••"
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

                        <div className="flex items-center justify-between">
                            <div></div>
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                            >
                                Forgot password?
                            </button>
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
                                    <LogIn className="w-5 h-5" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">or continue with</span>
                        </div>
                    </div>

                    {/* Google Sign In */}
                    <div className="w-full flex justify-center">
                        <div id="google-signin-button"></div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                            >
                                Create one now
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
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop"
                            alt="Travel Adventure"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

                        {/* Overlay Quote */}
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                            <blockquote className="text-xl font-light italic leading-relaxed">
                                "The world is a book, and those who do not travel read only one
                                page."
                            </blockquote>
                            <p className="text-sm text-white/70 mt-2 font-medium">
                                — Saint Augustine
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                            onClick={() => setShowForgotPassword(false)}
                        />
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900">Forgot Password</h3>
                                <button
                                    onClick={() => setShowForgotPassword(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form
                                onSubmit={handleForgotSubmit(handleForgotPassword)}
                                className="p-6 space-y-4"
                            >
                                <p className="text-sm text-gray-600">
                                    Enter your email address and we'll send you a 6-digit OTP to
                                    reset your password.
                                </p>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        {...registerForgot("email")}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none"
                                        placeholder="you@example.com"
                                    />
                                    {forgotErrors.email && (
                                        <p className="text-red-500 text-xs mt-1.5">
                                            {forgotErrors.email.message}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={forgotSubmitting}
                                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 disabled:opacity-70"
                                >
                                    {forgotSubmitting ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                                    ) : (
                                        "Send OTP"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {showResetPassword && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                            onClick={() => setShowResetPassword(false)}
                        />
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900">Reset Password</h3>
                                <button
                                    onClick={() => setShowResetPassword(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form
                                onSubmit={handleResetSubmit(handleResetPassword)}
                                className="p-6 space-y-4"
                            >
                                <p className="text-sm text-gray-600">
                                    Enter the 6-digit OTP sent to your email and your new password.
                                </p>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        {...registerReset("email")}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none"
                                        placeholder="you@example.com"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        OTP Code
                                    </label>
                                    <input
                                        type="text"
                                        {...registerReset("otp")}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none"
                                        placeholder="e.g., 123456"
                                        maxLength="6"
                                    />
                                    {resetErrors.otp && (
                                        <p className="text-red-500 text-xs mt-1.5">
                                            {resetErrors.otp.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        {...registerReset("newPassword")}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none"
                                        placeholder="••••••••"
                                    />
                                    {resetErrors.newPassword && (
                                        <p className="text-red-500 text-xs mt-1.5">
                                            {resetErrors.newPassword.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        {...registerReset("confirmPassword")}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none"
                                        placeholder="••••••••"
                                    />
                                    {resetErrors.confirmPassword && (
                                        <p className="text-red-500 text-xs mt-1.5">
                                            {resetErrors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={resetSubmitting}
                                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 disabled:opacity-70"
                                >
                                    {resetSubmitting ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

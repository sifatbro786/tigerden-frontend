// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("user", JSON.stringify(result.data.user));
                setUser(result.data.user);
                toast.success("Welcome back!");
                return { success: true };
            } else {
                toast.error(result.message || "Login failed");
                return { success: false, message: result.message };
            }
        } catch (error) {
            toast.error("Network error occurred");
            return { success: false, message: "Network error" };
        }
    };

    const register = async (name, email, password, phone = "") => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, phone }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("user", JSON.stringify(result.data.user));
                setUser(result.data.user);
                toast.success("Welcome to Tigersden Tourism!");
                return { success: true };
            } else {
                toast.error(result.message || "Registration failed");
                return { success: false, message: result.message };
            }
        } catch (error) {
            toast.error("Network error occurred");
            return { success: false, message: "Network error" };
        }
    };

    const googleLogin = async (credential) => {
        try {
            const response = await fetch(`${API_URL}/auth/google-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ credential }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("user", JSON.stringify(result.data.user));
                setUser(result.data.user);
                toast.success("Welcome back!");
                return { success: true };
            } else {
                toast.error(result.message || "Google login failed");
                return { success: false, message: result.message };
            }
        } catch (error) {
            toast.error("Network error occurred");
            return { success: false, message: "Network error" };
        }
    };

    const forgotPassword = async (email) => {
        try {
            const response = await fetch(`${API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("If that email is registered, a reset code has been sent.");
                return { success: true };
            } else {
                toast.error(data.message || "Failed to send reset code");
                return { success: false, message: data.message };
            }
        } catch (error) {
            toast.error("Network error occurred");
            return { success: false, message: "Network error" };
        }
    };

    const resetPassword = async (email, otp, newPassword) => {
        try {
            const response = await fetch(`${API_URL}/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Password reset successful! You can now log in.");
                return { success: true };
            } else {
                toast.error(data.message || "Failed to reset password");
                return { success: false, message: data.message };
            }
        } catch (error) {
            toast.error("Network error occurred");
            return { success: false, message: "Network error" };
        }
    };

    const changePassword = async (oldPassword, newPassword) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/admin/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Password changed successfully!");
                return { success: true };
            } else {
                toast.error(data.message || "Failed to change password");
                return { success: false, message: data.message };
            }
        } catch (error) {
            toast.error("Network error occurred");
            return { success: false, message: "Network error" };
        }
    };

    const changeUserRole = async (userId, role) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/admin/users/${userId}/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "User role updated!");
                return { success: true, data: data.data };
            } else {
                toast.error(data.message || "Failed to update user role");
                return { success: false, message: data.message };
            }
        } catch (error) {
            toast.error("Network error occurred");
            return { success: false, message: "Network error" };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        toast.success("See you soon!");
    };

    const value = {
        user,
        login,
        register,
        googleLogin,
        forgotPassword,
        resetPassword,
        changePassword,
        changeUserRole,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

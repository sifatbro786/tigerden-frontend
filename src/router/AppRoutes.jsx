// src/router/AppRoutes.jsx
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import FrontendLayout from "../layouts/FrontendLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegistrationPage from "../pages/auth/RegistrationPage";
import HomePage from "../pages/client/HomePage";
import About from "../pages/client/About";
import Contact from "../pages/client/Contact";
import DashboardHome from "../pages/dashboard/DashboardHome";
import PackagesManagement from "../pages/dashboard/PackagesManagement";
import BlogsManagement from "../pages/dashboard/BlogsManagement";
import TeamManagement from "../pages/dashboard/TeamManagement";
import TestimonialsManagement from "../pages/dashboard/TestimonialsManagement";
import CouponsManagement from "../pages/dashboard/CouponsManagement";
import NotFound from "../pages/client/NotFound";
import VisaProcessing from "../pages/client/VisaProcessing";
import PackageDetails from "../pages/client/PackageDetails";
import UserManagement from "../pages/dashboard/UserManagement";
import PageMetaManagement from "../pages/dashboard/PageMetaManagement";
import BookingManagement from "../pages/dashboard/BookingManagement";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Frontend Routes with Layout */}
            <Route path="/" element={<FrontendLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/visa-processing" element={<VisaProcessing />} />
                <Route path="/package/:category/:id" element={<PackageDetails />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />

            {/* Dashboard Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DashboardHome />} />
                <Route path="packages" element={<PackagesManagement />} />
                <Route path="bookings" element={<BookingManagement />} />
                <Route path="blogs" element={<BlogsManagement />} />
                <Route path="team" element={<TeamManagement />} />
                <Route path="testimonials" element={<TestimonialsManagement />} />
                <Route path="coupons" element={<CouponsManagement />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="page-meta" element={<PageMetaManagement />} />
            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

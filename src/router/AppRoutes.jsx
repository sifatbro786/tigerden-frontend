import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import FrontendLayout from "../layouts/FrontendLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegistrationPage from "../pages/auth/RegistrationPage";
import HomePage from "../pages/client/HomePage";
import About from "../pages/client/About";
import Contact from "../pages/client/Contact";
import DashboardHome from "../pages/dashboard/DashboardHome";
import NotFound from "../pages/client/NotFound";
import VisaProcessing from "../pages/client/VisaProcessing";
import AirTicketBooking from "../pages/client/AirTicketBooking";
import PackageDetails from "../pages/client/PackageDetails";

export default function AppRoutes() {
    const { user } = useAuth();

    return (
        <Routes>
            {/* //* Frontend Routes */}
            <Route path="/" element={<FrontendLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/visa-processing" element={<VisaProcessing />} />
                <Route path="/air-ticket" element={<AirTicketBooking />} />
                <Route path="/package/:category/:id" element={<PackageDetails />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* //* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />

            {/* //* Dashboard Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DashboardHome />} />
            </Route>

            {/* //* Default Route */}
            <Route
                path="/"
                element={
                    user && user.role === "admin" ? (
                        <Navigate to="/dashboard" replace />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
        </Routes>
    );
}

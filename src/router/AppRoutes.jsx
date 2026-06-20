import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// guard imports
import ProtectedRoute from "./ProtectedRoute";

// layout imports
import FrontendLayout from "../layouts/FrontendLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// auth pages imports
import LoginPage from "../pages/auth/LoginPage";
import RegistrationPage from "../pages/auth/RegistrationPage";

// client pages imports
import HomePage from "../pages/client/HomePage";
import About from "../pages/client/About";
import Blog from "../pages/client/Blog";
import Contact from "../pages/client/Contact";

// dashboard pages Imports
import DashboardHome from "../pages/dashboard/DashboardHome";
import ProjectsPage from "../pages/dashboard/ProjectsPage";
import NotFound from "../pages/client/NotFound";
import VisaProcessing from "../pages/client/VisaProcessing";
import AirTicketBooking from "../pages/client/AirTicketBooking";
import Proposal from "../components/category/Proposal";
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
                <Route path="/blog" element={<Blog />} />

                <Route path="/visa-processing" element={<VisaProcessing />} />
                <Route path="/air-ticket" element={<AirTicketBooking />} />
                <Route path="/proposal" element={<Proposal />} />
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
                <Route path="projects" element={<ProjectsPage />} />
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

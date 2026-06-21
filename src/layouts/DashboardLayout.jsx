// src/layouts/DashboardLayout.jsx
import { useState } from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import {
    HomeIcon,
    PackageIcon,
    FileTextIcon,
    UsersIcon,
    MessageSquareIcon,
    TicketIcon,
    MenuIcon,
    LogOutIcon,
    UserIcon,
    ChevronDownIcon,
    ShieldIcon,
    CrownIcon,
    KeyRoundIcon,
    Tags,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import ChangePasswordModal from "../components/dashboard/ChangePasswordModal";
import Logo from "/logo.png";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isSuperAdmin = user?.role === "super_admin";

    const navigationItems = [
        { path: "/dashboard", icon: HomeIcon, label: "Dashboard" },
        { path: "/dashboard/packages", icon: PackageIcon, label: "Packages" },
        { path: "/dashboard/blogs", icon: FileTextIcon, label: "Blogs" },
        { path: "/dashboard/team", icon: UsersIcon, label: "Team" },
        { path: "/dashboard/testimonials", icon: MessageSquareIcon, label: "Testimonials" },
        { path: "/dashboard/coupons", icon: TicketIcon, label: "Coupons" },
        { path: "/dashboard/page-meta", icon: Tags, label: "Page Meta" },
    ];

    // Add User Management for admin/super_admin
    if (isSuperAdmin) {
        navigationItems.push({
            path: "/dashboard/users",
            icon: isSuperAdmin ? CrownIcon : ShieldIcon,
            label: "Users",
        });
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <MenuIcon className="w-6 h-6 text-gray-700" />
                        </button>
                        <h1 className="text-xl font-bold text-emerald-600">Tigerden Tourism</h1>
                        <div className="w-10"></div>
                    </div>
                </div>

                {/* Mobile Sidebar Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`
                        fixed top-0 left-0 z-40 h-full bg-white border-r border-gray-200
                        transition-all duration-300 ease-in-out
                        ${isSidebarOpen ? "w-64" : "w-20"}
                        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
                        lg:translate-x-0
                    `}
                >
                    {/* Logo Section */}
                    <div
                        className={`
                            flex items-center h-16 px-4 border-b border-gray-200
                            ${!isSidebarOpen && "justify-center"}
                        `}
                    >
                        {isSidebarOpen ? (
                            <Link to="/" className="flex items-center space-x-1">
                                <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                                    <img src={Logo} alt="Tigerden" />
                                </div>
                                <span className="text-xl font-bold text-emerald-600">Tigerden</span>
                            </Link>
                        ) : (
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                <span className="text-white font-bold text-lg">🐯</span>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
                        {navigationItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/dashboard"}
                                className={({ isActive }) => `
            flex items-center px-3 py-3 rounded-lg transition-all duration-200
            ${
                isActive
                    ? "bg-emerald-50 text-emerald-700 font-medium shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
            }
            ${!isSidebarOpen && "justify-center"}
        `}
                                title={!isSidebarOpen ? item.label : ""}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <item.icon
                                    className={`w-5 h-5 ${!isSidebarOpen ? "mx-auto" : "mr-3"}`}
                                />
                                {isSidebarOpen && <span>{item.label}</span>}
                                {isSidebarOpen &&
                                    isSuperAdmin &&
                                    item.path === "/dashboard/users" && (
                                        <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                                            Super
                                        </span>
                                    )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Profile & Actions */}
                    <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4 bg-white">
                        <div className="flex items-center justify-between">
                            <div
                                className={`
                                    flex items-center cursor-pointer
                                    ${!isSidebarOpen && "justify-center w-full"}
                                `}
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                                        <UserIcon className="w-4 h-4 text-emerald-600" />
                                    </div>
                                </div>
                                {isSidebarOpen && (
                                    <div className="ml-3 flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {user?.name || "Admin"}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user?.email || "admin@tigerden.com"}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {isSidebarOpen && (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => {
                                            setIsProfileDropdownOpen(!isProfileDropdownOpen);
                                        }}
                                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        {isProfileDropdownOpen && isSidebarOpen && (
                            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-xs text-gray-500">Signed in as</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {user?.email}
                                    </p>
                                    {isSuperAdmin && (
                                        <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded mt-1">
                                            <CrownIcon className="w-3 h-3" />
                                            Super Admin
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        setShowChangePassword(true);
                                        setIsProfileDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <KeyRoundIcon className="w-4 h-4" />
                                    Change Password
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                >
                                    <LogOutIcon className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Content */}
                <main
                    className={`
                        transition-all duration-300 ease-in-out
                        ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"}
                        pt-16 lg:pt-0
                    `}
                >
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <MenuIcon className="w-5 h-5 text-gray-700" />
                                </button>
                                <h1 className="text-xl font-semibold text-gray-800">
                                    Admin Dashboard
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    {isSuperAdmin && (
                                        <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                            <CrownIcon className="w-3 h-3" />
                                            Super Admin
                                        </span>
                                    )}
                                    <span className="hidden sm:inline">{user?.name}</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Change Password Modal */}
            <ChangePasswordModal
                isOpen={showChangePassword}
                onClose={() => setShowChangePassword(false)}
            />
        </>
    );
};

export default DashboardLayout;

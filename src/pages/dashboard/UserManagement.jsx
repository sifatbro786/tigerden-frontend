// src/pages/dashboard/UserManagement.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    SearchIcon,
    UserIcon,
    ShieldIcon,
    CrownIcon,
    MailIcon,
    PhoneIcon,
    CalendarIcon,
    StarIcon,
    RefreshCwIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const { user: currentUser, changeUserRole } = useAuth();
    const queryClient = useQueryClient();

    // Fetch all users (admin only)
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            // Note: You'll need to add a GET /api/admin/users endpoint
            const { data } = await api.get("/admin/users");
            return data;
        },
        enabled: currentUser?.role === "super_admin" || currentUser?.role === "admin",
    });

    // Update role mutation
    const roleMutation = useMutation({
        mutationFn: ({ userId, role }) => changeUserRole(userId, role),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            setShowRoleModal(false);
            setSelectedUser(null);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update role");
        },
    });

    const users = data?.data || [];
    const filteredUsers = users.filter(
        (user) =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const getRoleBadge = (role) => {
        const badges = {
            super_admin: {
                color: "bg-purple-100 text-purple-700",
                icon: CrownIcon,
                label: "Super Admin",
            },
            admin: { color: "bg-blue-100 text-blue-700", icon: ShieldIcon, label: "Admin" },
            user: { color: "bg-gray-100 text-gray-700", icon: UserIcon, label: "User" },
        };
        const badge = badges[role] || badges.user;
        return badge;
    };

    const getLoyaltyBadge = (tier) => {
        const tiers = {
            premium: { color: "bg-amber-100 text-amber-700", label: "Premium" },
            regular: { color: "bg-emerald-100 text-emerald-700", label: "Regular" },
            new: { color: "bg-gray-100 text-gray-700", label: "New" },
        };
        return tiers[tier] || tiers.new;
    };

    const canManageRole = (targetUser) => {
        if (currentUser?.role === "super_admin") return true;
        if (currentUser?.role === "admin" && targetUser.role !== "super_admin") return true;
        return false;
    };

    const canChangeToSuperAdmin = () => {
        return currentUser?.role === "super_admin";
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">Error loading users: {error.message}</p>
                <button onClick={() => refetch()} className="mt-4 btn-primary">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage users, roles, and permissions
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => refetch()}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Refresh"
                    >
                        <RefreshCwIcon className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-500">{users.length} users</span>
                </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Loyalty
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bookings
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Spent
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.map((user) => {
                                const roleBadge = getRoleBadge(user.role);
                                const loyaltyBadge = getLoyaltyBadge(user.loyaltyTier);
                                const RoleIcon = roleBadge.icon;
                                const isCurrentUser = user._id === currentUser?._id;

                                return (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-emerald-700 font-semibold">
                                                        {user.name?.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 flex items-center gap-2">
                                                        {user.name}
                                                        {isCurrentUser && (
                                                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                                                                You
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <MailIcon className="w-3 h-3" />
                                                        {user.email}
                                                        {user.phone && (
                                                            <>
                                                                <span className="w-px h-3 bg-gray-300"></span>
                                                                <PhoneIcon className="w-3 h-3" />
                                                                {user.phone}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${roleBadge.color}`}
                                            >
                                                <RoleIcon className="w-3.5 h-3.5" />
                                                {roleBadge.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${loyaltyBadge.color}`}
                                            >
                                                <StarIcon className="w-3.5 h-3.5" />
                                                {loyaltyBadge.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {user.totalBookings || 0}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            ${(user.totalSpent || 0).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1.5">
                                                <CalendarIcon className="w-3.5 h-3.5" />
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {canManageRole(user) && !isCurrentUser && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setShowRoleModal(true);
                                                    }}
                                                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                                                >
                                                    Change Role
                                                </button>
                                            )}
                                            {isCurrentUser && (
                                                <span className="text-sm text-gray-400">
                                                    Current user
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No users found</p>
                    </div>
                )}
            </div>

            {/* Change Role Modal */}
            {showRoleModal && selectedUser && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                            onClick={() => {
                                setShowRoleModal(false);
                                setSelectedUser(null);
                            }}
                        />
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Change User Role
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Update role for <strong>{selectedUser.name}</strong> (
                                    {selectedUser.email})
                                </p>
                                <div className="space-y-3">
                                    {["user", "admin", "super_admin"].map((role) => {
                                        const isDisabled =
                                            role === "super_admin" && !canChangeToSuperAdmin();
                                        const badge = getRoleBadge(role);
                                        const Icon = badge.icon;

                                        return (
                                            <button
                                                key={role}
                                                onClick={() => {
                                                    if (!isDisabled) {
                                                        roleMutation.mutate({
                                                            userId: selectedUser._id,
                                                            role,
                                                        });
                                                    }
                                                }}
                                                disabled={isDisabled || role === selectedUser.role}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                                                    selectedUser.role === role
                                                        ? "border-emerald-500 bg-emerald-50"
                                                        : isDisabled
                                                          ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
                                                          : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`p-2 rounded-lg ${badge.color}`}
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-medium text-gray-900">
                                                            {badge.label}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {role === "super_admin" &&
                                                                "Full access, can manage all users"}
                                                            {role === "admin" &&
                                                                "Can manage content and users"}
                                                            {role === "user" &&
                                                                "Regular user access"}
                                                        </p>
                                                    </div>
                                                </div>
                                                {selectedUser.role === role && (
                                                    <span className="text-emerald-600 text-sm font-medium">
                                                        Current
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => {
                                        setShowRoleModal(false);
                                        setSelectedUser(null);
                                    }}
                                    className="mt-4 w-full px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;

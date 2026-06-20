"use client";
import React from "react";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Users, Mail, Phone, MapPin, Calendar, Shield, User } from "lucide-react";

const fetchUsers = async (page = 1, role = "", search = "") => {
    const response = await axios.get(`/api/auth/users?page=${page}&role=${role}&search=${search}`);
    return response.data;
};

export default function UsersPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [roleFilter, setRoleFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading } = useQuery(
        ["users", currentPage, roleFilter, searchTerm],
        () => fetchUsers(currentPage, roleFilter, searchTerm),
        { keepPreviousData: true },
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Users
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage platform users and investors
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card">
                    <div className="card-content">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500">Total Users</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {data?.total || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <User className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500">Investors</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {data?.users?.filter((u) => u.role === "investor").length || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Shield className="h-8 w-8 text-purple-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500">Admins</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {data?.users?.filter((u) => u.role === "admin").length || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        className="input"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="investor">Investor</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="card">
                <div className="card-content">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th className="table-head">User</th>
                                    <th className="table-head">Contact</th>
                                    <th className="table-head">Role</th>
                                    <th className="table-head">Investment</th>
                                    <th className="table-head">Status</th>
                                    <th className="table-head">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.users?.map((user) => (
                                    <tr key={user._id} className="table-row">
                                        <td className="table-cell">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {user.profileImage ? (
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src={
                                                                user.profileImage ||
                                                                "/placeholder.svg"
                                                            }
                                                            alt={user.name}
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                            <User className="h-5 w-5 text-gray-600" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Mail className="h-4 w-4 mr-1" />
                                                    {user.email}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Phone className="h-4 w-4 mr-1" />
                                                    {user.phone}
                                                </div>
                                                {user.address?.city && (
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <MapPin className="h-4 w-4 mr-1" />
                                                        {user.address.city}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="table-cell">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    user.role === "admin"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : "bg-blue-100 text-blue-800"
                                                }`}
                                            >
                                                {user.role === "admin" ? (
                                                    <Shield className="h-3 w-3 mr-1" />
                                                ) : (
                                                    <User className="h-3 w-3 mr-1" />
                                                )}
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="table-cell">
                                            {user.role === "investor" ? (
                                                <div className="space-y-1">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        ৳
                                                        {user.totalInvestment?.toLocaleString() ||
                                                            0}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Profit: ৳
                                                        {user.totalProfit?.toLocaleString() || 0}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-500">N/A</span>
                                            )}
                                        </td>
                                        <td className="table-cell">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    user.isVerified
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {user.isVerified ? "Verified" : "Pending"}
                                            </span>
                                        </td>
                                        <td className="table-cell">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from "react";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { TrendingUp, User, DollarSign, CheckCircle, XCircle, Clock } from "lucide-react";

const fetchInvestments = async (page = 1, status = "", project = "") => {
    const response = await axios.get(
        `/api/investments?page=${page}&status=${status}&project=${project}`,
    );
    return response.data;
};

const fetchProjects = async () => {
    const response = await axios.get("/api/projects");
    return response.data.projects;
};

const confirmPayment = async ({ id, transactionId, paymentMethod }) => {
    await axios.patch(`/api/investments/${id}/confirm-payment`, { transactionId, paymentMethod });
};

export default function InvestmentsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const [projectFilter, setProjectFilter] = useState("");

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery(
        ["investments", currentPage, statusFilter, projectFilter],
        () => fetchInvestments(currentPage, statusFilter, projectFilter),
        { keepPreviousData: true },
    );

    const { data: projects } = useQuery("projects", fetchProjects);

    const confirmPaymentMutation = useMutation(confirmPayment, {
        onSuccess: () => {
            queryClient.invalidateQueries("investments");
            toast.success("Payment confirmed successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to confirm payment");
        },
    });

    const handleConfirmPayment = (investment) => {
        const transactionId = prompt("Enter transaction ID:");
        const paymentMethod = prompt("Enter payment method (sslcommerz/stripe/manual):");

        if (transactionId && paymentMethod) {
            confirmPaymentMutation.mutate({
                id: investment._id,
                transactionId,
                paymentMethod,
            });
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            active: "bg-green-100 text-green-800",
            completed: "bg-blue-100 text-blue-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const getStatusIcon = (status) => {
        const icons = {
            pending: Clock,
            active: CheckCircle,
            completed: CheckCircle,
            cancelled: XCircle,
        };
        return icons[status] || Clock;
    };

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
                        Investments
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage investor investments and payments
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card">
                    <div className="card-content">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <TrendingUp className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500">
                                    Total Investments
                                </p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    ৳{data?.stats?.totalInvestments?.toLocaleString() || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <User className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500">Total Shares</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {data?.stats?.totalShares || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <DollarSign className="h-8 w-8 text-yellow-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500">Avg Investment</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    ৳{data?.stats?.avgInvestment?.toLocaleString() || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-8 w-8 text-purple-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500">Active Count</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {data?.total || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <select
                        className="input"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div>
                    <select
                        className="input"
                        value={projectFilter}
                        onChange={(e) => setProjectFilter(e.target.value)}
                    >
                        <option value="">All Projects</option>
                        {projects?.map((project) => (
                            <option key={project._id} value={project._id}>
                                {project.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Investments Table */}
            <div className="card">
                <div className="card-content">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th className="table-head">Investor</th>
                                    <th className="table-head">Project</th>
                                    <th className="table-head">Shares</th>
                                    <th className="table-head">Amount</th>
                                    <th className="table-head">Status</th>
                                    <th className="table-head">Date</th>
                                    <th className="table-head">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.investments?.map((investment) => {
                                    const StatusIcon = getStatusIcon(investment.status);
                                    return (
                                        <tr key={investment._id} className="table-row">
                                            <td className="table-cell">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                            <User className="h-5 w-5 text-gray-600" />
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {investment.investor?.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {investment.investor?.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="table-cell">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {investment.project?.title}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {investment.project?.status}
                                                </div>
                                            </td>
                                            <td className="table-cell">
                                                <div className="text-sm text-gray-900">
                                                    {investment.sharesCount} shares
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    ৳{investment.pricePerShare}/share
                                                </div>
                                            </td>
                                            <td className="table-cell">
                                                <div className="text-sm font-medium text-gray-900">
                                                    ৳{investment.totalAmount.toLocaleString()}
                                                </div>
                                                {investment.profitReceived > 0 && (
                                                    <div className="text-sm text-green-600">
                                                        +৳
                                                        {investment.profitReceived.toLocaleString()}{" "}
                                                        profit
                                                    </div>
                                                )}
                                            </td>
                                            <td className="table-cell">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}
                                                >
                                                    <StatusIcon className="h-3 w-3 mr-1" />
                                                    {investment.status}
                                                </span>
                                            </td>
                                            <td className="table-cell">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(
                                                        investment.createdAt,
                                                    ).toLocaleDateString()}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {new Date(
                                                        investment.createdAt,
                                                    ).toLocaleTimeString()}
                                                </div>
                                            </td>
                                            <td className="table-cell">
                                                {investment.status === "pending" && (
                                                    <button
                                                        onClick={() =>
                                                            handleConfirmPayment(investment)
                                                        }
                                                        className="btn-primary text-sm py-1 px-3"
                                                        disabled={confirmPaymentMutation.isLoading}
                                                    >
                                                        Confirm Payment
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

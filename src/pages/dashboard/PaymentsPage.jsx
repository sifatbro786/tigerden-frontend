import React from "react";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CreditCard, DollarSign, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react";

const fetchPayments = async (page = 1, status = "", paymentMethod = "") => {
    const response = await axios.get(
        `/api/payments/admin/all?page=${page}&status=${status}&paymentMethod=${paymentMethod}`,
    );
    return response.data;
};

export default function PaymentsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const [methodFilter, setMethodFilter] = useState("");

    const { data, isLoading } = useQuery(
        ["payments", currentPage, statusFilter, methodFilter],
        () => fetchPayments(currentPage, statusFilter, methodFilter),
        { keepPreviousData: true },
    );

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            processing: "bg-blue-100 text-blue-800",
            completed: "bg-green-100 text-green-800",
            failed: "bg-red-100 text-red-800",
            cancelled: "bg-gray-100 text-gray-800",
            refunded: "bg-purple-100 text-purple-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const getStatusIcon = (status) => {
        const icons = {
            pending: Clock,
            processing: Clock,
            completed: CheckCircle,
            failed: XCircle,
            cancelled: XCircle,
            refunded: AlertCircle,
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
                        Payments
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Monitor and manage payment transactions
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card">
                    <div className="card-content">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <DollarSign className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    ৳{data?.stats?.totalAmount?.toLocaleString() || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500">Completed</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    ৳{data?.stats?.completedAmount?.toLocaleString() || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Clock className="h-8 w-8 text-yellow-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500">Pending</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    ৳{data?.stats?.pendingAmount?.toLocaleString() || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <XCircle className="h-8 w-8 text-red-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500">Failed</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {data?.stats?.failedCount || 0}
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
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>
                <div>
                    <select
                        className="input"
                        value={methodFilter}
                        onChange={(e) => setMethodFilter(e.target.value)}
                    >
                        <option value="">All Methods</option>
                        <option value="sslcommerz">SSLCommerz</option>
                        <option value="stripe">Stripe</option>
                        <option value="manual">Manual</option>
                    </select>
                </div>
            </div>

            {/* Payments Table */}
            <div className="card">
                <div className="card-content">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th className="table-head">Transaction ID</th>
                                    <th className="table-head">Investor</th>
                                    <th className="table-head">Project</th>
                                    <th className="table-head">Amount</th>
                                    <th className="table-head">Method</th>
                                    <th className="table-head">Status</th>
                                    <th className="table-head">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.payments?.map((payment) => {
                                    const StatusIcon = getStatusIcon(payment.status);
                                    return (
                                        <tr key={payment._id} className="table-row">
                                            <td className="table-cell">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {payment.transactionId}
                                                </div>
                                                {payment.gatewayTransactionId && (
                                                    <div className="text-sm text-gray-500">
                                                        {payment.gatewayTransactionId}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="table-cell">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {payment.investor?.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {payment.investor?.email}
                                                </div>
                                            </td>
                                            <td className="table-cell">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {payment.investment?.project?.title}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {payment.investment?.sharesCount} shares
                                                </div>
                                            </td>
                                            <td className="table-cell">
                                                <div className="text-sm font-medium text-gray-900">
                                                    ৳{payment.amount.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {payment.currency}
                                                </div>
                                            </td>
                                            <td className="table-cell">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    <CreditCard className="h-3 w-3 mr-1" />
                                                    {payment.paymentMethod}
                                                </span>
                                            </td>
                                            <td className="table-cell">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}
                                                >
                                                    <StatusIcon className="h-3 w-3 mr-1" />
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="table-cell">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(
                                                        payment.createdAt,
                                                    ).toLocaleDateString()}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {new Date(
                                                        payment.createdAt,
                                                    ).toLocaleTimeString()}
                                                </div>
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

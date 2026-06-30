// src/pages/dashboard/ContactManagement.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    SearchIcon,
    RefreshCwIcon,
    EyeIcon,
    MailIcon,
    PhoneIcon,
    UserIcon,
    CalendarIcon,
    TagIcon,
    MessageSquareIcon,
    CheckCircleIcon,
    ClockIcon,
    FilterIcon,
    XCircleIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

const ContactManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const queryClient = useQueryClient();

    // Fetch all inquiries
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["admin-contacts"],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (statusFilter !== "all") params.append("status", statusFilter);
            if (serviceFilter !== "all") params.append("serviceType", serviceFilter);
            
            const url = `/admin/contact${params.toString() ? `?${params.toString()}` : ""}`;
            const { data } = await api.get(url);
            return data;
        },
    });

    // Update status mutation
    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }) =>
            api.patch(`/admin/contact/${id}/status`, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-contacts"]);
            toast.success("Status updated successfully!");
            setShowDetailModal(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update status");
        },
    });

    const inquiries = data?.data || [];

    // Filter by search term
    const filteredInquiries = inquiries.filter((inquiry) => {
        const matchesSearch =
            inquiry.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.phone?.includes(searchTerm) ||
            inquiry.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    // Stats
    const totalInquiries = inquiries.length;
    const unreadInquiries = inquiries.filter((i) => i.status === "unread").length;
    const readInquiries = inquiries.filter((i) => i.status === "read").length;

    const getStatusBadge = (status) => {
        const badges = {
            unread: {
                color: "bg-yellow-100 text-yellow-700",
                icon: ClockIcon,
                label: "Unread",
            },
            read: {
                color: "bg-emerald-100 text-emerald-700",
                icon: CheckCircleIcon,
                label: "Read",
            },
        };
        return badges[status] || badges.unread;
    };

    const getServiceTypeBadge = (serviceType) => {
        const colors = {
            "Visa Processing": "bg-blue-100 text-blue-700",
            "Medical Tourism": "bg-purple-100 text-purple-700",
            "Package Tour": "bg-emerald-100 text-emerald-700",
            "Other Inquiry": "bg-gray-100 text-gray-700",
        };
        return colors[serviceType] || "bg-gray-100 text-gray-700";
    };

    const handleMarkAsRead = (id) => {
        updateStatusMutation.mutate({ id, status: "read" });
    };

    const handleMarkAsUnread = (id) => {
        updateStatusMutation.mutate({ id, status: "unread" });
    };

    const handleViewDetails = (inquiry) => {
        setSelectedInquiry(inquiry);
        setShowDetailModal(true);
        // Auto-mark as read when viewed
        if (inquiry.status === "unread") {
            updateStatusMutation.mutate({ id: inquiry._id, status: "read" });
        }
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
                <p className="text-red-600">Error loading inquiries: {error.message}</p>
                <button
                    onClick={() => refetch()}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
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
                    <h2 className="text-2xl font-bold text-gray-900">Contact Inquiries</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage all customer inquiries and messages
                    </p>
                </div>
                <button
                    onClick={() => refetch()}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Refresh"
                >
                    <RefreshCwIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">Total Inquiries</span>
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <MailIcon className="w-4 h-4 text-gray-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{totalInquiries}</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-yellow-600">Unread</span>
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <ClockIcon className="w-4 h-4 text-yellow-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">{unreadInquiries}</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-emerald-600">Read</span>
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-emerald-600">{readInquiries}</div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or message..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FilterIcon className="w-5 h-5 text-gray-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                    >
                        <option value="all">All Status</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                    </select>
                    <select
                        value={serviceFilter}
                        onChange={(e) => setServiceFilter(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                    >
                        <option value="all">All Services</option>
                        <option value="Visa Processing">Visa Processing</option>
                        <option value="Medical Tourism">Medical Tourism</option>
                        <option value="Package Tour">Package Tour</option>
                        <option value="Other Inquiry">Other Inquiry</option>
                    </select>
                </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User Info
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Service Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Message Preview
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Submitted
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredInquiries.map((inquiry) => {
                                const statusBadge = getStatusBadge(inquiry.status);
                                const StatusIcon = statusBadge.icon;

                                return (
                                    <tr
                                        key={inquiry._id}
                                        className={`hover:bg-gray-50 transition-colors ${
                                            inquiry.status === "unread" ? "bg-yellow-50/30" : ""
                                        }`}
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900 flex items-center gap-2">
                                                    <UserIcon className="w-3 h-3 text-gray-400" />
                                                    {inquiry.fullName}
                                                    {inquiry.status === "unread" && (
                                                        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <MailIcon className="w-3 h-3" />
                                                    {inquiry.email}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <PhoneIcon className="w-3 h-3" />
                                                    {inquiry.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${getServiceTypeBadge(
                                                    inquiry.serviceType
                                                )}`}
                                            >
                                                {inquiry.serviceType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                                                {inquiry.message || "No message provided"}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}
                                            >
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                {statusBadge.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <CalendarIcon className="w-3 h-3" />
                                                {new Date(inquiry.createdAt).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {new Date(inquiry.createdAt).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(inquiry)}
                                                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                                    title="View Details"
                                                >
                                                    <EyeIcon className="w-4 h-4" />
                                                </button>
                                                {inquiry.status === "unread" ? (
                                                    <button
                                                        onClick={() => handleMarkAsRead(inquiry._id)}
                                                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                                        title="Mark as Read"
                                                    >
                                                        <CheckCircleIcon className="w-4 h-4" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleMarkAsUnread(inquiry._id)}
                                                        className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                                                        title="Mark as Unread"
                                                    >
                                                        <ClockIcon className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {filteredInquiries.length === 0 && (
                    <div className="text-center py-12">
                        <MailIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No inquiries found</p>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedInquiry && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                            onClick={() => setShowDetailModal(false)}
                        />
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Inquiry Details
                                    </h3>
                                    <span
                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                            getStatusBadge(selectedInquiry.status).color
                                        }`}
                                    >
                                        {selectedInquiry.status === "unread" ? (
                                            <>
                                                <ClockIcon className="w-3 h-3" />
                                                Unread
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircleIcon className="w-3 h-3" />
                                                Read
                                            </>
                                        )}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <XCircleIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* User Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="font-medium text-gray-900 flex items-center gap-2">
                                            <UserIcon className="w-4 h-4 text-gray-400" />
                                            {selectedInquiry.fullName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Service Type</p>
                                        <p className="font-medium text-gray-900">
                                            <span
                                                className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${getServiceTypeBadge(
                                                    selectedInquiry.serviceType
                                                )}`}
                                            >
                                                {selectedInquiry.serviceType}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium text-gray-900 flex items-center gap-2">
                                            <MailIcon className="w-4 h-4 text-gray-400" />
                                            {selectedInquiry.email}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium text-gray-900 flex items-center gap-2">
                                            <PhoneIcon className="w-4 h-4 text-gray-400" />
                                            {selectedInquiry.phone}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">Submitted</p>
                                        <p className="font-medium text-gray-900">
                                            {new Date(selectedInquiry.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="border-t border-gray-200 pt-4">
                                    <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                                        <MessageSquareIcon className="w-4 h-4" />
                                        Message
                                    </p>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700 whitespace-pre-wrap">
                                            {selectedInquiry.message || "No message provided"}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                    {selectedInquiry.status === "unread" ? (
                                        <button
                                            onClick={() => {
                                                handleMarkAsRead(selectedInquiry._id);
                                            }}
                                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                                        >
                                            <CheckCircleIcon className="w-4 h-4" />
                                            Mark as Read
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                handleMarkAsUnread(selectedInquiry._id);
                                            }}
                                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2"
                                        >
                                            <ClockIcon className="w-4 h-4" />
                                            Mark as Unread
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setShowDetailModal(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactManagement;
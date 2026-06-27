// src/pages/dashboard/BookingManagement.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    SearchIcon,
    RefreshCwIcon,
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    UserIcon,
    PackageIcon,
    DollarSignIcon,
    CreditCardIcon,
    HashIcon,
    PhoneIcon,
    CalendarIcon,
    FilterIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

const BookingManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const queryClient = useQueryClient();

    // Fetch all bookings
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["admin-bookings"],
        queryFn: async () => {
            const { data } = await api.get("/admin/bookings");
            return data;
        },
    });

    // Verify payment mutation
    const verifyMutation = useMutation({
        mutationFn: ({ id, adminNote }) =>
            api.patch(`/admin/bookings/${id}/verify`, { adminNote }),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-bookings"]);
            toast.success("Payment verified and booking confirmed!");
            setShowDetailModal(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to verify payment");
        },
    });

    // Reject booking mutation
    const rejectMutation = useMutation({
        mutationFn: ({ id, adminNote }) =>
            api.patch(`/admin/bookings/${id}/reject`, { adminNote }),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-bookings"]);
            toast.success("Booking rejected!");
            setShowDetailModal(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to reject booking");
        },
    });

    const bookings = data?.data || [];

    // Filter bookings
    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch =
            booking.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.package?.title?.en?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || booking.bookingStatus === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Stats
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter((b) => b.bookingStatus === "pending").length;
    const confirmedBookings = bookings.filter((b) => b.bookingStatus === "confirmed").length;
    const cancelledBookings = bookings.filter((b) => b.bookingStatus === "cancelled").length;

    const getStatusBadge = (status) => {
        const badges = {
            pending: { color: "bg-yellow-100 text-yellow-700", icon: ClockIcon, label: "Pending" },
            confirmed: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircleIcon, label: "Confirmed" },
            cancelled: { color: "bg-red-100 text-red-700", icon: XCircleIcon, label: "Cancelled" },
        };
        return badges[status] || badges.pending;
    };

    const getPaymentStatusBadge = (status) => {
        const badges = {
            unverified: { color: "bg-yellow-100 text-yellow-700", label: "Unverified" },
            paid: { color: "bg-emerald-100 text-emerald-700", label: "Paid" },
            failed: { color: "bg-red-100 text-red-700", label: "Failed" },
        };
        return badges[status] || badges.unverified;
    };

    const getPaymentMethodLabel = (method) => {
        const methods = {
            bkash: "bKash",
            nagad: "Nagad",
            rocket: "Rocket",
        };
        return methods[method] || method;
    };

    const handleVerify = (bookingId, adminNote = "") => {
        if (window.confirm("Confirm this booking and mark payment as verified?")) {
            verifyMutation.mutate({ id: bookingId, adminNote });
        }
    };

    const handleReject = (bookingId, adminNote = "") => {
        const note = prompt("Reason for rejection (optional):");
        if (note !== null) {
            rejectMutation.mutate({ id: bookingId, adminNote: note || "Rejected by admin" });
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
                <p className="text-red-600">Error loading bookings: {error.message}</p>
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
                    <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage all booking requests and payments
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
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">Total</span>
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <PackageIcon className="w-4 h-4 text-gray-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{totalBookings}</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-yellow-600">Pending</span>
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <ClockIcon className="w-4 h-4 text-yellow-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">{pendingBookings}</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-emerald-600">Confirmed</span>
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-emerald-600">{confirmedBookings}</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-red-600">Cancelled</span>
                        <div className="p-2 bg-red-50 rounded-lg">
                            <XCircleIcon className="w-4 h-4 text-red-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{cancelledBookings}</div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by transaction ID, user, or package..."
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
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Booking Info
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Package
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredBookings.map((booking) => {
                                const statusBadge = getStatusBadge(booking.bookingStatus);
                                const paymentBadge = getPaymentStatusBadge(booking.paymentStatus);
                                const StatusIcon = statusBadge.icon;

                                return (
                                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900 flex items-center gap-2">
                                                    <UserIcon className="w-3 h-3 text-gray-400" />
                                                    {booking.user?.name || "Unknown"}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {booking.user?.email || "No email"}
                                                </div>
                                                <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                                    <HashIcon className="w-3 h-3" />
                                                    {booking.transactionId}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {booking.package?.title?.en || "Unknown Package"}
                                                </div>
                                                <div className="text-sm text-emerald-600 flex items-center gap-1">
                                                    <DollarSignIcon className="w-3 h-3" />
                                                    ${booking.totalAmount}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="flex items-center gap-1 text-sm text-gray-700">
                                                    <CreditCardIcon className="w-3 h-3" />
                                                    {getPaymentMethodLabel(booking.paymentMethod)}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <PhoneIcon className="w-3 h-3" />
                                                    {booking.senderNumber}
                                                </div>
                                                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${paymentBadge.color}`}>
                                                    {paymentBadge.label}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                {statusBadge.label}
                                            </span>
                                            {booking.adminNote && (
                                                <div className="text-xs text-gray-400 mt-1 max-w-xs truncate">
                                                    Note: {booking.adminNote}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedBooking(booking);
                                                        setShowDetailModal(true);
                                                    }}
                                                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                                    title="View Details"
                                                >
                                                    <EyeIcon className="w-4 h-4" />
                                                </button>
                                                {booking.bookingStatus === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleVerify(booking._id)}
                                                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                                            title="Verify & Confirm"
                                                        >
                                                            <CheckCircleIcon className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(booking._id)}
                                                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                            title="Reject"
                                                        >
                                                            <XCircleIcon className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {filteredBookings.length === 0 && (
                    <div className="text-center py-12">
                        <PackageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No bookings found</p>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedBooking && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                            onClick={() => setShowDetailModal(false)}
                        />
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                                <h3 className="text-xl font-bold text-gray-900">
                                    Booking Details
                                </h3>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <XCircleIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Transaction ID</p>
                                        <p className="font-medium text-gray-900">{selectedBooking.transactionId}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                        <p className="font-medium text-emerald-600">${selectedBooking.totalAmount}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Payment Method</p>
                                        <p className="font-medium text-gray-900">{getPaymentMethodLabel(selectedBooking.paymentMethod)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Sender Number</p>
                                        <p className="font-medium text-gray-900">{selectedBooking.senderNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Booking Status</p>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedBooking.bookingStatus).color}`}>
                                            {getStatusBadge(selectedBooking.bookingStatus).label}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Payment Status</p>
                                        <span className={`inline-block text-xs px-2 py-1 rounded-full ${getPaymentStatusBadge(selectedBooking.paymentStatus).color}`}>
                                            {getPaymentStatusBadge(selectedBooking.paymentStatus).label}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">User</p>
                                        <p className="font-medium text-gray-900">{selectedBooking.user?.name}</p>
                                        <p className="text-sm text-gray-500">{selectedBooking.user?.email}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">Package</p>
                                        <p className="font-medium text-gray-900">{selectedBooking.package?.title?.en}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">Admin Note</p>
                                        <p className="text-gray-700">{selectedBooking.adminNote || "No notes"}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">Created At</p>
                                        <p className="text-gray-700">{new Date(selectedBooking.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>

                                {selectedBooking.bookingStatus === "pending" && (
                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => {
                                                handleReject(selectedBooking._id);
                                            }}
                                            className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                        >
                                            Reject Booking
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleVerify(selectedBooking._id);
                                            }}
                                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                        >
                                            Verify & Confirm
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingManagement;
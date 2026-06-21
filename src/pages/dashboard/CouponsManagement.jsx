// src/pages/dashboard/CouponsManagement.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon, CopyIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";
import CouponFormModal from "../../components/dashboard/CouponFormModal";
import ConfirmDeleteModal from "../../components/dashboard/ConfirmDeleteModal";

const CouponsManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [couponToDelete, setCouponToDelete] = useState(null);

    const queryClient = useQueryClient();

    // Fetch coupons
    const { data, isLoading, error } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const { data } = await api.get("/admin/coupons");
            return data;
        },
    });

    // Create coupon mutation
    const createMutation = useMutation({
        mutationFn: (couponData) => api.post("/admin/coupons", couponData),
        onSuccess: () => {
            queryClient.invalidateQueries(["coupons"]);
            toast.success("Coupon created successfully!");
            setIsModalOpen(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create coupon");
        },
    });

    // Update coupon mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => api.put(`/admin/coupons/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["coupons"]);
            toast.success("Coupon updated successfully!");
            setIsModalOpen(false);
            setSelectedCoupon(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update coupon");
        },
    });

    // Delete coupon mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`/admin/coupons/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["coupons"]);
            toast.success("Coupon deleted successfully!");
            setIsDeleteModalOpen(false);
            setCouponToDelete(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete coupon");
        },
    });

    // Toggle coupon active status
    const toggleMutation = useMutation({
        mutationFn: ({ id, isActive }) => api.put(`/admin/coupons/${id}`, { isActive: !isActive }),
        onSuccess: () => {
            queryClient.invalidateQueries(["coupons"]);
            toast.success("Coupon status updated!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update coupon status");
        },
    });

    const handleEdit = (coupon) => {
        setSelectedCoupon(coupon);
        setIsModalOpen(true);
    };

    const handleDelete = (coupon) => {
        setCouponToDelete(coupon);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (formData) => {
        if (selectedCoupon) {
            updateMutation.mutate({ id: selectedCoupon._id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        toast.success("Coupon code copied!");
    };

    const coupons = data?.data || [];
    const filteredCoupons = coupons.filter((coupon) =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">Error loading coupons: {error.message}</p>
                <button
                    onClick={() => queryClient.invalidateQueries(["coupons"])}
                    className="mt-4 btn-primary"
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
                <h2 className="text-2xl font-bold text-gray-900">Coupons Management</h2>
                <button
                    onClick={() => {
                        setSelectedCoupon(null);
                        setIsModalOpen(true);
                    }}
                    className="btn-primary flex items-center space-x-2 px-4 py-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Coupon</span>
                </button>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search coupons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
            </div>

            {/* Coupons Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Code
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Value
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Usage
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Expiry
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
                            {filteredCoupons.map((coupon) => (
                                <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-mono font-semibold text-sm bg-gray-100 px-2 py-1 rounded">
                                                {coupon.code}
                                            </span>
                                            <button
                                                onClick={() => handleCopyCode(coupon.code)}
                                                className="p-1 hover:bg-gray-200 rounded"
                                                title="Copy code"
                                            >
                                                <CopyIcon className="w-4 h-4 text-gray-500" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="capitalize text-sm">
                                            {coupon.discountType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium">
                                            {coupon.discountType === "percentage"
                                                ? `${coupon.value}%`
                                                : `$${coupon.value}`}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm">
                                            {coupon.usedCount} / {coupon.usageLimit}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm">
                                            {new Date(coupon.expiryDate).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() =>
                                                toggleMutation.mutate({
                                                    id: coupon._id,
                                                    isActive: coupon.isActive,
                                                })
                                            }
                                            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                                coupon.isActive
                                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                        >
                                            {coupon.isActive ? "Active" : "Inactive"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(coupon)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(coupon)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredCoupons.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No coupons found</p>
                    </div>
                )}
            </div>

            {/* Modals */}
            <CouponFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedCoupon(null);
                }}
                onSubmit={handleSubmit}
                initialData={selectedCoupon}
                isLoading={createMutation.isLoading || updateMutation.isLoading}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setCouponToDelete(null);
                }}
                onConfirm={() => deleteMutation.mutate(couponToDelete._id)}
                title="Delete Coupon"
                message={`Are you sure you want to delete coupon "${couponToDelete?.code}"? This action cannot be undone.`}
                isLoading={deleteMutation.isLoading}
            />
        </div>
    );
};

export default CouponsManagement;

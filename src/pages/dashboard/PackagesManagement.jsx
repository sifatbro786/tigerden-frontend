// src/pages/dashboard/PackagesManagement.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    SearchIcon,
    PackageIcon,
    EyeIcon,
    EyeOffIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import api, { formDataApi } from "../../services/api";
import PackageFormModal from "../../components/dashboard/PackageFormModal";
import ConfirmDeleteModal from "../../components/dashboard/ConfirmDeleteModal";

const PackagesManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [packageToDelete, setPackageToDelete] = useState(null);

    const queryClient = useQueryClient();

    // Fetch packages
    const { data, isLoading, error } = useQuery({
        queryKey: ["admin-packages"],
        queryFn: async () => {
            const { data } = await api.get("/packages");
            return data;
        },
    });

    const createMutation = useMutation({
        mutationFn: (packageData) => formDataApi.post("/admin/packages", packageData),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-packages"]);
            toast.success("Package created successfully!");
            setIsModalOpen(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create package");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => formDataApi.put(`/admin/packages/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-packages"]);
            toast.success("Package updated successfully!");
            setIsModalOpen(false);
            setSelectedPackage(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update package");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`/admin/packages/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-packages"]);
            toast.success("Package deleted successfully!");
            setIsDeleteModalOpen(false);
            setPackageToDelete(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete package");
        },
    });

    const toggleActive = useMutation({
        mutationFn: ({ id, isActive }) => api.put(`/admin/packages/${id}`, { isActive: !isActive }),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-packages"]);
            toast.success("Package status updated!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update package status");
        },
    });

    const handleEdit = (pkg) => {
        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };

    const handleDelete = (pkg) => {
        setPackageToDelete(pkg);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (formData) => {
        if (selectedPackage) {
            updateMutation.mutate({ id: selectedPackage._id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const packages = data?.data || [];
    const filteredPackages = packages.filter(
        (pkg) =>
            pkg.title?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pkg.title?.bn?.includes(searchTerm),
    );

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
                <p className="text-red-600">Error loading packages: {error.message}</p>
                <button
                    onClick={() => queryClient.invalidateQueries(["admin-packages"])}
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
                <h2 className="text-2xl font-bold text-gray-900">Packages Management</h2>
                <button
                    onClick={() => {
                        setSelectedPackage(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/30"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Package</span>
                </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-1/3">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                    <div
                        key={pkg._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="relative h-48 bg-gray-100">
                            {pkg.images && pkg.images.length > 0 ? (
                                <img
                                    src={pkg.images[0].url}
                                    alt={pkg.title.en}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <PackageIcon className="w-12 h-12" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex flex-col gap-1">
                                {pkg.isFlashSale && (
                                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        🔥 Flash Sale
                                    </span>
                                )}
                                {pkg.featured && (
                                    <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        ⭐ Featured
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() =>
                                    toggleActive.mutate({
                                        id: pkg._id,
                                        isActive: pkg.isActive,
                                    })
                                }
                                className={`absolute bottom-2 right-2 text-xs px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
                                    pkg.isActive
                                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                        : "bg-gray-500 text-white hover:bg-gray-600"
                                }`}
                            >
                                {pkg.isActive ? (
                                    <>
                                        <EyeIcon className="w-3 h-3" />
                                        Active
                                    </>
                                ) : (
                                    <>
                                        <EyeOffIcon className="w-3 h-3" />
                                        Inactive
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">{pkg.title.en}</h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {pkg.description.en}
                            </p>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-lg font-bold text-emerald-600">
                                    ${pkg.price}
                                </span>
                                {pkg.duration && (
                                    <span className="text-sm text-gray-500">{pkg.duration}</span>
                                )}
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(pkg)}
                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pkg)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                                {pkg.isFlashSale && pkg.flashSaleEndTime && (
                                    <span className="text-xs text-red-500">
                                        Ends: {new Date(pkg.flashSaleEndTime).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPackages.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <PackageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No packages found</p>
                </div>
            )}

            {/* Modals */}
            <PackageFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedPackage(null);
                }}
                onSubmit={handleSubmit}
                initialData={selectedPackage}
                isLoading={createMutation.isLoading || updateMutation.isLoading}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setPackageToDelete(null);
                }}
                onConfirm={() => deleteMutation.mutate(packageToDelete._id)}
                title="Delete Package"
                message={`Are you sure you want to delete "${packageToDelete?.title?.en}"? This action cannot be undone.`}
                isLoading={deleteMutation.isLoading}
            />
        </div>
    );
};

export default PackagesManagement;

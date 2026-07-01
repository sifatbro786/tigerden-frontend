import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    PlusIcon, PencilIcon, TrashIcon, SearchIcon,
    PackageIcon, EyeIcon, EyeOffIcon, ClockIcon,
    MapPinIcon, StarIcon, GlobeIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import api, { formDataApi } from "../../services/api";
import PackageFormModal from "../../components/dashboard/PackageFormModal";
import ConfirmDeleteModal from "../../components/dashboard/ConfirmDeleteModal";

const FILTER_TABS = [
    { key: "all", label: "All" },
    { key: "domestic", label: "🇧🇩 Domestic" },
    { key: "international", label: "✈️ International" },
];

const PackagesManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [packageToDelete, setPackageToDelete] = useState(null);

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["admin-packages"],
        queryFn: async () => {
            const { data } = await api.get("/admin/packages");
            return data;
        },
    });

    const createMutation = useMutation({
        mutationFn: (d) => formDataApi.post("/admin/packages", d),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-packages"]);
            toast.success("Package created!");
            setIsModalOpen(false);
        },
        onError: (e) => toast.error(e.response?.data?.message || "Failed to create package"),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => formDataApi.put(`/admin/packages/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-packages"]);
            toast.success("Package updated!");
            setIsModalOpen(false);
            setSelectedPackage(null);
        },
        onError: (e) => toast.error(e.response?.data?.message || "Failed to update package"),
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`/admin/packages/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-packages"]);
            toast.success("Package deleted!");
            setIsDeleteModalOpen(false);
            setPackageToDelete(null);
        },
        onError: (e) => toast.error(e.response?.data?.message || "Failed to delete package"),
    });

    const toggleActive = useMutation({
        mutationFn: ({ id, isActive }) =>
            api.put(`/admin/packages/${id}`, { isActive: !isActive }),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-packages"]);
            toast.success("Status updated!");
        },
        onError: (e) => toast.error(e.response?.data?.message || "Failed to update status"),
    });

    const handleSubmit = (formData) => {
        if (selectedPackage) {
            updateMutation.mutate({ id: selectedPackage._id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const packages = data?.data || [];

    const filtered = packages.filter((pkg) => {
        const matchesType =
            typeFilter === "all" || pkg.packageType === typeFilter;
        const q = searchTerm.toLowerCase();
        const matchesSearch =
            !q ||
            pkg.title?.en?.toLowerCase().includes(q) ||
            pkg.title?.bn?.includes(searchTerm) ||
            pkg.location?.toLowerCase().includes(q) ||
            pkg.region?.toLowerCase().includes(q) ||
            pkg.country?.toLowerCase().includes(q);
        return matchesType && matchesSearch;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 mb-3">Failed to load packages</p>
                <button
                    onClick={() => queryClient.invalidateQueries(["admin-packages"])}
                    className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-xl hover:bg-emerald-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Packages</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{packages.length} total</p>
                </div>
                <button
                    onClick={() => { setSelectedPackage(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-medium rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/30"
                >
                    <PlusIcon className="w-4 h-4" />
                    Add Package
                </button>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Type Tabs */}
                <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                    {FILTER_TABS.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTypeFilter(t.key)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                                typeFilter === t.key
                                    ? "bg-white text-emerald-700 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative flex-1 max-w-xs">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search title, location…"
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((pkg) => (
                    <div
                        key={pkg._id}
                        className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                    >
                        {/* Image */}
                        <div className="relative h-44 bg-gray-100">
                            {pkg.coverImage?.url || pkg.gallery?.[0]?.url ? (
                                <img
                                    src={pkg.coverImage?.url || pkg.gallery?.[0]?.url}
                                    alt={pkg.title?.en}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-300">
                                    <PackageIcon className="w-12 h-12" />
                                </div>
                            )}

                            {/* Badges top-left */}
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                                <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                        pkg.packageType === "international"
                                            ? "bg-blue-600 text-white"
                                            : "bg-emerald-600 text-white"
                                    }`}
                                >
                                    {pkg.packageType === "international" ? "✈️ Intl" : "🇧🇩 Local"}
                                </span>
                                {pkg.isFlashSale && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">
                                        🔥 Sale
                                    </span>
                                )}
                                {pkg.featured && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-500 text-white">
                                        ⭐ Featured
                                    </span>
                                )}
                            </div>

                            {/* Active toggle top-right */}
                            <button
                                onClick={() => toggleActive.mutate({ id: pkg._id, isActive: pkg.isActive })}
                                className={`absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                                    pkg.isActive
                                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                        : "bg-gray-500 text-white hover:bg-gray-600"
                                }`}
                            >
                                {pkg.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeOffIcon className="w-3 h-3" />}
                                {pkg.isActive ? "Active" : "Hidden"}
                            </button>

                            {/* Rating bottom */}
                            {pkg.rating > 0 && (
                                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                                    <StarIcon className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    {pkg.rating.toFixed(1)}
                                    {pkg.reviewCount > 0 && (
                                        <span className="text-white/70">({pkg.reviewCount})</span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Body */}
                        <div className="p-4">
                            {/* Category */}
                            {pkg.category?.name?.en && (
                                <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mb-1.5">
                                    {pkg.category.name.en}
                                </span>
                            )}

                            {/* Title */}
                            <h3 className="font-semibold text-gray-900 leading-tight line-clamp-1">
                                {pkg.title?.en}
                            </h3>
                            <p className="text-xs text-gray-400 line-clamp-1 mb-2">{pkg.title?.bn}</p>

                            {/* Location */}
                            {(pkg.location || pkg.country) && (
                                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                                    <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                                    <span className="line-clamp-1">
                                        {[pkg.city, pkg.country || pkg.location]
                                            .filter(Boolean)
                                            .join(", ")}
                                    </span>
                                </div>
                            )}

                            {/* Tags */}
                            {pkg.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {pkg.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {pkg.tags.length > 3 && (
                                        <span className="text-[10px] text-gray-400">
                                            +{pkg.tags.length - 3}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Price & Duration */}
                            <div className="flex items-end justify-between mb-3">
                                <div>
                                    <span className="text-lg font-bold text-emerald-600">
                                        ৳{pkg.discountedPrice?.toLocaleString()}
                                    </span>
                                    {pkg.originalPrice > pkg.discountedPrice && (
                                        <span className="text-xs text-gray-400 line-through ml-1.5">
                                            ৳{pkg.originalPrice?.toLocaleString()}
                                        </span>
                                    )}
                                    {pkg.discountPercentage > 0 && (
                                        <span className="ml-1 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-semibold">
                                            -{Math.round(pkg.discountPercentage)}%
                                        </span>
                                    )}
                                </div>
                                {pkg.duration && (
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                        <ClockIcon className="w-3 h-3" />
                                        {pkg.duration}
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => { setSelectedPackage(pkg); setIsModalOpen(true); }}
                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => { setPackageToDelete(pkg); setIsDeleteModalOpen(true); }}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                                {pkg.isFlashSale && pkg.flashSaleEndTime && (
                                    <span className="text-[10px] text-red-500">
                                        Ends {new Date(pkg.flashSaleEndTime).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200">
                    <PackageIcon className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">No packages found</p>
                    <p className="text-gray-400 text-sm mt-1">
                        {searchTerm ? "Try a different search term" : "Create your first package to get started"}
                    </p>
                </div>
            )}

            {/* Modals */}
            <PackageFormModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setSelectedPackage(null); }}
                onSubmit={handleSubmit}
                initialData={selectedPackage}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => { setIsDeleteModalOpen(false); setPackageToDelete(null); }}
                onConfirm={() => deleteMutation.mutate(packageToDelete._id)}
                title="Delete Package"
                message={`Permanently delete "${packageToDelete?.title?.en}"? This cannot be undone.`}
                isLoading={deleteMutation.isPending}
            />
        </div>
    );
};

export default PackagesManagement;
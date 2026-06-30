// src/pages/dashboard/CategoryManagement.jsx
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    SearchIcon,
    TagIcon,
    XIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";
import ConfirmDeleteModal from "../../components/dashboard/ConfirmDeleteModal";

const CategoryManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const queryClient = useQueryClient();

    // Fetch categories (including inactive for admin)
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["admin-categories"],
        queryFn: async () => {
            const { data } = await api.get("/admin/categories?includeInactive=true");
            return data;
        },
    });

    // Create category
    const createMutation = useMutation({
        mutationFn: (categoryData) => api.post("/admin/categories", categoryData),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-categories"]);
            toast.success("Category created successfully!");
            setIsModalOpen(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create category");
        },
    });

    // Update category
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => api.put(`/admin/categories/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-categories"]);
            toast.success("Category updated successfully!");
            setIsModalOpen(false);
            setSelectedCategory(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update category");
        },
    });

    // Delete category
    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`/admin/categories/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-categories"]);
            toast.success("Category deleted successfully!");
            setIsDeleteModalOpen(false);
            setCategoryToDelete(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete category");
        },
    });

    // Toggle active status
    const toggleMutation = useMutation({
        mutationFn: ({ id, isActive }) =>
            api.put(`/admin/categories/${id}`, { isActive: !isActive }),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-categories"]);
            toast.success("Category status updated!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update category status");
        },
    });

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleDelete = (category) => {
        setCategoryToDelete(category);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (formData) => {
        if (selectedCategory) {
            updateMutation.mutate({ id: selectedCategory._id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const categories = data?.data || [];
    const filteredCategories = categories.filter(
        (cat) =>
            cat.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.name.bn.includes(searchTerm) ||
            cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
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
                <p className="text-red-600">Error loading categories: {error.message}</p>
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
                    <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {categories.length} categories found
                    </p>
                </div>
                <button
                    onClick={() => {
                        setSelectedCategory(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/30"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Category</span>
                </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-1/3">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                    <div
                        key={category._id}
                        className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-shadow ${
                            category.isActive ? "border-gray-200" : "border-gray-300 bg-gray-50"
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-emerald-50 rounded-lg">
                                    <TagIcon className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {category.name.en}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {category.name.bn}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        slug: {category.slug}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    toggleMutation.mutate({
                                        id: category._id,
                                        isActive: category.isActive,
                                    })
                                }
                                className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${
                                    category.isActive
                                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                }`}
                            >
                                {category.isActive ? "Active" : "Inactive"}
                            </button>
                        </div>

                        {category.description && (
                            <p className="text-sm text-gray-600 mt-3">
                                {category.description.en || category.description.bn}
                            </p>
                        )}

                        <div className="flex items-center justify-end space-x-2 mt-4 pt-3 border-t border-gray-100">
                            <button
                                onClick={() => handleEdit(category)}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Edit"
                            >
                                <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(category)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCategories.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <TagIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No categories found</p>
                </div>
            )}

            {/* Category Form Modal */}
            <CategoryFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedCategory(null);
                }}
                onSubmit={handleSubmit}
                initialData={selectedCategory}
                isLoading={createMutation.isLoading || updateMutation.isLoading}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setCategoryToDelete(null);
                }}
                onConfirm={() => deleteMutation.mutate(categoryToDelete._id)}
                title="Delete Category"
                message={`Are you sure you want to delete category "${categoryToDelete?.name?.en}"? This action cannot be undone.`}
                isLoading={deleteMutation.isLoading}
            />
        </div>
    );
};

// Category Form Modal Component
const CategoryFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
    const [formData, setFormData] = useState({
        name: { en: "", bn: "" },
        description: { en: "", bn: "" },
        isActive: true,
        slug: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || { en: "", bn: "" },
                description: initialData.description || { en: "", bn: "" },
                isActive: initialData.isActive !== undefined ? initialData.isActive : true,
                slug: initialData.slug || "",
            });
        } else {
            setFormData({
                name: { en: "", bn: "" },
                description: { en: "", bn: "" },
                isActive: true,
                slug: "",
            });
        }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("name.") || name.startsWith("description.")) {
            const [field, lang] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [field]: { ...prev[field], [lang]: value },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.en || !formData.name.bn) {
            toast.error("Both English and Bangla names are required");
            return;
        }

        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />
                <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900">
                            {initialData ? "Edit Category" : "Create New Category"}
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name (English) *
                            </label>
                            <input
                                type="text"
                                name="name.en"
                                value={formData.name.en}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name (Bangla) *
                            </label>
                            <input
                                type="text"
                                name="name.bn"
                                value={formData.name.bn}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Slug (Optional - Auto-generated from English name)
                            </label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                placeholder="e.g., beach-holiday"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Leave empty to auto-generate from English name
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description (English)
                            </label>
                            <textarea
                                name="description.en"
                                value={formData.description.en}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description (Bangla)
                            </label>
                            <textarea
                                name="description.bn"
                                value={formData.description.bn}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            />
                        </div>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">Active</span>
                        </label>

                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading
                                    ? "Saving..."
                                    : initialData
                                      ? "Update Category"
                                      : "Create Category"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryManagement;
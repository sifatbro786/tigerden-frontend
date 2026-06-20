CategoriesPage.jsx;
("use client");
import React from "react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    FolderIcon,
    FolderOpenIcon,
} from "@heroicons/react/24/outline";
import CategoryCreate from "../../components/category/CategoryCreate";

const fetchCategories = async () => {
    const response = await fetch("http://localhost:5000/api/categories?includeInactive=true");
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return response.json();
};

const deleteCategory = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete category");
    }
};

export default function CategoriesPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"]);
            toast.success("Category deleted successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to delete category");
        },
    });

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setIsCreateModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            deleteMutation.mutate(id);
        }
    };

    const handleCreateSuccess = () => {
        setIsCreateModalOpen(false);
        setSelectedCategory(null);
    };

    const handleCreateClose = () => {
        setIsCreateModalOpen(false);
        setSelectedCategory(null);
    };

    const getStatusColor = (isActive) => {
        return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
    };

    const filteredCategories =
        data?.categories?.filter((category) => {
            const matchesSearch =
                category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.description?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "" ||
                (statusFilter === "active" && category.isActive) ||
                (statusFilter === "inactive" && !category.isActive);

            return matchesSearch && matchesStatus;
        }) || [];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-500 text-lg">
                    Error loading categories: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:">
                        Categories
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">Manage product categories</p>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    <button
                        onClick={() => {
                            setSelectedCategory(null);
                            setIsCreateModalOpen(true);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Category
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        placeholder="Search categories..."
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                    <div key={category._id} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            {/* Category Image */}
                            <div className="aspect-w-16 aspect-h-9 mb-4">
                                <img
                                    src={
                                        category.image ||
                                        "/placeholder.svg?height=200&width=300&query=category"
                                    }
                                    alt={category.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>

                            {/* Category Info */}
                            <div className="space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-2">
                                        {category.parentCategory ? (
                                            <FolderIcon className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <FolderOpenIcon className="h-5 w-5 text-blue-500" />
                                        )}
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {category.name}
                                        </h3>
                                    </div>
                                    <span
                                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(category.isActive)}`}
                                    >
                                        {category.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>

                                {category.description && (
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {category.description}
                                    </p>
                                )}

                                {/* Category Stats */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-gray-500">
                                        <span className="font-medium">Products:</span>{" "}
                                        {category.productCount || 0}
                                    </div>
                                    <div className="text-gray-500">
                                        <span className="font-medium">Sort Order:</span>{" "}
                                        {category.sortOrder}
                                    </div>
                                    {category.parentCategory && (
                                        <div className="text-gray-500 col-span-2">
                                            <span className="font-medium">Parent:</span>{" "}
                                            {category.parentCategory.name}
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end space-x-2 pt-4 border-t">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category._id)}
                                        disabled={deleteMutation.isPending}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                    <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No categories found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Get started by creating a new category.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={() => {
                                setSelectedCategory(null);
                                setIsCreateModalOpen(true);
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Category
                        </button>
                    </div>
                </div>
            )}

            {/* Category Create/Edit Modal */}
            {isCreateModalOpen && (
                <CategoryCreate
                    category={selectedCategory}
                    onClose={handleCreateClose}
                    onSuccess={handleCreateSuccess}
                />
            )}
        </div>
    );
}

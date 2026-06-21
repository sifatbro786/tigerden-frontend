// src/pages/dashboard/PageMetaManagement.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Copy,
    Edit,
    ExternalLink,
    Eye,
    EyeOff,
    Plus,
    Save,
    Search,
    Trash2,
    X,
    Sparkles,
    TrendingUp,
    AlertCircle,
    Globe,
    Hash,
    Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { pageMetaApi } from "../../services/api";

const PageMetaManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterActive, setFilterActive] = useState("all");
    const [showForm, setShowForm] = useState(false);
    const [editingPage, setEditingPage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        pageName: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        canonicalUrl: "",
        isActive: true,
        lastUpdatedBy: "admin",
    });

    // Fetch all pages using pageMetaApi
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["page-meta"],
        queryFn: async () => {
            const response = await pageMetaApi.getAll();
            return response.data;
        },
    });

    // Create page mutation
    const createMutation = useMutation({
        mutationFn: (pageData) => pageMetaApi.create(pageData),
        onSuccess: () => {
            queryClient.invalidateQueries(["page-meta"]);
            toast.success("Page created successfully!");
            resetForm();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create page");
        },
    });

    // Update page mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => pageMetaApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["page-meta"]);
            toast.success("Page updated successfully!");
            resetForm();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update page");
        },
    });

    // Delete page mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => pageMetaApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["page-meta"]);
            toast.success("Page deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete page");
        },
    });

    // Toggle active status mutation
    const toggleMutation = useMutation({
        mutationFn: ({ id }) => pageMetaApi.toggleStatus(id, "admin"),
        onSuccess: () => {
            queryClient.invalidateQueries(["page-meta"]);
            toast.success("Page status updated!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update page status");
        },
    });

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? e.target.checked : value,
        }));
    };

    const resetForm = () => {
        setFormData({
            pageName: "",
            metaTitle: "",
            metaDescription: "",
            metaKeywords: "",
            canonicalUrl: "",
            isActive: true,
            lastUpdatedBy: "admin",
        });
        setEditingPage(null);
        setShowForm(false);
        setSubmitting(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const submitData = {
            ...formData,
            lastUpdatedBy: "admin",
        };

        if (editingPage) {
            updateMutation.mutate({ id: editingPage._id, data: submitData });
        } else {
            createMutation.mutate(submitData);
        }
        setSubmitting(false);
    };

    const handleEdit = (page) => {
        setEditingPage(page);
        setFormData({
            pageName: page.pageName,
            metaTitle: page.metaTitle,
            metaDescription: page.metaDescription,
            metaKeywords: page.metaKeywords,
            canonicalUrl: page.canonicalUrl,
            isActive: page.isActive,
            lastUpdatedBy: "admin",
        });
        setShowForm(true);
    };

    const handleDelete = (pageId) => {
        if (window.confirm("Are you sure you want to delete this page?")) {
            deleteMutation.mutate(pageId);
        }
    };

    const toggleActive = (pageId) => {
        toggleMutation.mutate({ id: pageId });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const pages = data?.data || [];

    const filteredPages = pages.filter((page) => {
        const matchesSearch =
            page.pageName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            page.metaTitle?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filterActive === "all" ||
            (filterActive === "active" && page.isActive) ||
            (filterActive === "inactive" && !page.isActive);

        return matchesSearch && matchesFilter;
    });

    const titleLength = formData.metaTitle?.length || 0;
    const descriptionLength = formData.metaDescription?.length || 0;

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-emerald-600 animate-pulse" />
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600 font-medium">Loading page data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
                    <AlertCircle className="w-6 h-6" />
                    <p>Error loading pages: {error.message}</p>
                </div>
                <button
                    onClick={() => refetch()}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Page Meta Management
                        </h1>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base">
                        Optimize your website's SEO by managing meta tags for all pages
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingPage(null);
                        setFormData({
                            pageName: "",
                            metaTitle: "",
                            metaDescription: "",
                            metaKeywords: "",
                            canonicalUrl: "",
                            isActive: true,
                            lastUpdatedBy: "admin",
                        });
                        setShowForm(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 hover:shadow-xl"
                >
                    <Plus className="w-4 h-4" />
                    Add New Page
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-emerald-50 rounded-xl">
                            <Globe className="w-5 h-5 text-emerald-600" />
                        </div>
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                        {pages.length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Total Pages</div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-green-50 rounded-xl">
                            <Eye className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                        {pages.filter((p) => p.isActive).length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Active Pages</div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-red-50 rounded-xl">
                            <EyeOff className="w-5 h-5 text-red-600" />
                        </div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                        {pages.filter((p) => !p.isActive).length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Inactive Pages</div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-sm p-6 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                            SEO Score
                        </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                        {Math.round(
                            (pages.filter((p) => p.isActive && p.metaTitle && p.metaDescription)
                                .length /
                                Math.max(pages.length, 1)) *
                                100,
                        )}
                        %
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Optimization Rate</div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search pages by name or title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={filterActive}
                            onChange={(e) => setFilterActive(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white cursor-pointer"
                        >
                            <option value="all">All Pages</option>
                            <option value="active">Active Only</option>
                            <option value="inactive">Inactive Only</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Pages Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {filteredPages.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-300 mb-4">
                            <Search className="w-20 h-20 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            {pages.length === 0 ? "No pages found" : "No matching pages"}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {pages.length === 0
                                ? "Get started by creating your first page meta."
                                : "Try adjusting your search or filter criteria."}
                        </p>
                        {pages.length === 0 && (
                            <button
                                onClick={() => {
                                    setEditingPage(null);
                                    setFormData({
                                        pageName: "",
                                        metaTitle: "",
                                        metaDescription: "",
                                        metaKeywords: "",
                                        canonicalUrl: "",
                                        isActive: true,
                                        lastUpdatedBy: "admin",
                                    });
                                    setShowForm(true);
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                Create First Page
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Page
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Meta Information
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredPages.map((page) => (
                                    <tr
                                        key={page._id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    {page.pageName}
                                                </div>
                                                <a
                                                    href={page.canonicalUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-sm mt-1"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                    View Page
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-xs">
                                                <div
                                                    className="text-sm font-medium text-gray-900 truncate"
                                                    title={page.metaTitle}
                                                >
                                                    {page.metaTitle}
                                                </div>
                                                <div
                                                    className="text-xs text-gray-500 truncate mt-1"
                                                    title={page.metaDescription}
                                                >
                                                    {page.metaDescription}
                                                </div>
                                                <div className="text-xs text-gray-400 truncate mt-1">
                                                    <Hash className="w-3 h-3 inline mr-1" />
                                                    {page.metaKeywords
                                                        ?.split(",")
                                                        .slice(0, 3)
                                                        .join(", ")}
                                                    {page.metaKeywords?.split(",").length > 3
                                                        ? "..."
                                                        : ""}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleActive(page._id)}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                                    page.isActive
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                            >
                                                {page.isActive ? (
                                                    <Eye className="w-3 h-3" />
                                                ) : (
                                                    <EyeOff className="w-3 h-3" />
                                                )}
                                                {page.isActive ? "Active" : "Inactive"}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(page)}
                                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(page._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(page.metaTitle)}
                                                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                    title="Copy Meta Title"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* SEO Tips */}
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-200 rounded-xl">
                        <Sparkles className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            SEO Best Practices
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                                <span>
                                    Meta Title: Keep it under 60 characters for optimal display
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                                <span>
                                    Meta Description: Aim for 150-160 characters to avoid truncation
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                                <span>Keywords: Use relevant, comma-separated keywords</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                                <span>Canonical URL: Always use the full absolute URL</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                    {editingPage ? "Edit Page Meta" : "Create New Page"}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Page Information
                                        </h3>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Page Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="pageName"
                                                value={formData.pageName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="e.g., About Us, Contact, FAQ"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Canonical URL *
                                            </label>
                                            <input
                                                type="url"
                                                name="canonicalUrl"
                                                value={formData.canonicalUrl}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="https://yourstore.com/page-name"
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="isActive"
                                                checked={formData.isActive}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                            />
                                            <label className="ml-2 text-sm font-medium text-gray-700">
                                                Page is active
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            SEO Meta Data
                                        </h3>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Meta Title *
                                                <span
                                                    className={`ml-2 text-xs ${titleLength > 60 ? "text-red-500" : "text-gray-500"}`}
                                                >
                                                    {titleLength}/60
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="metaTitle"
                                                value={formData.metaTitle}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Page title for SEO (max 60 characters)"
                                                maxLength={60}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Meta Description *
                                                <span
                                                    className={`ml-2 text-xs ${descriptionLength > 160 ? "text-red-500" : "text-gray-500"}`}
                                                >
                                                    {descriptionLength}/160
                                                </span>
                                            </label>
                                            <textarea
                                                name="metaDescription"
                                                value={formData.metaDescription}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                                placeholder="Page description for SEO (max 160 characters)"
                                                maxLength={160}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Meta Keywords *
                                            </label>
                                            <input
                                                type="text"
                                                name="metaKeywords"
                                                value={formData.metaKeywords}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="keyword1, keyword2, keyword3"
                                                required
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Separate keywords with commas
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        SEO Preview
                                    </h3>
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
                                        <div className="text-emerald-600 text-lg font-medium mb-1">
                                            {formData.metaTitle || "Meta Title Preview"}
                                        </div>
                                        <div className="text-green-600 text-sm mb-2">
                                            {formData.canonicalUrl ||
                                                "https://yourstore.com/page-url"}
                                        </div>
                                        <div className="text-gray-600 text-sm">
                                            {formData.metaDescription ||
                                                "Meta description preview will appear here..."}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-6 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                {editingPage ? "Updating..." : "Creating..."}
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                {editingPage ? "Update Page" : "Create Page"}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageMetaManagement;

// src/pages/dashboard/BlogsManagement.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    SearchIcon,
    CalendarIcon,
    UserIcon,
    EyeIcon,
    EyeOffIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import api, { formDataApi } from "../../services/api";
import BlogFormModal from "../../components/dashboard/BlogFormModal";
import ConfirmDeleteModal from "../../components/dashboard/ConfirmDeleteModal";

const BlogsManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blogToDelete, setBlogToDelete] = useState(null);

    const queryClient = useQueryClient();

    // Fetch ALL blogs including unpublished using admin endpoint
    const { data, isLoading, error } = useQuery({
        queryKey: ["admin-blogs"],
        queryFn: async () => {
            const { data } = await api.get("/blogs");
            return data;
        },
    });

    const createMutation = useMutation({
        mutationFn: (blogData) => formDataApi.post("/admin/blogs", blogData),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-blogs"]);
            toast.success("Blog created successfully!");
            setIsModalOpen(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create blog");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => formDataApi.put(`/admin/blogs/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-blogs"]);
            toast.success("Blog updated successfully!");
            setIsModalOpen(false);
            setSelectedBlog(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update blog");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`/admin/blogs/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-blogs"]);
            toast.success("Blog deleted successfully!");
            setIsDeleteModalOpen(false);
            setBlogToDelete(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete blog");
        },
    });

    const togglePublishStatus = useMutation({
        mutationFn: ({ id, isPublished }) =>
            api.put(`/admin/blogs/${id}`, { isPublished: !isPublished }),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin-blogs"]);
            toast.success("Blog status updated!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update blog status");
        },
    });

    const handleEdit = (blog) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    const handleDelete = (blog) => {
        setBlogToDelete(blog);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (formData) => {
        if (selectedBlog) {
            updateMutation.mutate({ id: selectedBlog._id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const blogs = data?.data || [];
    const filteredBlogs = blogs.filter(
        (blog) =>
            blog.title?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.title?.bn?.includes(searchTerm) ||
            blog.author?.toLowerCase().includes(searchTerm.toLowerCase()),
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
                <p className="text-red-600">Error loading blogs: {error.message}</p>
                <button
                    onClick={() => queryClient.invalidateQueries(["admin-blogs"])}
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
                <h2 className="text-2xl font-bold text-gray-900">Blogs Management</h2>
                <button
                    onClick={() => {
                        setSelectedBlog(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/30"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Create Blog</span>
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                    >
                        <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-teal-100">
                            {blog.image?.url ? (
                                <img
                                    src={blog.image.url}
                                    alt={blog.title.en}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <span className="text-4xl">📝</span>
                                </div>
                            )}
                            <div className="absolute top-3 right-3">
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${
                                        blog.isPublished
                                            ? "bg-emerald-500 text-white"
                                            : "bg-yellow-500 text-white"
                                    }`}
                                >
                                    {blog.isPublished ? (
                                        <>
                                            <EyeIcon className="w-3 h-3" />
                                            Published
                                        </>
                                    ) : (
                                        <>
                                            <EyeOffIcon className="w-3 h-3" />
                                            Draft
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                                {blog.title.en}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                <span className="flex items-center gap-1">
                                    <UserIcon className="w-3 h-3" />
                                    {blog.author}
                                </span>
                                <span className="flex items-center gap-1">
                                    <CalendarIcon className="w-3 h-3" />
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                {blog.content?.en?.substring(0, 100)}...
                            </p>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(blog)}
                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={() =>
                                        togglePublishStatus.mutate({
                                            id: blog._id,
                                            isPublished: blog.isPublished,
                                        })
                                    }
                                    className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                                        blog.isPublished
                                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                    }`}
                                >
                                    {blog.isPublished ? "Published" : "Draft"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredBlogs.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <span className="text-4xl block mb-4">📝</span>
                    <p className="text-gray-500">No blogs found</p>
                </div>
            )}

            {/* Modals */}
            <BlogFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedBlog(null);
                }}
                onSubmit={handleSubmit}
                initialData={selectedBlog}
                isLoading={createMutation.isLoading || updateMutation.isLoading}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setBlogToDelete(null);
                }}
                onConfirm={() => deleteMutation.mutate(blogToDelete._id)}
                title="Delete Blog"
                message={`Are you sure you want to delete "${blogToDelete?.title?.en}"? This action cannot be undone.`}
                isLoading={deleteMutation.isLoading}
            />
        </div>
    );
};

export default BlogsManagement;

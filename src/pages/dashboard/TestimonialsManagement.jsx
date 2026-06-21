// src/pages/dashboard/TestimonialsManagement.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon, StarIcon } from "lucide-react";
import toast from "react-hot-toast";
import api, { formDataApi } from "../../services/api";
import TestimonialFormModal from "../../components/dashboard/TestimonialFormModal";
import ConfirmDeleteModal from "../../components/dashboard/ConfirmDeleteModal";

const TestimonialsManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [testimonialToDelete, setTestimonialToDelete] = useState(null);

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["testimonials"],
        queryFn: async () => {
            const { data } = await api.get("/testimonials");
            return data;
        },
    });

    const createMutation = useMutation({
        mutationFn: (testimonialData) => formDataApi.post("/admin/testimonials", testimonialData),
        onSuccess: () => {
            queryClient.invalidateQueries(["testimonials"]);
            toast.success("Testimonial added successfully!");
            setIsModalOpen(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to add testimonial");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => formDataApi.put(`/admin/testimonials/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["testimonials"]);
            toast.success("Testimonial updated successfully!");
            setIsModalOpen(false);
            setSelectedTestimonial(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update testimonial");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`/admin/testimonials/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["testimonials"]);
            toast.success("Testimonial deleted successfully!");
            setIsDeleteModalOpen(false);
            setTestimonialToDelete(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete testimonial");
        },
    });

    const toggleApproval = useMutation({
        mutationFn: ({ id, isApproved }) =>
            api.put(`/admin/testimonials/${id}`, { isApproved: !isApproved }),
        onSuccess: () => {
            queryClient.invalidateQueries(["testimonials"]);
            toast.success("Testimonial status updated!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update status");
        },
    });

    const handleEdit = (testimonial) => {
        setSelectedTestimonial(testimonial);
        setIsModalOpen(true);
    };

    const handleDelete = (testimonial) => {
        setTestimonialToDelete(testimonial);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (formData) => {
        if (selectedTestimonial) {
            updateMutation.mutate({ id: selectedTestimonial._id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const testimonials = data?.data || [];
    const filteredTestimonials = testimonials.filter(
        (t) =>
            t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.review?.en?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <StarIcon
                key={i}
                className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
        ));
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
                <p className="text-red-600">Error loading testimonials: {error.message}</p>
                <button
                    onClick={() => queryClient.invalidateQueries(["testimonials"])}
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
                <h2 className="text-2xl font-bold text-gray-900">Testimonials Management</h2>
                <button
                    onClick={() => {
                        setSelectedTestimonial(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/30"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Testimonial</span>
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search testimonials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((testimonial) => (
                    <div
                        key={testimonial._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 flex-shrink-0">
                                {testimonial.image?.url ? (
                                    <img
                                        src={testimonial.image.url}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-2xl">
                                        👤
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                <div className="flex items-center gap-0.5">
                                    {renderStars(testimonial.rating)}
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                            "{testimonial.review?.en}"
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(testimonial)}
                                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                >
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(testimonial)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                            <button
                                onClick={() =>
                                    toggleApproval.mutate({
                                        id: testimonial._id,
                                        isApproved: testimonial.isApproved,
                                    })
                                }
                                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                                    testimonial.isApproved
                                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {testimonial.isApproved ? "Approved" : "Pending"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTestimonials.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <span className="text-4xl block mb-4">💬</span>
                    <p className="text-gray-500">No testimonials found</p>
                </div>
            )}

            {/* Modals */}
            <TestimonialFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedTestimonial(null);
                }}
                onSubmit={handleSubmit}
                initialData={selectedTestimonial}
                isLoading={createMutation.isLoading || updateMutation.isLoading}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setTestimonialToDelete(null);
                }}
                onConfirm={() => deleteMutation.mutate(testimonialToDelete._id)}
                title="Delete Testimonial"
                message={`Are you sure you want to delete the testimonial from "${testimonialToDelete?.name}"? This action cannot be undone.`}
                isLoading={deleteMutation.isLoading}
            />
        </div>
    );
};

export default TestimonialsManagement;

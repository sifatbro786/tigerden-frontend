// src/components/dashboard/TestimonialFormModal.jsx
import { useState, useEffect } from "react";
import { XIcon, StarIcon } from "lucide-react";
import toast from "react-hot-toast";

const TestimonialFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
    const [formData, setFormData] = useState({
        name: "",
        rating: 5,
        review: { en: "", bn: "" },
        isApproved: true,
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                rating: initialData.rating || 5,
                review: initialData.review || { en: "", bn: "" },
                isApproved: initialData.isApproved !== undefined ? initialData.isApproved : true,
                image: null,
            });
            setPreviewImage(initialData.image?.url || null);
        } else {
            setFormData({
                name: "",
                rating: 5,
                review: { en: "", bn: "" },
                isApproved: true,
                image: null,
            });
            setPreviewImage(null);
        }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("review.")) {
            const [, lang] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                review: { ...prev.review, [lang]: value },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleRatingClick = (rating) => {
        setFormData((prev) => ({ ...prev, rating }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error("Name is required");
            return;
        }
        if (!formData.review.en) {
            toast.error("English review is required");
            return;
        }
        if (!formData.image && !initialData) {
            toast.error("Please upload an image");
            return;
        }

        const submitData = { ...formData };
        if (initialData && !submitData.image) {
            delete submitData.image;
        }

        onSubmit(submitData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />

                <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                        <h3 className="text-xl font-bold text-gray-900">
                            {initialData ? "Edit Testimonial" : "Add Testimonial"}
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Customer Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                required
                            />
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rating *
                            </label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => handleRatingClick(star)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <StarIcon
                                            className={`w-8 h-8 ${
                                                star <= (hoverRating || formData.rating)
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Click on stars to set rating (1-5)
                            </p>
                        </div>

                        {/* Review */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Review (English) *
                                </label>
                                <textarea
                                    name="review.en"
                                    value={formData.review.en}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Review (Bangla)
                                </label>
                                <textarea
                                    name="review.bn"
                                    value={formData.review.bn}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-bangla"
                                />
                            </div>
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Customer Image *
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            />
                            {previewImage && (
                                <div className="mt-3">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-20 h-20 object-cover rounded-full border border-gray-200"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Approval Status */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isApproved"
                                checked={formData.isApproved}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Approve immediately
                            </span>
                        </div>

                        {/* Actions */}
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
                                {isLoading ? "Saving..." : initialData ? "Update" : "Add"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TestimonialFormModal;

// src/components/dashboard/BlogFormModal.jsx
import { useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import toast from "react-hot-toast";

const BlogFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
    const [formData, setFormData] = useState({
        title: { en: "", bn: "" },
        content: { en: "", bn: "" },
        author: "",
        isPublished: true,
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || { en: "", bn: "" },
                content: initialData.content || { en: "", bn: "" },
                author: initialData.author || "",
                isPublished: initialData.isPublished !== undefined ? initialData.isPublished : true,
                image: null,
            });
            setPreviewImage(initialData.image?.url || null);
        } else {
            setFormData({
                title: { en: "", bn: "" },
                content: { en: "", bn: "" },
                author: "",
                isPublished: true,
                image: null,
            });
            setPreviewImage(null);
        }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("title.") || name.startsWith("content.")) {
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.en || !formData.title.bn) {
            toast.error("Both English and Bangla titles are required");
            return;
        }
        if (!formData.content.en || !formData.content.bn) {
            toast.error("Both English and Bangla contents are required");
            return;
        }
        if (!formData.author) {
            toast.error("Author name is required");
            return;
        }

        const submitData = { ...formData };
        if (!submitData.image && !initialData) {
            toast.error("Please upload an image");
            return;
        }

        // For update, only send image if new one selected
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

                <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                        <h3 className="text-xl font-bold text-gray-900">
                            {initialData ? "Edit Blog" : "Create New Blog"}
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Title */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title (English) *
                                </label>
                                <input
                                    type="text"
                                    name="title.en"
                                    value={formData.title.en}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title (Bangla) *
                                </label>
                                <input
                                    type="text"
                                    name="title.bn"
                                    value={formData.title.bn}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-bangla"
                                    required
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Content (English) *
                                </label>
                                <textarea
                                    name="content.en"
                                    value={formData.content.en}
                                    onChange={handleInputChange}
                                    rows="6"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Content (Bangla) *
                                </label>
                                <textarea
                                    name="content.bn"
                                    value={formData.content.bn}
                                    onChange={handleInputChange}
                                    rows="6"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-bangla"
                                    required
                                />
                            </div>
                        </div>

                        {/* Author & Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Author *
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                    required
                                />
                            </div>
                            <div className="flex items-center pt-6">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="isPublished"
                                        checked={formData.isPublished}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Publish immediately
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Featured Image *
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
                                        className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                                    />
                                </div>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                                {initialData
                                    ? "Upload new image to replace existing one"
                                    : "Upload a featured image for the blog"}
                            </p>
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
                                {isLoading
                                    ? "Saving..."
                                    : initialData
                                      ? "Update Blog"
                                      : "Create Blog"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogFormModal;

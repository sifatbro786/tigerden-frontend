// src/components/dashboard/PackageFormModal.jsx
import { useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import toast from "react-hot-toast";

const PackageFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
    const [formData, setFormData] = useState({
        title: { en: "", bn: "" },
        description: { en: "", bn: "" },
        price: "",
        duration: "",
        location: "",
        featured: false,
        isFlashSale: false,
        flashSaleEndTime: "",
        images: [], // new File uploads only
    });

    // Existing images (from DB) tracked separately, with public_id so
    // we know exactly which ones to keep/remove on submit.
    const [existingImages, setExistingImages] = useState([]); // [{ url, public_id }]
    const [newPreviews, setNewPreviews] = useState([]); // preview URLs for newly added files

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || { en: "", bn: "" },
                description: initialData.description || { en: "", bn: "" },
                price: initialData.price || "",
                duration: initialData.duration || "",
                location: initialData.location || "",
                featured: initialData.featured || false,
                isFlashSale: initialData.isFlashSale || false,
                flashSaleEndTime: initialData.flashSaleEndTime?.split("T")[0] || "",
                images: [],
            });
            setExistingImages(initialData.images || []);
            setNewPreviews([]);
        } else {
            setFormData({
                title: { en: "", bn: "" },
                description: { en: "", bn: "" },
                price: "",
                duration: "",
                location: "",
                featured: false,
                isFlashSale: false,
                flashSaleEndTime: "",
                images: [],
            });
            setExistingImages([]);
            setNewPreviews([]);
        }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("title.") || name.startsWith("description.")) {
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
        const files = Array.from(e.target.files);
        setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
        setNewPreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
    };

    // Remove an existing (already-uploaded) image
    const removeExistingImage = (publicId) => {
        setExistingImages((prev) => prev.filter((img) => img.public_id !== publicId));
    };

    // Remove a newly-added (not-yet-uploaded) image
    const removeNewImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
        setNewPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.en || !formData.title.bn) {
            toast.error("Both English and Bangla titles are required");
            return;
        }
        if (!formData.description.en || !formData.description.bn) {
            toast.error("Both English and Bangla descriptions are required");
            return;
        }
        if (!formData.price || formData.price <= 0) {
            toast.error("Valid price is required");
            return;
        }
        if (existingImages.length + formData.images.length === 0) {
            toast.error("At least one image is required");
            return;
        }
        if (existingImages.length + formData.images.length > 5) {
            toast.error("Maximum 5 images allowed");
            return;
        }

        const submitData = {
            ...formData,
            price: parseFloat(formData.price),
        };

        // Tell the backend exactly which existing images to keep.
        if (initialData) {
            submitData.keepImages = existingImages.map((img) => img.public_id);
        }

        if (formData.images.length === 0) {
            delete submitData.images;
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

                <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                        <h3 className="text-xl font-bold text-gray-900">
                            {initialData ? "Edit Package" : "Create New Package"}
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-bangla"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description (English) *
                                </label>
                                <textarea
                                    name="description.en"
                                    value={formData.description.en}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description (Bangla) *
                                </label>
                                <textarea
                                    name="description.bn"
                                    value={formData.description.bn}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-bangla"
                                    required
                                />
                            </div>
                        </div>

                        {/* Price & Duration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price ($) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration (e.g., "3 Days 2 Nights")
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                        </div>

                        {/* Location & Flash Sale */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Flash Sale End Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="flashSaleEndTime"
                                    value={formData.flashSaleEndTime}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                        </div>

                        {/* Checkboxes */}
                        <div className="flex flex-wrap gap-6">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Featured Package
                                </span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="isFlashSale"
                                    checked={formData.isFlashSale}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Enable Flash Sale
                                </span>
                            </label>
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Package Images (Max 5)
                            </label>

                            {/* Existing images (already uploaded, removable) */}
                            {existingImages.length > 0 && (
                                <>
                                    <p className="text-xs text-gray-500 mb-2">Current images</p>
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        {existingImages.map((img) => (
                                            <div key={img.public_id} className="relative w-24 h-24">
                                                <img
                                                    src={img.url}
                                                    alt="Existing"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeExistingImage(img.public_id)
                                                    }
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                                >
                                                    <XIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />

                            {/* New images (not yet uploaded, removable) */}
                            {newPreviews.length > 0 && (
                                <>
                                    <p className="text-xs text-gray-500 mt-3 mb-2">
                                        New images to upload
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {newPreviews.map((src, index) => (
                                            <div key={index} className="relative w-24 h-24">
                                                <img
                                                    src={src}
                                                    alt={`New ${index + 1}`}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                                >
                                                    <XIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            <p className="text-xs text-gray-500 mt-2">
                                {existingImages.length + formData.images.length}/5 images selected
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
                                className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading
                                    ? "Saving..."
                                    : initialData
                                      ? "Update Package"
                                      : "Create Package"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PackageFormModal;

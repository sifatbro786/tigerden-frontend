// src/components/dashboard/CouponFormModal.jsx
import { useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import toast from "react-hot-toast";

const CouponFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
    const [formData, setFormData] = useState({
        code: "",
        discountType: "percentage",
        value: "",
        expiryDate: "",
        usageLimit: "",
        isActive: true,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                code: initialData.code || "",
                discountType: initialData.discountType || "percentage",
                value: initialData.value || "",
                expiryDate: initialData.expiryDate?.split("T")[0] || "",
                usageLimit: initialData.usageLimit || "",
                isActive: initialData.isActive !== undefined ? initialData.isActive : true,
            });
        } else {
            setFormData({
                code: "",
                discountType: "percentage",
                value: "",
                expiryDate: "",
                usageLimit: "",
                isActive: true,
            });
        }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.code) {
            toast.error("Coupon code is required");
            return;
        }
        if (!formData.value || formData.value <= 0) {
            toast.error("Valid discount value is required");
            return;
        }
        if (!formData.expiryDate) {
            toast.error("Expiry date is required");
            return;
        }
        if (!formData.usageLimit || formData.usageLimit < 1) {
            toast.error("Usage limit must be at least 1");
            return;
        }

        // Percentage validation
        if (formData.discountType === "percentage" && formData.value > 100) {
            toast.error("Percentage discount cannot exceed 100%");
            return;
        }

        onSubmit({
            ...formData,
            value: parseFloat(formData.value),
            usageLimit: parseInt(formData.usageLimit),
        });
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
                            {initialData ? "Edit Coupon" : "Create New Coupon"}
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
                                Coupon Code *
                            </label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleInputChange}
                                placeholder="e.g., SUMMER2024"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 uppercase"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Discount Type *
                            </label>
                            <select
                                name="discountType"
                                value={formData.discountType}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="flat">Flat Amount ($)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Discount Value *
                            </label>
                            <input
                                type="number"
                                name="value"
                                value={formData.value}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                                placeholder={
                                    formData.discountType === "percentage" ? "e.g., 20" : "e.g., 50"
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.discountType === "percentage"
                                    ? "Enter percentage (e.g., 20 for 20%)"
                                    : "Enter flat amount in USD (e.g., 50)"}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date *
                            </label>
                            <input
                                type="date"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Usage Limit *
                            </label>
                            <input
                                type="number"
                                name="usageLimit"
                                value={formData.usageLimit}
                                onChange={handleInputChange}
                                min="1"
                                placeholder="e.g., 100"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                required
                            />
                        </div>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
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
                                className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading
                                    ? "Saving..."
                                    : initialData
                                      ? "Update Coupon"
                                      : "Create Coupon"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CouponFormModal;

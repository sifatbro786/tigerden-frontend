// src/components/dashboard/TeamFormModal.jsx
import { useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import toast from "react-hot-toast";

const TeamFormModal = ({ isOpen, onClose, onSubmit, initialData, hasCEO, isLoading }) => {
    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        expertise: [],
        isCEO: false,
        ceoMessage: { en: "", bn: "" },
        order: 0,
        image: null,
    });

    const [expertiseInput, setExpertiseInput] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                designation: initialData.designation || "",
                expertise: initialData.expertise || [],
                isCEO: initialData.isCEO || false,
                ceoMessage: initialData.ceoMessage || { en: "", bn: "" },
                order: initialData.order || 0,
                image: null,
            });
            setPreviewImage(initialData.image?.url || null);
        } else {
            setFormData({
                name: "",
                designation: "",
                expertise: [],
                isCEO: false,
                ceoMessage: { en: "", bn: "" },
                order: 0,
                image: null,
            });
            setPreviewImage(null);
            setExpertiseInput("");
        }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("ceoMessage.")) {
            const [, lang] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                ceoMessage: { ...prev.ceoMessage, [lang]: value },
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

    const addExpertise = () => {
        if (expertiseInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                expertise: [...prev.expertise, expertiseInput.trim()],
            }));
            setExpertiseInput("");
        }
    };

    const removeExpertise = (index) => {
        setFormData((prev) => ({
            ...prev,
            expertise: prev.expertise.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error("Name is required");
            return;
        }
        if (!formData.designation) {
            toast.error("Designation is required");
            return;
        }
        if (!formData.image && !initialData) {
            toast.error("Please upload an image");
            return;
        }
        if (formData.isCEO && !formData.ceoMessage.en) {
            toast.error("CEO message is required in English");
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

                <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                        <h3 className="text-xl font-bold text-gray-900">
                            {initialData ? "Edit Team Member" : "Add Team Member"}
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Name & Designation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Designation *
                                </label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Expertise */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expertise (Skills)
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={expertiseInput}
                                    onChange={(e) => setExpertiseInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && addExpertise()}
                                    placeholder="e.g., Tour Guide"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={addExpertise}
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            {formData.expertise.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.expertise.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => removeExpertise(index)}
                                                className="hover:text-red-600"
                                            >
                                                <XIcon className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Profile Image *
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
                                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                    />
                                </div>
                            )}
                        </div>

                        {/* CEO Toggle */}
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="isCEO"
                                checked={formData.isCEO}
                                onChange={handleInputChange}
                                disabled={!formData.isCEO && hasCEO}
                                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                {formData.isCEO ? "This is the CEO/Founder" : "Set as CEO/Founder"}
                            </span>
                            {!formData.isCEO && hasCEO && (
                                <span className="text-xs text-amber-600">(CEO already exists)</span>
                            )}
                        </div>

                        {/* CEO Message */}
                        {formData.isCEO && (
                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                                <h4 className="font-medium text-amber-800 mb-3">CEO Message</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Message (English) *
                                        </label>
                                        <textarea
                                            name="ceoMessage.en"
                                            value={formData.ceoMessage.en}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Message (Bangla)
                                        </label>
                                        <textarea
                                            name="ceoMessage.bn"
                                            value={formData.ceoMessage.bn}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-bangla"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Display Order */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Display Order
                            </label>
                            <input
                                type="number"
                                name="order"
                                value={formData.order}
                                onChange={handleInputChange}
                                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
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
                                      ? "Update Member"
                                      : "Add Member"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TeamFormModal;

import { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import LocalizedInput from "../shared/LocalizedInput";
import LocalizedTextarea from "../shared/LocalizedTextarea";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const BasicInfoTab = ({ formData, setFormData, categories }) => {
    const [tagInput, setTagInput] = useState("");

    const update = (field, value) =>
        setFormData((p) => ({ ...p, [field]: value }));

    const updateLocalized = (field, lang, value) =>
        setFormData((p) => ({ ...p, [field]: { ...p[field], [lang]: value } }));

    const addTag = () => {
        const t = tagInput.trim();
        if (!t || formData.tags.includes(t)) return;
        update("tags", [...formData.tags, t]);
        setTagInput("");
    };

    const removeTag = (tag) =>
        update("tags", formData.tags.filter((t) => t !== tag));

    const toggleMonth = (month) => {
        const months = formData.idealMonths.includes(month)
            ? formData.idealMonths.filter((m) => m !== month)
            : [...formData.idealMonths, month];
        update("idealMonths", months);
    };

    return (
        <div className="space-y-6">
            {/* Package Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {["domestic", "international"].map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => update("packageType", type)}
                            className={`py-3 px-4 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
                                formData.packageType === type
                                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                        >
                            {type === "domestic" ? "🇧🇩 Domestic" : "✈️ International"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Title */}
            <LocalizedInput
                label="Package Title"
                required
                valueEn={formData.title.en}
                valueBn={formData.title.bn}
                onChangeEn={(v) => updateLocalized("title", "en", v)}
                onChangeBn={(v) => updateLocalized("title", "bn", v)}
                placeholderEn="e.g. Cox's Bazar Beach Escape"
                placeholderBn="যেমন: কক্সবাজার সমুদ্র সৈকত"
            />

            {/* Short Description */}
            <LocalizedTextarea
                label="Short Description"
                required
                rows={2}
                valueEn={formData.shortDescription.en}
                valueBn={formData.shortDescription.bn}
                onChangeEn={(v) => updateLocalized("shortDescription", "en", v)}
                onChangeBn={(v) => updateLocalized("shortDescription", "bn", v)}
            />

            {/* Full Description */}
            <LocalizedTextarea
                label="Full Description"
                required
                rows={5}
                valueEn={formData.description.en}
                valueBn={formData.description.bn}
                onChangeEn={(v) => updateLocalized("description", "en", v)}
                onChangeBn={(v) => updateLocalized("description", "bn", v)}
            />

            {/* Category + Duration */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.category}
                        onChange={(e) => update("category", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                        <option value="">Select category…</option>
                        {categories?.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name?.en}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Duration
                    </label>
                    <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => update("duration", e.target.value)}
                        placeholder="e.g. 4 Days / 3 Nights"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                </div>
            </div>

            {/* Location Hierarchy */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Hierarchy
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {["location", "region", "country", "city"].map((f) => (
                        <input
                            key={f}
                            type="text"
                            value={formData[f]}
                            onChange={(e) => update(f, e.target.value)}
                            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        placeholder="e.g. Beach, Family Friendly"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <button
                        type="button"
                        onClick={addTag}
                        className="px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                        <PlusIcon className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {formData.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                        >
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)}>
                                <XIcon className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Ideal Months */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Best Travel Months
                </label>
                <div className="flex flex-wrap gap-2">
                    {MONTHS.map((month) => (
                        <button
                            key={month}
                            type="button"
                            onClick={() => toggleMonth(month)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                formData.idealMonths.includes(month)
                                    ? "bg-emerald-500 text-white border-emerald-500"
                                    : "bg-white text-gray-600 border-gray-300 hover:border-emerald-300"
                            }`}
                        >
                            {month}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BasicInfoTab;
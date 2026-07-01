import { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";

const PricingTab = ({ formData, setFormData }) => {
    const [dateInput, setDateInput] = useState("");

    const update = (field, value) =>
        setFormData((p) => ({ ...p, [field]: value }));

    const isInternational = formData.packageType === "international";

    const addDate = () => {
        if (!dateInput || formData.availableDates.includes(dateInput)) return;
        update("availableDates", [...formData.availableDates, dateInput]);
        setDateInput("");
    };

    return (
        <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h4 className="text-sm font-semibold text-gray-700">💰 Pricing</h4>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">
                            Original Price <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={formData.originalPrice}
                            onChange={(e) => update("originalPrice", e.target.value)}
                            placeholder="0"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">
                            Discounted Price <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={formData.discountedPrice}
                            onChange={(e) => update("discountedPrice", e.target.value)}
                            placeholder="0"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">
                            Currency
                        </label>
                        <select
                            value={formData.currency}
                            onChange={(e) => update("currency", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                            {["BDT", "USD", "EUR", "SGD", "THB", "IDR"].map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {formData.originalPrice && formData.discountedPrice && (
                    <p className="text-xs text-emerald-600 font-medium">
                        Discount:{" "}
                        {Math.round(
                            ((formData.originalPrice - formData.discountedPrice) /
                                formData.originalPrice) *
                                100
                        )}
                        % off
                    </p>
                )}
            </div>

            {/* Group Size */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h4 className="text-sm font-semibold text-gray-700">👥 Group Size</h4>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">
                            Min. Size
                        </label>
                        <input
                            type="number"
                            value={formData.minGroupSize}
                            onChange={(e) => update("minGroupSize", e.target.value)}
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">
                            Max. Size
                        </label>
                        <input
                            type="number"
                            value={formData.maxGroupSize}
                            onChange={(e) => update("maxGroupSize", e.target.value)}
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div className="flex items-end pb-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.pricePerPerson}
                                onChange={(e) => update("pricePerPerson", e.target.checked)}
                                className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-gray-700">Price per person</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">🏷️ Badges</h4>
                <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => update("featured", e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700">⭐ Featured</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.isFlashSale}
                            onChange={(e) => update("isFlashSale", e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700">🔥 Flash Sale</span>
                    </label>
                </div>
                {formData.isFlashSale && (
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">
                            Flash Sale End Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            value={formData.flashSaleEndTime}
                            onChange={(e) => update("flashSaleEndTime", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                )}
            </div>

            {/* Available Dates */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">📅 Available Dates</h4>
                <div className="flex gap-2">
                    <input
                        type="date"
                        value={dateInput}
                        onChange={(e) => setDateInput(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <button
                        type="button"
                        onClick={addDate}
                        className="px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                        <PlusIcon className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.availableDates.map((date) => (
                        <span
                            key={date}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded-lg"
                        >
                            {date}
                            <button
                                type="button"
                                onClick={() =>
                                    update(
                                        "availableDates",
                                        formData.availableDates.filter((d) => d !== date)
                                    )
                                }
                            >
                                <XIcon className="w-3 h-3 text-gray-400 hover:text-red-500" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Visa Info — International only */}
            {isInternational && (
                <div className="bg-blue-50 rounded-xl p-4 space-y-3 border border-blue-100">
                    <h4 className="text-sm font-semibold text-blue-800">
                        🛂 Visa Requirements (International)
                    </h4>
                    <div className="flex flex-wrap gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.visaRequired}
                                onChange={(e) => update("visaRequired", e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Visa Required</span>
                        </label>
                        {formData.visaRequired && (
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.visaOnArrival}
                                    onChange={(e) => update("visaOnArrival", e.target.checked)}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">Visa on Arrival</span>
                            </label>
                        )}
                    </div>
                    {formData.visaRequired && (
                        <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">
                                Passport Validity
                            </label>
                            <input
                                type="text"
                                value={formData.passportValidity}
                                onChange={(e) => update("passportValidity", e.target.value)}
                                placeholder="e.g. 6 months minimum"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PricingTab;
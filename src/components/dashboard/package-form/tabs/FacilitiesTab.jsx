import { useState } from "react";
import { PlusIcon, TrashIcon } from "lucide-react";
import LocalizedInput from "../shared/LocalizedInput";

// Reusable localized item list (transportation, meals, guides)
const LocalizedItemList = ({ label, items, onAdd, onRemove }) => {
    const [en, setEn] = useState("");
    const [bn, setBn] = useState("");
    return (
        <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">{label}</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
                {items.map((item, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                    >
                        {item.en}
                        <button type="button" onClick={() => onRemove(i)}>
                            <TrashIcon className="w-3 h-3 text-red-400 hover:text-red-600" />
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={en}
                    onChange={(e) => setEn(e.target.value)}
                    placeholder="English"
                    className="flex-1 px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <input
                    type="text"
                    value={bn}
                    onChange={(e) => setBn(e.target.value)}
                    placeholder="বাংলা"
                    className="flex-1 px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                    type="button"
                    onClick={() => {
                        if (!en.trim()) return;
                        onAdd({ en: en.trim(), bn: bn.trim() || en.trim() });
                        setEn(""); setBn("");
                    }}
                    className="px-2 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-100"
                >
                    <PlusIcon className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};

// Single accommodation entry form
const AccommodationEntry = ({ entry, index, onChange, onRemove }) => {
    const update = (field, value) => onChange(index, { ...entry, [field]: value });
    const updateLocalized = (field, lang, value) =>
        onChange(index, { ...entry, [field]: { ...entry[field], [lang]: value } });

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
                <h5 className="text-sm font-semibold text-gray-700">
                    Hotel {index + 1}
                </h5>
                <button type="button" onClick={() => onRemove(index)}>
                    <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-600" />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <input
                    type="text"
                    value={entry.hotelName || ""}
                    onChange={(e) => update("hotelName", e.target.value)}
                    placeholder="Hotel name"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <input
                    type="text"
                    value={entry.location || ""}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="Location / City"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <input
                    type="text"
                    value={entry.nights || ""}
                    onChange={(e) => update("nights", e.target.value)}
                    placeholder="e.g. 2 Nights"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <select
                    value={entry.hotelRating || 3}
                    onChange={(e) => update("hotelRating", Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
                    ))}
                </select>
            </div>
            <LocalizedInput
                label="Room Type"
                valueEn={entry.roomType?.en || ""}
                valueBn={entry.roomType?.bn || ""}
                onChangeEn={(v) => updateLocalized("roomType", "en", v)}
                onChangeBn={(v) => updateLocalized("roomType", "bn", v)}
                placeholderEn="e.g. Deluxe Sea View"
                placeholderBn="যেমন: ডিলাক্স সি ভিউ"
            />
        </div>
    );
};

const FacilitiesTab = ({ formData, setFormData }) => {
    const update = (field, value) =>
        setFormData((p) => ({ ...p, [field]: value }));

    const updateFacility = (field, value) =>
        setFormData((p) => ({
            ...p,
            facilities: { ...p.facilities, [field]: value },
        }));

    const addAccommodation = () =>
        updateFacility("accommodation", [
            ...(formData.facilities?.accommodation || []),
            { hotelName: "", location: "", nights: "", hotelRating: 3, roomType: { en: "", bn: "" }, amenities: [] },
        ]);

    const updateAccommodation = (index, entry) => {
        const updated = [...(formData.facilities?.accommodation || [])];
        updated[index] = entry;
        updateFacility("accommodation", updated);
    };

    const removeAccommodation = (index) =>
        updateFacility(
            "accommodation",
            (formData.facilities?.accommodation || []).filter((_, i) => i !== index)
        );

    return (
        <div className="space-y-6">
            {/* Accommodation — array of hotels */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-700">🏨 Accommodation</h4>
                    <button
                        type="button"
                        onClick={addAccommodation}
                        className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 border border-emerald-200 rounded-lg px-2 py-1 hover:bg-emerald-50"
                    >
                        <PlusIcon className="w-3.5 h-3.5" /> Add Hotel
                    </button>
                </div>
                <div className="space-y-3">
                    {(formData.facilities?.accommodation || []).map((entry, i) => (
                        <AccommodationEntry
                            key={i}
                            entry={entry}
                            index={i}
                            onChange={updateAccommodation}
                            onRemove={removeAccommodation}
                        />
                    ))}
                    {(formData.facilities?.accommodation || []).length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4 bg-gray-50 rounded-xl">
                            No hotels added. Click "Add Hotel" to start.
                        </p>
                    )}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Transport, Meals, Guides */}
            <div className="grid grid-cols-1 gap-4">
                {[
                    { key: "transportation", label: "🚌 Transportation" },
                    { key: "meals", label: "🍽️ Meals" },
                    { key: "guides", label: "🧭 Guides" },
                ].map(({ key, label }) => (
                    <LocalizedItemList
                        key={key}
                        label={label}
                        items={formData.facilities?.[key] || []}
                        onAdd={(item) =>
                            updateFacility(key, [...(formData.facilities?.[key] || []), item])
                        }
                        onRemove={(i) =>
                            updateFacility(
                                key,
                                (formData.facilities?.[key] || []).filter((_, idx) => idx !== i)
                            )
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default FacilitiesTab;
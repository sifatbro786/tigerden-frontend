import { useState } from "react";
import { PlusIcon, TrashIcon } from "lucide-react";
import LocalizedInput from "../shared/LocalizedInput";

const LocationContactTab = ({ formData, setFormData }) => {
    const [attractionDraft, setAttractionDraft] = useState({
        name: "", distance: "", duration: "", description: { en: "", bn: "" },
    });

    const update = (field, value) =>
        setFormData((p) => ({ ...p, [field]: value }));

    const updateNested = (parent, field, value) =>
        setFormData((p) => ({ ...p, [parent]: { ...p[parent], [field]: value } }));

    const updateDeep = (parent, child, field, value) =>
        setFormData((p) => ({
            ...p,
            [parent]: { ...p[parent], [child]: { ...p[parent][child], [field]: value } },
        }));

    const updateTip = (field, value) => updateNested("travelTips", field, value);
    const updateTipLocalized = (field, lang, value) =>
        setFormData((p) => ({
            ...p,
            travelTips: {
                ...p.travelTips,
                [field]: { ...p.travelTips?.[field], [lang]: value },
            },
        }));

    const addAttraction = () => {
        if (!attractionDraft.name.trim()) return;
        update("nearbyAttractions", [...formData.nearbyAttractions, attractionDraft]);
        setAttractionDraft({ name: "", distance: "", duration: "", description: { en: "", bn: "" } });
    };

    return (
        <div className="space-y-8">
            {/* Nearby Attractions */}
            <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">📍 Nearby Attractions</h4>
                {formData.nearbyAttractions.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 mb-2">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{a.name}</p>
                            <p className="text-xs text-gray-500">{a.distance} · {a.duration}</p>
                            {a.description?.en && (
                                <p className="text-xs text-gray-500 mt-0.5">{a.description.en}</p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => update("nearbyAttractions", formData.nearbyAttractions.filter((_, idx) => idx !== i))}
                        >
                            <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-600" />
                        </button>
                    </div>
                ))}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                        {["name", "distance", "duration"].map((f) => (
                            <input
                                key={f}
                                type="text"
                                value={attractionDraft[f]}
                                onChange={(e) => setAttractionDraft((p) => ({ ...p, [f]: e.target.value }))}
                                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        ))}
                    </div>
                    <LocalizedInput
                        label="Description"
                        valueEn={attractionDraft.description.en}
                        valueBn={attractionDraft.description.bn}
                        onChangeEn={(v) => setAttractionDraft((p) => ({ ...p, description: { ...p.description, en: v } }))}
                        onChangeBn={(v) => setAttractionDraft((p) => ({ ...p, description: { ...p.description, bn: v } }))}
                    />
                    <button
                        type="button"
                        onClick={addAttraction}
                        disabled={!attractionDraft.name.trim()}
                        className="w-full py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        Add Attraction
                    </button>
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Location Map */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">🗺️ Location Map</h4>
                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="number"
                        value={formData.locationMap?.coordinates?.lat || ""}
                        onChange={(e) =>
                            setFormData((p) => ({
                                ...p,
                                locationMap: {
                                    ...p.locationMap,
                                    coordinates: { ...p.locationMap?.coordinates, lat: e.target.value },
                                },
                            }))
                        }
                        placeholder="Latitude"
                        step="any"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <input
                        type="number"
                        value={formData.locationMap?.coordinates?.lng || ""}
                        onChange={(e) =>
                            setFormData((p) => ({
                                ...p,
                                locationMap: {
                                    ...p.locationMap,
                                    coordinates: { ...p.locationMap?.coordinates, lng: e.target.value },
                                },
                            }))
                        }
                        placeholder="Longitude"
                        step="any"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                </div>
                <input
                    type="url"
                    value={formData.locationMap?.mapEmbedUrl || ""}
                    onChange={(e) =>
                        setFormData((p) => ({
                            ...p,
                            locationMap: { ...p.locationMap, mapEmbedUrl: e.target.value },
                        }))
                    }
                    placeholder="Google Maps Embed URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
            </div>

            <hr className="border-gray-200" />

            {/* Travel Tips */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">💡 Travel Tips</h4>
                <LocalizedInput
                    label="Best Time"
                    valueEn={formData.travelTips?.bestTime?.en || ""}
                    valueBn={formData.travelTips?.bestTime?.bn || ""}
                    onChangeEn={(v) => updateTipLocalized("bestTime", "en", v)}
                    onChangeBn={(v) => updateTipLocalized("bestTime", "bn", v)}
                />
                <LocalizedInput
                    label="Weather"
                    valueEn={formData.travelTips?.weather?.en || ""}
                    valueBn={formData.travelTips?.weather?.bn || ""}
                    onChangeEn={(v) => updateTipLocalized("weather", "en", v)}
                    onChangeBn={(v) => updateTipLocalized("weather", "bn", v)}
                />
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Currency</label>
                        <input
                            type="text"
                            value={formData.travelTips?.currency || ""}
                            onChange={(e) => updateTip("currency", e.target.value)}
                            placeholder="e.g. Indonesian Rupiah (IDR)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Language</label>
                        <input
                            type="text"
                            value={formData.travelTips?.language || ""}
                            onChange={(e) => updateTip("language", e.target.value)}
                            placeholder="e.g. Bahasa Indonesia"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                </div>
                <LocalizedInput
                    label="Health"
                    valueEn={formData.travelTips?.health?.en || ""}
                    valueBn={formData.travelTips?.health?.bn || ""}
                    onChangeEn={(v) => updateTipLocalized("health", "en", v)}
                    onChangeBn={(v) => updateTipLocalized("health", "bn", v)}
                />
                <LocalizedInput
                    label="Cultural Notes"
                    valueEn={formData.travelTips?.cultural?.en || ""}
                    valueBn={formData.travelTips?.cultural?.bn || ""}
                    onChangeEn={(v) => updateTipLocalized("cultural", "en", v)}
                    onChangeBn={(v) => updateTipLocalized("cultural", "bn", v)}
                />
            </div>

            <hr className="border-gray-200" />

            {/* Point of Contact */}
            <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700">📞 Point of Contact</h4>
                {[
                    { key: "tourManager", label: "Tour Manager", fields: ["name", "phone", "email", "whatsapp"] },
                    { key: "emergencyContact", label: "Emergency Contact", fields: ["name", "phone"] },
                ].map(({ key, label, fields }) => (
                    <div key={key} className="bg-gray-50 rounded-xl p-4 space-y-2">
                        <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</h5>
                        <div className="grid grid-cols-2 gap-2">
                            {fields.map((f) => (
                                <input
                                    key={f}
                                    type="text"
                                    value={formData.pointOfContact?.[key]?.[f] || ""}
                                    onChange={(e) =>
                                        setFormData((p) => ({
                                            ...p,
                                            pointOfContact: {
                                                ...p.pointOfContact,
                                                [key]: { ...p.pointOfContact?.[key], [f]: e.target.value },
                                            },
                                        }))
                                    }
                                    placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                                />
                            ))}
                        </div>
                    </div>
                ))}

                {/* Office */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Office</h5>
                    <div className="grid grid-cols-2 gap-2">
                        {["address", "phone", "email"].map((f) => (
                            <input
                                key={f}
                                type="text"
                                value={formData.pointOfContact?.office?.[f] || ""}
                                onChange={(e) =>
                                    setFormData((p) => ({
                                        ...p,
                                        pointOfContact: {
                                            ...p.pointOfContact,
                                            office: { ...p.pointOfContact?.office, [f]: e.target.value },
                                        },
                                    }))
                                }
                                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        ))}
                    </div>
                </div>

                {/* Embassy (international only) */}
                {formData.packageType === "international" && (
                    <div className="bg-blue-50 rounded-xl p-4 space-y-2 border border-blue-100">
                        <h5 className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Embassy Contact</h5>
                        <div className="grid grid-cols-2 gap-2">
                            {["country", "phone", "address"].map((f) => (
                                <input
                                    key={f}
                                    type="text"
                                    value={formData.pointOfContact?.embassyContact?.[f] || ""}
                                    onChange={(e) =>
                                        setFormData((p) => ({
                                            ...p,
                                            pointOfContact: {
                                                ...p.pointOfContact,
                                                embassyContact: { ...p.pointOfContact?.embassyContact, [f]: e.target.value },
                                            },
                                        }))
                                    }
                                    placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                                    className="px-3 py-2 border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationContactTab;
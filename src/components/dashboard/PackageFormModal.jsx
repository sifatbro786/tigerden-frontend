import { useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

import BasicInfoTab from "./package-form/tabs/BasicInfoTab";
import PricingTab from "./package-form/tabs/PricingTab";
import MediaTab from "./package-form/tabs/MediaTab";
import ItineraryTab from "./package-form/tabs/ItineraryTab";
import ContentTab from "./package-form/tabs/ContentTab";
import FacilitiesTab from "./package-form/tabs/FacilitiesTab";
import LocationContactTab from "./package-form/tabs/LocationContactTab";

const TABS = [
    { id: "basic", label: "Basic" },
    { id: "pricing", label: "Pricing" },
    { id: "media", label: "Media" },
    { id: "itinerary", label: "Itinerary" },
    { id: "content", label: "Content" },
    { id: "facilities", label: "Facilities" },
    { id: "location", label: "Location" },
];

const DEFAULT_FORM = {
    packageType: "domestic",
    title: { en: "", bn: "" },
    shortDescription: { en: "", bn: "" },
    description: { en: "", bn: "" },
    category: "",
    duration: "",
    location: "",
    region: "",
    country: "",
    city: "",
    idealMonths: [],
    tags: [],
    originalPrice: "",
    discountedPrice: "",
    currency: "BDT",
    pricePerPerson: true,
    minGroupSize: 2,
    maxGroupSize: 20,
    availableDates: [],
    coverVideo: "",
    featured: false,
    isFlashSale: false,
    flashSaleEndTime: "",
    visaRequired: false,
    visaOnArrival: false,
    passportValidity: "",
    itinerary: [],
    inclusions: [],
    exclusions: [],
    importantNotes: {
        clothing: { en: "", bn: "" },
        health: { en: "", bn: "" },
        cultural: { en: "", bn: "" },
        connectivity: { en: "", bn: "" },
    },
    cancellationPolicy: {},
    facilities: { accommodation: [], transportation: [], meals: [], guides: [] },
    nearbyAttractions: [],
    pointOfContact: {
        tourManager: { name: "", phone: "", email: "", whatsapp: "", languages: [] },
        emergencyContact: { name: "", phone: "", availableHours: "" },
        office: { address: "", phone: "", email: "" },
        embassyContact: { country: "", phone: "", address: "" },
    },
    locationMap: { coordinates: { lat: "", lng: "" }, mapEmbedUrl: "" },
    travelTips: {
        bestTime: { en: "", bn: "" },
        weather: { en: "", bn: "" },
        currency: "",
        language: "",
        packing: [],
        health: { en: "", bn: "" },
        cultural: { en: "", bn: "" },
        connectivity: { en: "", bn: "" },
    },
    faqs: [],
};

const PackageFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
    const [activeTab, setActiveTab] = useState("basic");
    const [formData, setFormData] = useState(DEFAULT_FORM);

    // ── Image state (separate from form data) ──────────────────────────────
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [coverImagePreview, setCoverImagePreview] = useState("");
    const [existingCoverImage, setExistingCoverImage] = useState(null);

    const [galleryFiles, setGalleryFiles] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [existingGallery, setExistingGallery] = useState([]);

    // ── Fetch categories ───────────────────────────────────────────────────
    const { data: categoriesData } = useQuery({
        queryKey: ["categories-all"],
        queryFn: async () => {
            const { data } = await api.get("/admin/categories?includeInactive=true");
            return data;
        },
        enabled: isOpen,
    });
    const categories = categoriesData?.data || [];

    // ── Populate on edit / reset on create ────────────────────────────────
    useEffect(() => {
        if (!isOpen) return;
        setActiveTab("basic");

        if (initialData) {
            setFormData({
                ...DEFAULT_FORM,
                ...initialData,
                category: initialData.category?._id || initialData.category || "",
                flashSaleEndTime: initialData.flashSaleEndTime
                    ? new Date(initialData.flashSaleEndTime).toISOString().slice(0, 16)
                    : "",
                cancellationPolicy: initialData.cancellationPolicy
                    ? Object.fromEntries(initialData.cancellationPolicy)  // Map → plain object
                    : {},
            });
            setExistingCoverImage(initialData.coverImage || null);
            setCoverImageFile(null);
            setCoverImagePreview("");
            setExistingGallery(initialData.gallery || []);
            setGalleryFiles([]);
            setGalleryPreviews([]);
        } else {
            setFormData(DEFAULT_FORM);
            setExistingCoverImage(null);
            setCoverImageFile(null);
            setCoverImagePreview("");
            setExistingGallery([]);
            setGalleryFiles([]);
            setGalleryPreviews([]);
        }
    }, [initialData, isOpen]);

    // ── Cover image handlers ───────────────────────────────────────────────
    const handleCoverImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCoverImageFile(file);
        setCoverImagePreview(URL.createObjectURL(file));
    };
    const handleRemoveCoverImage = () => {
        setCoverImageFile(null);
        setCoverImagePreview("");
        setExistingCoverImage(null);
    };

    // ── Gallery handlers ──────────────────────────────────────────────────
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        const total = existingGallery.length + galleryFiles.length + files.length;
        if (total > 8) { toast.error("Maximum 8 gallery images allowed"); return; }
        setGalleryFiles((p) => [...p, ...files]);
        setGalleryPreviews((p) => [...p, ...files.map((f) => URL.createObjectURL(f))]);
    };
    const handleRemoveExistingGallery = (publicId) =>
        setExistingGallery((p) => p.filter((img) => img.public_id !== publicId));
    const handleRemoveNewGallery = (index) => {
        setGalleryFiles((p) => p.filter((_, i) => i !== index));
        setGalleryPreviews((p) => p.filter((_, i) => i !== index));
    };

    // ── Submit ────────────────────────────────────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.packageType) { toast.error("Select a package type"); setActiveTab("basic"); return; }
        if (!formData.title.en || !formData.title.bn) { toast.error("Title (en/bn) is required"); setActiveTab("basic"); return; }
        if (!formData.shortDescription.en || !formData.shortDescription.bn) { toast.error("Short description (en/bn) is required"); setActiveTab("basic"); return; }
        if (!formData.description.en || !formData.description.bn) { toast.error("Description (en/bn) is required"); setActiveTab("basic"); return; }
        if (!formData.category) { toast.error("Select a category"); setActiveTab("basic"); return; }
        if (!formData.originalPrice || !formData.discountedPrice) { toast.error("Prices are required"); setActiveTab("pricing"); return; }
        if (Number(formData.discountedPrice) > Number(formData.originalPrice)) {
            toast.error("Discounted price cannot exceed original price");
            setActiveTab("pricing");
            return;
        }

        const submitData = {
            ...formData,
            // Send Files
            ...(coverImageFile ? { coverImage: coverImageFile } : {}),
            ...(galleryFiles.length > 0 ? { gallery: galleryFiles } : {}),
            // Tell backend which existing gallery images to keep
            ...(initialData ? { keepGallery: existingGallery.map((img) => img.public_id) } : {}),
        };

        onSubmit(submitData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {initialData ? "Edit Package" : "Create New Package"}
                        </h2>
                        {initialData && (
                            <p className="text-xs text-gray-500 mt-0.5">{initialData.title?.en}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200 flex-shrink-0 overflow-x-auto">
                    <div className="flex px-6 gap-1 min-w-max">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? "border-emerald-500 text-emerald-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Body */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col flex-1 overflow-hidden"
                >
                    <div className="flex-1 overflow-y-auto px-6 py-5">
                        {activeTab === "basic" && (
                            <BasicInfoTab
                                formData={formData}
                                setFormData={setFormData}
                                categories={categories}
                            />
                        )}
                        {activeTab === "pricing" && (
                            <PricingTab formData={formData} setFormData={setFormData} />
                        )}
                        {activeTab === "media" && (
                            <MediaTab
                                formData={formData}
                                setFormData={setFormData}
                                coverImageFile={coverImageFile}
                                coverImagePreview={coverImagePreview}
                                existingCoverImage={existingCoverImage}
                                galleryFiles={galleryFiles}
                                galleryPreviews={galleryPreviews}
                                existingGallery={existingGallery}
                                onCoverImageChange={handleCoverImageChange}
                                onRemoveCoverImage={handleRemoveCoverImage}
                                onGalleryChange={handleGalleryChange}
                                onRemoveExistingGallery={handleRemoveExistingGallery}
                                onRemoveNewGallery={handleRemoveNewGallery}
                            />
                        )}
                        {activeTab === "itinerary" && (
                            <ItineraryTab formData={formData} setFormData={setFormData} />
                        )}
                        {activeTab === "content" && (
                            <ContentTab formData={formData} setFormData={setFormData} />
                        )}
                        {activeTab === "facilities" && (
                            <FacilitiesTab formData={formData} setFormData={setFormData} />
                        )}
                        {activeTab === "location" && (
                            <LocationContactTab formData={formData} setFormData={setFormData} />
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50 rounded-b-2xl">
                        <div className="flex gap-1">
                            {TABS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        TABS[i].id === activeTab
                                            ? "bg-emerald-500"
                                            : "bg-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isLoading && (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                )}
                                {isLoading ? "Saving…" : initialData ? "Update Package" : "Create Package"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PackageFormModal;
// src/components/dashboard/PackageFormModal.jsx
import { useState, useEffect } from "react";
import { XIcon, PlusIcon, TrashIcon, GripVerticalIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PackageFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
    const [activeTab, setActiveTab] = useState("basic");
    const [formData, setFormData] = useState({
        // Basic Info
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
        originalPrice: "",
        discountedPrice: "",
        currency: "BDT",
        
        // Features
        featured: false,
        isFlashSale: false,
        flashSaleEndTime: "",
        
        // Deep Content
        itinerary: [],
        inclusions: [],
        exclusions: [],
        importantNotes: {
            clothing: { en: "", bn: "" },
            health: { en: "", bn: "" },
            cultural: { en: "", bn: "" },
            connectivity: { en: "", bn: "" }
        },
        facilities: {
            accommodation: {
                hotelName: "",
                hotelRating: 3,
                roomType: { en: "", bn: "" },
                amenities: []
            },
            transportation: [],
            meals: [],
            guides: []
        },
        nearbyAttractions: [],
        pointOfContact: {
            tourManager: {
                name: "",
                phone: "",
                email: "",
                whatsapp: ""
            },
            emergencyContact: {
                name: "",
                phone: ""
            }
        },
        locationMap: {
            coordinates: { lat: "", lng: "" },
            mapEmbedUrl: ""
        },
        travelTips: {
            bestTime: { en: "", bn: "" },
            packing: [],
            health: { en: "", bn: "" },
            cultural: { en: "", bn: "" }
        },
        faqs: [],
        availableDates: [],
        images: [],
    });

    const [existingImages, setExistingImages] = useState([]);
    const [newPreviews, setNewPreviews] = useState([]);
    const [newItineraryDay, setNewItineraryDay] = useState({ day: "", title: { en: "", bn: "" }, activities: [] });
    const [newActivity, setNewActivity] = useState("");
    const [newAmenity, setNewAmenity] = useState("");
    const [newTransport, setNewTransport] = useState("");
    const [newMeal, setNewMeal] = useState("");
    const [newGuide, setNewGuide] = useState("");
    const [newAttraction, setNewAttraction] = useState({ name: "", distance: "", duration: "", description: { en: "", bn: "" } });
    const [newFaq, setNewFaq] = useState({ question: { en: "", bn: "" }, answer: { en: "", bn: "" } });
    const [newDate, setNewDate] = useState("");

    // Fetch categories
    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await api.get("/admin/categories?includeInactive=true");
            return data;
        },
        enabled: isOpen,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || { en: "", bn: "" },
                shortDescription: initialData.shortDescription || { en: "", bn: "" },
                description: initialData.description || { en: "", bn: "" },
                category: initialData.category?._id || initialData.category || "",
                duration: initialData.duration || "",
                location: initialData.location || "",
                region: initialData.region || "",
                country: initialData.country || "",
                city: initialData.city || "",
                idealMonths: initialData.idealMonths || [],
                originalPrice: initialData.originalPrice || "",
                discountedPrice: initialData.discountedPrice || "",
                currency: initialData.currency || "BDT",
                featured: initialData.featured || false,
                isFlashSale: initialData.isFlashSale || false,
                flashSaleEndTime: initialData.flashSaleEndTime?.split("T")[0] || "",
                itinerary: initialData.itinerary || [],
                inclusions: initialData.inclusions || [],
                exclusions: initialData.exclusions || [],
                importantNotes: initialData.importantNotes || {
                    clothing: { en: "", bn: "" },
                    health: { en: "", bn: "" },
                    cultural: { en: "", bn: "" },
                    connectivity: { en: "", bn: "" }
                },
                facilities: initialData.facilities || {
                    accommodation: {
                        hotelName: "",
                        hotelRating: 3,
                        roomType: { en: "", bn: "" },
                        amenities: []
                    },
                    transportation: [],
                    meals: [],
                    guides: []
                },
                nearbyAttractions: initialData.nearbyAttractions || [],
                pointOfContact: initialData.pointOfContact || {
                    tourManager: { name: "", phone: "", email: "", whatsapp: "" },
                    emergencyContact: { name: "", phone: "" }
                },
                locationMap: initialData.locationMap || {
                    coordinates: { lat: "", lng: "" },
                    mapEmbedUrl: ""
                },
                travelTips: initialData.travelTips || {
                    bestTime: { en: "", bn: "" },
                    packing: [],
                    health: { en: "", bn: "" },
                    cultural: { en: "", bn: "" }
                },
                faqs: initialData.faqs || [],
                availableDates: initialData.availableDates || [],
                images: [],
            });
            setExistingImages(initialData.images || []);
            setNewPreviews([]);
        } else {
            setFormData({
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
                originalPrice: "",
                discountedPrice: "",
                currency: "BDT",
                featured: false,
                isFlashSale: false,
                flashSaleEndTime: "",
                itinerary: [],
                inclusions: [],
                exclusions: [],
                importantNotes: {
                    clothing: { en: "", bn: "" },
                    health: { en: "", bn: "" },
                    cultural: { en: "", bn: "" },
                    connectivity: { en: "", bn: "" }
                },
                facilities: {
                    accommodation: {
                        hotelName: "",
                        hotelRating: 3,
                        roomType: { en: "", bn: "" },
                        amenities: []
                    },
                    transportation: [],
                    meals: [],
                    guides: []
                },
                nearbyAttractions: [],
                pointOfContact: {
                    tourManager: { name: "", phone: "", email: "", whatsapp: "" },
                    emergencyContact: { name: "", phone: "" }
                },
                locationMap: {
                    coordinates: { lat: "", lng: "" },
                    mapEmbedUrl: ""
                },
                travelTips: {
                    bestTime: { en: "", bn: "" },
                    packing: [],
                    health: { en: "", bn: "" },
                    cultural: { en: "", bn: "" }
                },
                faqs: [],
                availableDates: [],
                images: [],
            });
            setExistingImages([]);
            setNewPreviews([]);
        }
        setActiveTab("basic");
    }, [initialData, isOpen]);

    // ===== HANDLERS =====
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Handle nested localized fields (title.en, title.bn, etc.)
        if (name.includes(".")) {
            const parts = name.split(".");
            if (parts.length === 2) {
                const [field, lang] = parts;
                setFormData((prev) => ({
                    ...prev,
                    [field]: { ...prev[field], [lang]: value }
                }));
            } else if (parts.length === 3) {
                // Deep nested like importantNotes.clothing.en
                const [parent, child, lang] = parts;
                setFormData((prev) => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: { ...prev[parent]?.[child], [lang]: value }
                    }
                }));
            } else if (parts.length === 4) {
                // Deep nested like facilities.accommodation.roomType.en
                const [parent, child, grandchild, lang] = parts;
                setFormData((prev) => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: {
                            ...prev[parent]?.[child],
                            [grandchild]: { ...prev[parent]?.[child]?.[grandchild], [lang]: value }
                        }
                    }
                }));
            }
        } else if (name === "idealMonths") {
            const selected = Array.from(e.target.selectedOptions, (option) => option.value);
            setFormData((prev) => ({ ...prev, idealMonths: selected }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    // ===== IMAGE HANDLERS =====
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = existingImages.length + formData.images.length + files.length;
        if (totalImages > 5) {
            toast.error("Maximum 5 images allowed");
            return;
        }
        setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
        setNewPreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
    };

    const removeExistingImage = (publicId) => {
        setExistingImages((prev) => prev.filter((img) => img.public_id !== publicId));
    };

    const removeNewImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
        setNewPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    // ===== ITINERARY HANDLERS =====
    const addItineraryDay = () => {
        if (!newItineraryDay.day || !newItineraryDay.title.en || !newItineraryDay.title.bn) {
            toast.error("Day number and title are required");
            return;
        }
        setFormData((prev) => ({
            ...prev,
            itinerary: [...prev.itinerary, {
                day: parseInt(newItineraryDay.day),
                title: newItineraryDay.title,
                activities: newItineraryDay.activities
            }]
        }));
        setNewItineraryDay({ day: "", title: { en: "", bn: "" }, activities: [] });
    };

    const removeItineraryDay = (index) => {
        setFormData((prev) => ({
            ...prev,
            itinerary: prev.itinerary.filter((_, i) => i !== index)
        }));
    };

    const addActivityToDay = () => {
        if (!newActivity) return;
        setNewItineraryDay((prev) => ({
            ...prev,
            activities: [...prev.activities, newActivity]
        }));
        setNewActivity("");
    };

    const removeActivityFromDay = (index) => {
        setNewItineraryDay((prev) => ({
            ...prev,
            activities: prev.activities.filter((_, i) => i !== index)
        }));
    };

    // ===== INCLUSIONS/EXCLUSIONS =====
    const addInclusion = () => {
        const val = prompt("Enter inclusion (English):");
        if (val) {
            const bn = prompt("Enter inclusion (Bangla):");
            setFormData((prev) => ({
                ...prev,
                inclusions: [...prev.inclusions, { en: val, bn: bn || val }]
            }));
        }
    };

    const removeInclusion = (index) => {
        setFormData((prev) => ({
            ...prev,
            inclusions: prev.inclusions.filter((_, i) => i !== index)
        }));
    };

    const addExclusion = () => {
        const val = prompt("Enter exclusion (English):");
        if (val) {
            const bn = prompt("Enter exclusion (Bangla):");
            setFormData((prev) => ({
                ...prev,
                exclusions: [...prev.exclusions, { en: val, bn: bn || val }]
            }));
        }
    };

    const removeExclusion = (index) => {
        setFormData((prev) => ({
            ...prev,
            exclusions: prev.exclusions.filter((_, i) => i !== index)
        }));
    };

    // ===== FACILITIES =====
    const addFacilityItem = (field, label) => {
        const val = prompt(`Enter ${label} (English):`);
        if (val) {
            const bn = prompt(`Enter ${label} (Bangla):`);
            setFormData((prev) => ({
                ...prev,
                facilities: {
                    ...prev.facilities,
                    [field]: [...prev.facilities[field], { en: val, bn: bn || val }]
                }
            }));
        }
    };

    const removeFacilityItem = (field, index) => {
        setFormData((prev) => ({
            ...prev,
            facilities: {
                ...prev.facilities,
                [field]: prev.facilities[field].filter((_, i) => i !== index)
            }
        }));
    };

    const addAmenity = () => {
        const val = prompt("Enter amenity (English):");
        if (val) {
            const bn = prompt("Enter amenity (Bangla):");
            setFormData((prev) => ({
                ...prev,
                facilities: {
                    ...prev.facilities,
                    accommodation: {
                        ...prev.facilities.accommodation,
                        amenities: [...prev.facilities.accommodation.amenities, { en: val, bn: bn || val }]
                    }
                }
            }));
        }
    };

    const removeAmenity = (index) => {
        setFormData((prev) => ({
            ...prev,
            facilities: {
                ...prev.facilities,
                accommodation: {
                    ...prev.facilities.accommodation,
                    amenities: prev.facilities.accommodation.amenities.filter((_, i) => i !== index)
                }
            }
        }));
    };

    // ===== ATTRACTIONS =====
    const addAttraction = () => {
        if (!newAttraction.name) {
            toast.error("Attraction name is required");
            return;
        }
        setFormData((prev) => ({
            ...prev,
            nearbyAttractions: [...prev.nearbyAttractions, newAttraction]
        }));
        setNewAttraction({ name: "", distance: "", duration: "", description: { en: "", bn: "" } });
    };

    const removeAttraction = (index) => {
        setFormData((prev) => ({
            ...prev,
            nearbyAttractions: prev.nearbyAttractions.filter((_, i) => i !== index)
        }));
    };

    // ===== FAQS =====
    const addFaq = () => {
        if (!newFaq.question.en || !newFaq.question.bn || !newFaq.answer.en || !newFaq.answer.bn) {
            toast.error("Both question and answer are required in both languages");
            return;
        }
        setFormData((prev) => ({
            ...prev,
            faqs: [...prev.faqs, newFaq]
        }));
        setNewFaq({ question: { en: "", bn: "" }, answer: { en: "", bn: "" } });
    };

    const removeFaq = (index) => {
        setFormData((prev) => ({
            ...prev,
            faqs: prev.faqs.filter((_, i) => i !== index)
        }));
    };

    // ===== TRAVEL TIPS =====
    const addPackingTip = () => {
        const val = prompt("Enter packing tip (English):");
        if (val) {
            const bn = prompt("Enter packing tip (Bangla):");
            setFormData((prev) => ({
                ...prev,
                travelTips: {
                    ...prev.travelTips,
                    packing: [...prev.travelTips.packing, { en: val, bn: bn || val }]
                }
            }));
        }
    };

    const removePackingTip = (index) => {
        setFormData((prev) => ({
            ...prev,
            travelTips: {
                ...prev.travelTips,
                packing: prev.travelTips.packing.filter((_, i) => i !== index)
            }
        }));
    };

    // ===== AVAILABLE DATES =====
    const addAvailableDate = () => {
        if (!newDate) {
            toast.error("Please select a date");
            return;
        }
        setFormData((prev) => ({
            ...prev,
            availableDates: [...prev.availableDates, newDate]
        }));
        setNewDate("");
    };

    const removeAvailableDate = (index) => {
        setFormData((prev) => ({
            ...prev,
            availableDates: prev.availableDates.filter((_, i) => i !== index)
        }));
    };

    // ===== SUBMIT =====
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validations
        if (!formData.title.en || !formData.title.bn) {
            toast.error("Both English and Bangla titles are required");
            return;
        }
        if (!formData.shortDescription.en || !formData.shortDescription.bn) {
            toast.error("Both English and Bangla short descriptions are required");
            return;
        }
        if (!formData.description.en || !formData.description.bn) {
            toast.error("Both English and Bangla descriptions are required");
            return;
        }
        if (!formData.category) {
            toast.error("Please select a category");
            return;
        }
        if (!formData.originalPrice || parseFloat(formData.originalPrice) < 0) {
            toast.error("Valid original price is required");
            return;
        }
        if (!formData.discountedPrice || parseFloat(formData.discountedPrice) < 0) {
            toast.error("Valid discounted price is required");
            return;
        }
        if (parseFloat(formData.discountedPrice) > parseFloat(formData.originalPrice)) {
            toast.error("Discounted price cannot exceed original price");
            return;
        }
        if (existingImages.length + formData.images.length === 0) {
            toast.error("At least one image is required");
            return;
        }

        const submitData = {
            ...formData,
            originalPrice: parseFloat(formData.originalPrice),
            discountedPrice: parseFloat(formData.discountedPrice),
        };

        if (initialData) {
            submitData.keepImages = existingImages.map((img) => img.public_id);
        }

        if (formData.images.length === 0) {
            delete submitData.images;
        }

        onSubmit(submitData);
    };

    if (!isOpen) return null;

    // ===== TABS =====
    const tabs = [
        { id: "basic", label: "Basic Info" },
        { id: "pricing", label: "Pricing & Location" },
        { id: "itinerary", label: "Itinerary" },
        { id: "content", label: "Content" },
        { id: "facilities", label: "Facilities" },
        { id: "attractions", label: "Attractions" },
        { id: "faqs", label: "FAQs" },
        { id: "media", label: "Media" },
    ];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
                <div
                    className="fixed inset-0 bg-black/60 bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />

                <div className="relative bg-white rounded-xl shadow-2xl max-w-6xl w-full h-[95vh] overflow-hidden">
                    {/* Header */}
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

                    {/* Tabs */}
                    <div className="sticky top-[73px] bg-gray-50 border-b border-gray-200 px-6 flex gap-1 overflow-x-auto z-10">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? "text-emerald-600 border-b-2 border-emerald-600 bg-white"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(95vh-140px)]">
                        {activeTab === "basic" && (
                            <div className="space-y-6">
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categoriesData?.data?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name.en} ({cat.name.bn})
                                            </option>
                                        ))}
                                    </select>
                                </div>

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
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Short Description */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Short Description (English) *
                                        </label>
                                        <input
                                            type="text"
                                            name="shortDescription.en"
                                            value={formData.shortDescription.en}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Short Description (Bangla) *
                                        </label>
                                        <input
                                            type="text"
                                            name="shortDescription.bn"
                                            value={formData.shortDescription.bn}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Full Description */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Description (English) *
                                        </label>
                                        <textarea
                                            name="description.en"
                                            value={formData.description.en}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Description (Bangla) *
                                        </label>
                                        <textarea
                                            name="description.bn"
                                            value={formData.description.bn}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Duration
                                    </label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 3 Days 2 Nights"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                    />
                                </div>

                                {/* Flash Sale & Featured */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name="featured"
                                            checked={formData.featured}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Featured Package</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name="isFlashSale"
                                            checked={formData.isFlashSale}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Flash Sale</span>
                                    </label>
                                    <div>
                                        <input
                                            type="datetime-local"
                                            name="flashSaleEndTime"
                                            value={formData.flashSaleEndTime}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            disabled={!formData.isFlashSale}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "pricing" && (
                            <div className="space-y-6">
                                {/* Prices */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Original Price ($) *
                                        </label>
                                        <input
                                            type="number"
                                            name="originalPrice"
                                            value={formData.originalPrice}
                                            onChange={handleInputChange}
                                            min="0"
                                            step="0.01"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Discounted Price ($) *
                                        </label>
                                        <input
                                            type="number"
                                            name="discountedPrice"
                                            value={formData.discountedPrice}
                                            onChange={handleInputChange}
                                            min="0"
                                            step="0.01"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Currency */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Currency
                                    </label>
                                    <input
                                        type="text"
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                    />
                                </div>

                                {/* Location Hierarchy */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Location (General)
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Cox's Bazar"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Region
                                        </label>
                                        <input
                                            type="text"
                                            name="region"
                                            value={formData.region}
                                            onChange={handleInputChange}
                                            placeholder="e.g., South Asia"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Bangladesh"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Cox's Bazar"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Ideal Months */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Best Months to Visit
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {MONTHS.map((month) => (
                                            <button
                                                key={month}
                                                type="button"
                                                onClick={() => {
                                                    const current = formData.idealMonths || [];
                                                    if (current.includes(month)) {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            idealMonths: current.filter((m) => m !== month)
                                                        }));
                                                    } else {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            idealMonths: [...current, month]
                                                        }));
                                                    }
                                                }}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                                    (formData.idealMonths || []).includes(month)
                                                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                            >
                                                {month}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formData.idealMonths?.length || 0} months selected
                                    </p>
                                </div>

                                {/* Available Dates */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Available Dates
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="date"
                                            value={newDate}
                                            onChange={(e) => setNewDate(e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={addAvailableDate}
                                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                        >
                                            <PlusIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.availableDates.map((date, index) => (
                                            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                                                {new Date(date).toLocaleDateString()}
                                                <button
                                                    type="button"
                                                    onClick={() => removeAvailableDate(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <XIcon className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "itinerary" && (
                            <div className="space-y-6">
                                {/* Add Itinerary Day */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-3">Add New Day</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <input
                                            type="number"
                                            placeholder="Day number"
                                            value={newItineraryDay.day}
                                            onChange={(e) => setNewItineraryDay({ ...newItineraryDay, day: e.target.value })}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Title (English)"
                                            value={newItineraryDay.title.en}
                                            onChange={(e) => setNewItineraryDay({
                                                ...newItineraryDay,
                                                title: { ...newItineraryDay.title, en: e.target.value }
                                            })}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Title (Bangla)"
                                            value={newItineraryDay.title.bn}
                                            onChange={(e) => setNewItineraryDay({
                                                ...newItineraryDay,
                                                title: { ...newItineraryDay.title, bn: e.target.value }
                                            })}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                    
                                    {/* Activities for the day */}
                                    <div className="mt-3">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Add activity..."
                                                value={newActivity}
                                                onChange={(e) => setNewActivity(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={addActivityToDay}
                                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {newItineraryDay.activities.map((activity, idx) => (
                                                <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                                                    {activity}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeActivityFromDay(idx)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <XIcon className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={addItineraryDay}
                                        className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                    >
                                        Add Day to Itinerary
                                    </button>
                                </div>

                                {/* Itinerary List */}
                                <div className="space-y-3">
                                    {formData.itinerary.map((day, index) => (
                                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        Day {day.day}: {day.title.en}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">{day.title.bn}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItineraryDay(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {day.activities.map((activity, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-sm">
                                                        {activity}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    {formData.itinerary.length === 0 && (
                                        <p className="text-gray-500 text-sm">No itinerary days added yet</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "content" && (
                            <div className="space-y-6">
                                {/* Important Notes */}
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">Important Notes</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {["clothing", "health", "cultural", "connectivity"].map((field) => (
                                            <div key={field} className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700 capitalize">
                                                    {field}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`importantNotes.${field}.en`}
                                                    value={formData.importantNotes[field]?.en || ""}
                                                    onChange={handleInputChange}
                                                    placeholder="English"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    name={`importantNotes.${field}.bn`}
                                                    value={formData.importantNotes[field]?.bn || ""}
                                                    onChange={handleInputChange}
                                                    placeholder="Bangla"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Travel Tips */}
                                <div className="border-t pt-4">
                                    <h4 className="font-medium text-gray-900 mb-3">Travel Tips</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {["bestTime", "health", "cultural"].map((field) => (
                                            <div key={field} className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700 capitalize">
                                                    {field.replace(/([A-Z])/g, ' $1')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`travelTips.${field}.en`}
                                                    value={formData.travelTips[field]?.en || ""}
                                                    onChange={handleInputChange}
                                                    placeholder="English"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    name={`travelTips.${field}.bn`}
                                                    value={formData.travelTips[field]?.bn || ""}
                                                    onChange={handleInputChange}
                                                    placeholder="Bangla"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Packing Tips</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder="Add packing tip..."
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        addPackingTip();
                                                    }
                                                }}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={addPackingTip}
                                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.travelTips.packing.map((tip, idx) => (
                                                <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                                                    {tip.en}
                                                    <button
                                                        type="button"
                                                        onClick={() => removePackingTip(idx)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <XIcon className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Inclusions & Exclusions */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Inclusions</h4>
                                        <button
                                            type="button"
                                            onClick={addInclusion}
                                            className="mb-2 px-3 py-1 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors"
                                        >
                                            <PlusIcon className="w-3 h-3 inline mr-1" /> Add Inclusion
                                        </button>
                                        <div className="space-y-1">
                                            {formData.inclusions.map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                                                    <span>{item.en}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeInclusion(idx)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <XIcon className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Exclusions</h4>
                                        <button
                                            type="button"
                                            onClick={addExclusion}
                                            className="mb-2 px-3 py-1 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors"
                                        >
                                            <PlusIcon className="w-3 h-3 inline mr-1" /> Add Exclusion
                                        </button>
                                        <div className="space-y-1">
                                            {formData.exclusions.map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                                                    <span>{item.en}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeExclusion(idx)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <XIcon className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "facilities" && (
                            <div className="space-y-6">
                                {/* Accommodation */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-3">Accommodation</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                                            <input
                                                type="text"
                                                name="facilities.accommodation.hotelName"
                                                value={formData.facilities.accommodation.hotelName}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                                            <input
                                                type="number"
                                                name="facilities.accommodation.hotelRating"
                                                value={formData.facilities.accommodation.hotelRating}
                                                onChange={handleInputChange}
                                                min="1"
                                                max="5"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Room Type (English)</label>
                                            <input
                                                type="text"
                                                name="facilities.accommodation.roomType.en"
                                                value={formData.facilities.accommodation.roomType?.en || ""}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Room Type (Bangla)</label>
                                            <input
                                                type="text"
                                                name="facilities.accommodation.roomType.bn"
                                                value={formData.facilities.accommodation.roomType?.bn || ""}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder="Add amenity..."
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        addAmenity();
                                                    }
                                                }}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={addAmenity}
                                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.facilities.accommodation.amenities.map((item, idx) => (
                                                <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                                                    {item.en}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeAmenity(idx)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <XIcon className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Transportation, Meals, Guides */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { field: "transportation", label: "Transportation" },
                                        { field: "meals", label: "Meals" },
                                        { field: "guides", label: "Guides" }
                                    ].map(({ field, label }) => (
                                        <div key={field} className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="font-medium text-gray-900 mb-2">{label}</h4>
                                            <button
                                                type="button"
                                                onClick={() => addFacilityItem(field, label)}
                                                className="mb-2 px-3 py-1 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors"
                                            >
                                                <PlusIcon className="w-3 h-3 inline mr-1" /> Add
                                            </button>
                                            <div className="space-y-1">
                                                {formData.facilities[field].map((item, idx) => (
                                                    <div key={idx} className="flex items-center justify-between bg-white px-3 py-2 rounded">
                                                        <span>{item.en}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFacilityItem(field, idx)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <XIcon className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Point of Contact */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-3">Point of Contact</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="font-medium text-sm text-gray-700 mb-2">Tour Manager</h5>
                                            <input
                                                type="text"
                                                name="pointOfContact.tourManager.name"
                                                value={formData.pointOfContact.tourManager.name}
                                                onChange={handleInputChange}
                                                placeholder="Name"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="pointOfContact.tourManager.phone"
                                                value={formData.pointOfContact.tourManager.phone}
                                                onChange={handleInputChange}
                                                placeholder="Phone"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none mb-2"
                                            />
                                            <input
                                                type="email"
                                                name="pointOfContact.tourManager.email"
                                                value={formData.pointOfContact.tourManager.email}
                                                onChange={handleInputChange}
                                                placeholder="Email"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="pointOfContact.tourManager.whatsapp"
                                                value={formData.pointOfContact.tourManager.whatsapp}
                                                onChange={handleInputChange}
                                                placeholder="WhatsApp"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-sm text-gray-700 mb-2">Emergency Contact</h5>
                                            <input
                                                type="text"
                                                name="pointOfContact.emergencyContact.name"
                                                value={formData.pointOfContact.emergencyContact.name}
                                                onChange={handleInputChange}
                                                placeholder="Name"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="pointOfContact.emergencyContact.phone"
                                                value={formData.pointOfContact.emergencyContact.phone}
                                                onChange={handleInputChange}
                                                placeholder="Phone"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Location Map */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-3">Location Map</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <input
                                            type="text"
                                            name="locationMap.coordinates.lat"
                                            value={formData.locationMap.coordinates.lat}
                                            onChange={handleInputChange}
                                            placeholder="Latitude"
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            name="locationMap.coordinates.lng"
                                            value={formData.locationMap.coordinates.lng}
                                            onChange={handleInputChange}
                                            placeholder="Longitude"
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            name="locationMap.mapEmbedUrl"
                                            value={formData.locationMap.mapEmbedUrl}
                                            onChange={handleInputChange}
                                            placeholder="Map Embed URL"
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "attractions" && (
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-3">Add Nearby Attraction</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Name *"
                                            value={newAttraction.name}
                                            onChange={(e) => setNewAttraction({ ...newAttraction, name: e.target.value })}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Distance"
                                            value={newAttraction.distance}
                                            onChange={(e) => setNewAttraction({ ...newAttraction, distance: e.target.value })}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Duration"
                                            value={newAttraction.duration}
                                            onChange={(e) => setNewAttraction({ ...newAttraction, duration: e.target.value })}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Description (English)"
                                            value={newAttraction.description.en}
                                            onChange={(e) => setNewAttraction({
                                                ...newAttraction,
                                                description: { ...newAttraction.description, en: e.target.value }
                                            })}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Description (Bangla)"
                                            value={newAttraction.description.bn}
                                            onChange={(e) => setNewAttraction({
                                                ...newAttraction,
                                                description: { ...newAttraction.description, bn: e.target.value }
                                            })}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addAttraction}
                                        className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                    >
                                        Add Attraction
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {formData.nearbyAttractions.map((attr, index) => (
                                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{attr.name}</h4>
                                                <div className="text-sm text-gray-500 space-x-2">
                                                    {attr.distance && <span>📍 {attr.distance}</span>}
                                                    {attr.duration && <span>⏱ {attr.duration}</span>}
                                                </div>
                                                {attr.description?.en && (
                                                    <p className="text-sm text-gray-600 mt-1">{attr.description.en}</p>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeAttraction(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {formData.nearbyAttractions.length === 0 && (
                                        <p className="text-gray-500 text-sm">No attractions added yet</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "faqs" && (
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-3">Add FAQ</h4>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                placeholder="Question (English) *"
                                                value={newFaq.question.en}
                                                onChange={(e) => setNewFaq({
                                                    ...newFaq,
                                                    question: { ...newFaq.question, en: e.target.value }
                                                })}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Question (Bangla) *"
                                                value={newFaq.question.bn}
                                                onChange={(e) => setNewFaq({
                                                    ...newFaq,
                                                    question: { ...newFaq.question, bn: e.target.value }
                                                })}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Answer (English) *"
                                                value={newFaq.answer.en}
                                                onChange={(e) => setNewFaq({
                                                    ...newFaq,
                                                    answer: { ...newFaq.answer, en: e.target.value }
                                                })}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Answer (Bangla) *"
                                                value={newFaq.answer.bn}
                                                onChange={(e) => setNewFaq({
                                                    ...newFaq,
                                                    answer: { ...newFaq.answer, bn: e.target.value }
                                                })}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addFaq}
                                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                        >
                                            Add FAQ
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {formData.faqs.map((faq, index) => (
                                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{faq.question.en}</h4>
                                                <p className="text-sm text-gray-500">{faq.question.bn}</p>
                                                <p className="text-sm text-gray-600 mt-1">{faq.answer.en}</p>
                                                <p className="text-sm text-gray-500">{faq.answer.bn}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFaq(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {formData.faqs.length === 0 && (
                                        <p className="text-gray-500 text-sm">No FAQs added yet</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "media" && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Package Images (Max 5) *
                                    </label>

                                    {existingImages.length > 0 && (
                                        <>
                                            <p className="text-xs text-gray-500 mb-2">Current images</p>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
                                                {existingImages.map((img) => (
                                                    <div key={img.public_id} className="relative group aspect-square">
                                                        <img
                                                            src={img.url}
                                                            alt="Existing"
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeExistingImage(img.public_id)}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                                        >
                                                            <XIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="w-full px-3 py-8 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none cursor-pointer hover:border-emerald-400 transition-colors"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="text-center">
                                                <PlusIcon className="w-8 h-8 text-gray-400 mx-auto" />
                                                <p className="text-sm text-gray-500 mt-1">Click to upload images</p>
                                                <p className="text-xs text-gray-400">PNG, JPG, WEBP (Max 5)</p>
                                            </div>
                                        </div>
                                    </div>

                                    {newPreviews.length > 0 && (
                                        <>
                                            <p className="text-xs text-gray-500 mt-3 mb-2">
                                                New images to upload ({newPreviews.length} new)
                                            </p>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                                {newPreviews.map((src, index) => (
                                                    <div key={index} className="relative group aspect-square">
                                                        <img
                                                            src={src}
                                                            alt={`New ${index + 1}`}
                                                            className="w-full h-full object-cover rounded-lg border-2 border-emerald-300"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeNewImage(index)}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                                        >
                                                            <XIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    <div className="mt-3 flex items-center justify-between">
                                        <p className="text-sm text-gray-600">
                                            {existingImages.length + formData.images.length} / 5 images selected
                                        </p>
                                        {existingImages.length + formData.images.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {existingImages.map((_, i) => (
                                                    <div key={`existing-${i}`} className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                                ))}
                                                {formData.images.map((_, i) => (
                                                    <div key={`new-${i}`} className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 -mx-6 mt-6 flex justify-end space-x-3">
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
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        Saving...
                                    </span>
                                ) : (
                                    initialData ? "Update Package" : "Create Package"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PackageFormModal;
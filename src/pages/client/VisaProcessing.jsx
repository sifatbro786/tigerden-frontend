"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Globe,
    Clock,
    CheckCircle,
    Phone,
    ChevronRight,
    FileText,
    Calendar,
    Users,
    Award,
    Shield,
    Send,
    MessageCircle,
    Search,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";

const visaServices = [
    {
        id: "china-business",
        country: "China",
        flag: "https://t4.ftcdn.net/jpg/05/18/55/83/360_F_518558397_6hElKiMb3jK80XvWOx3V5D26T7nKoYR6.jpg",
        image: "https://www.fabionodariphoto.com/wp-content/uploads/2023/05/shenzhen-travel-guide-1.jpg",
        category: "Business Visa",
        entryTypes: [
            { type: "Single Entry", validity: "3 Months", stay: "30 Days" },
            { type: "Double Entry", validity: "6 Months", stay: "30 Days/visit" },
            { type: "Multiple Entry", validity: "6 Months - 2 Years", stay: "30 Days/visit" },
        ],
        processingDays: "15-20",
        price: 12500,
        description: "We process all types of China business visas hassle-free and quickly.",
        requirements: [
            "Passport (6+ months valid)",
            "Photo (White Background)",
            "Company Invitation Letter",
            "NID / Trade License",
        ],
        popular: true,
    },
    {
        id: "usa-tourist",
        country: "United States",
        flag: "https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2069",
        category: "Tourist & Business Visa",
        entryType: "multiple",
        processingDays: "18-25",
        price: 18500,
        description: "B1/B2 Tourist & Business Visa. 10 years validity with multiple entries.",
        requirements: [
            "Valid Passport",
            "DS-160 Form",
            "Appointment Letter",
            "Financial Documents",
        ],
        popular: true,
    },
    {
        id: "thailand-tourist",
        country: "Thailand",
        flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9sZouoUFFLOyrI0figrGxI4PcDtO7k5eOSg&s",
        image: "https://www.thetimes.com/imageserver/image/%2Fa7a76c65-fc63-4142-9b6e-391fbf74e883.jpg?crop=1350%2C900%2C125%2C0&resize=750",
        category: "Tourist Visa",
        entryType: "single",
        processingDays: "5-7",
        price: 5500,
        description: "Tourist Visa - 60 days stay with option to extend.",
        requirements: ["Passport", "Photograph", "Flight Ticket", "Hotel Booking"],
        popular: false,
    },
    {
        id: "uk-tourist",
        country: "United Kingdom",
        flag: "https://t3.ftcdn.net/jpg/01/09/82/46/360_F_109824622_WnGZBpmvQ7UwTMHmlUJMlaMl7tgSNG7j.jpg",
        image: "https://t3.ftcdn.net/jpg/05/10/71/90/360_F_510719075_qeEoeE8pHYpHcgyy6wSdvx6Ozs843O6B.jpg",
        category: "Standard Visitor Visa",
        entryType: "multiple",
        processingDays: "15-20",
        price: 16500,
        description:
            "UK Visitor Visa for tourism, business, or medical treatment. Usually 6 months validity.",
        requirements: [
            "Valid Passport",
            "Bank Statement (last 6 months)",
            "Employment Letter",
            "Accommodation Details",
        ],
        popular: true,
    },
    {
        id: "canada-tourist",
        country: "Canada",
        flag: "https://static.vecteezy.com/system/resources/previews/032/876/996/non_2x/illustration-of-the-official-national-flag-of-canada-in-form-free-vector.jpg",
        image: "https://brighttax.com/wp-content/uploads/2025/06/life-in-canada.jpg",
        category: "Temporary Resident Visa (TRV)",
        entryType: "multiple",
        processingDays: "20-30",
        price: 17500,
        description: "Canada Visitor Visa for tourism or family visits. Up to 10 years validity.",
        requirements: [
            "Valid Passport",
            "Photograph",
            "Invitation Letter (if applicable)",
            "Proof of Funds",
        ],
        popular: false,
    },
    {
        id: "singapore-tourist",
        country: "Singapore",
        flag: "https://static.vecteezy.com/system/resources/previews/016/833/177/non_2x/national-flag-of-singapore-flat-color-icon-vector.jpg",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2065",
        category: "Tourist Visa",
        entryType: "multiple",
        processingDays: "5-7",
        price: 6500,
        description: "Singapore e-Visa for tourism or business. Valid for up to 2 years.",
        requirements: [
            "Passport (6 months valid)",
            "Recent Photo",
            "Flight Itinerary",
            "Hotel Booking",
        ],
        popular: true,
    },
];

const VisaProcessing = () => {
    const [selectedVisa, setSelectedVisa] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedVisa) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedVisa]);

    const filteredVisas = visaServices.filter((visa) =>
        visa.country.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="min-h-screen bg-[#fcfcfd]">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center bg-indigo-950 overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1544013583-44fbe1130e8a?q=80&w=2000')] bg-cover bg-center" />
                <div className="relative z-10 text-center px-5">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block px-4 py-1 rounded-full bg-white/10 text-indigo-200 text-sm backdrop-blur-md mb-4 border border-white/20"
                    >
                        Tigerden Tourism Global Services
                    </motion.span>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6"
                    >
                        Hassle-Free Visa Processing
                    </motion.h1>

                    <div className="max-w-xl mx-auto relative group">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition-colors"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search your desired country (e.g., China, USA...)"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-none shadow-2xl outline-none text-gray-800"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Stats/Info Bar */}
            <div className="max-w-7xl mx-auto px-5 -mt-8 relative z-20">
                <div className="bg-white rounded-3xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-100">
                    <div className="flex items-center gap-4 px-4">
                        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Processing Time</p>
                            <p className="font-bold text-gray-800">15-20 Working Days</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 px-4 border-x border-gray-100">
                        <div className="p-3 bg-green-50 rounded-2xl text-green-600">
                            <Shield size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Security</p>
                            <p className="font-bold text-gray-800">100% Trusted Service</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 px-4">
                        <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
                            <Globe size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Countries</p>
                            <p className="font-bold text-gray-800">50+ Visa Services</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid - Image Background Cards with Hover Effect */}
            <section className="max-w-7xl mx-auto px-5 py-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-10">
                    Choose Your Preferred Package
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVisas.map((visa) => (
                        <motion.div
                            layoutId={visa.id}
                            key={visa.id}
                            onClick={() => setSelectedVisa(visa)}
                            className="group relative h-[320px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url(${visa.image})` }}
                            />

                            {/* Overlay - Dark on default, lighter on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-all duration-300 group-hover:via-black/30 group-hover:to-black/10" />

                            {/* Popular Badge */}
                            {visa.popular && (
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="bg-orange-500 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg">
                                        Popular
                                    </span>
                                </div>
                            )}

                            {/* Flag Icon */}
                            <div className="absolute top-4 left-4 z-10 text-3xl drop-shadow-lg">
                                <img className="h-6  rounded-sm" src={visa.flag} alt="" />
                            </div>

                            {/* Default Visible Content - Just Country Name */}
                            <div className="absolute bottom-6 left-6 right-6 z-10">
                                <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                                    {visa.country}
                                </h3>
                            </div>

                            {/* Hover Content - Slides up on hover without white background */}
                            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-white/80 uppercase tracking-wider font-semibold drop-shadow-md">
                                            {visa.category}
                                        </p>
                                        <p className="text-xl font-black text-white drop-shadow-lg">
                                            ৳{visa.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <p className="text-sm text-white/90 line-clamp-2 drop-shadow-md">
                                        {visa.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-3 border-t border-white/30">
                                        <div className="flex items-center gap-1 text-xs text-white/80">
                                            <Clock size={12} />
                                            <span>{visa.processingDays} days</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all shadow-md">
                                            <ChevronRight size={18} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Details Modal */}
            <AnimatePresence>
                {selectedVisa && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-indigo-950/60 backdrop-blur-md"
                            onClick={() => setSelectedVisa(null)}
                        />
                        <motion.div
                            layoutId={selectedVisa.id}
                            className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedVisa(null)}
                                className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-5xl">
                                        <img
                                            className="h-6 rounded-sm"
                                            src={selectedVisa.flag}
                                            alt={selectedVisa.country}
                                        />
                                    </span>
                                    <div>
                                        <h2 className="text-3xl font-black text-gray-900">
                                            {selectedVisa.country}
                                        </h2>
                                        <p className="text-indigo-600 font-medium">
                                            Visa Processing Details
                                        </p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-10">
                                    <div>
                                        <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                                            <FileText size={18} className="text-indigo-500" />{" "}
                                            Required Documents
                                        </h4>
                                        <ul className="space-y-3">
                                            {selectedVisa.requirements.map((req, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 text-sm text-gray-600"
                                                >
                                                    <CheckCircle
                                                        size={14}
                                                        className="text-green-500 mt-1 shrink-0"
                                                    />{" "}
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-5 bg-indigo-50 rounded-3xl border border-indigo-100">
                                            <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                                                <Clock size={16} /> Processing Time
                                            </h4>
                                            <p className="text-sm text-indigo-700">
                                                {selectedVisa.processingDays} working days
                                                (typically)
                                            </p>
                                        </div>

                                        {selectedVisa.entryTypes ? (
                                            <div className="space-y-2">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                    Visa Types
                                                </p>
                                                {selectedVisa.entryTypes.map((type, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                                                    >
                                                        <span className="text-sm font-bold text-gray-700">
                                                            {type.type}
                                                        </span>
                                                        <span className="text-[10px] bg-white px-2 py-1 rounded-md shadow-sm">
                                                            {type.validity}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-5 bg-green-50 rounded-3xl border border-green-100 text-green-700 font-bold">
                                                Entry: {selectedVisa.entryType}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="tel:+8801819454892"
                                        className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
                                    >
                                        <Phone size={18} /> Call Now
                                    </a>
                                    <button className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                                        <MessageCircle size={18} /> WhatsApp Message
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VisaProcessing;

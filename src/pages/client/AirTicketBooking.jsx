// src/pages/AirTicketBooking.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plane,
    Calendar,
    Users,
    MapPin,
    Search,
    Clock,
    Luggage,
    Wifi,
    Coffee,
    Tv,
    Battery,
    ArrowRight,
    Phone,
    Mail,
    MessageCircle,
    Star,
    Award,
    Shield,
    CheckCircle,
    X,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const AirTicketBooking = () => {
    const [tripType, setTripType] = useState("round");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departDate, setDepartDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [passengers, setPassengers] = useState(1);
    const [flightClass, setFlightClass] = useState("economy");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [expandedFlight, setExpandedFlight] = useState(null);

    // Sample flight data
    const flightResults = [
        {
            id: 1,
            airline: "Emirates",
            airlineCode: "EK",
            flightNumber: "EK-582",
            from: "Dhaka (DAC)",
            to: "Dubai (DXB)",
            departureTime: "10:30 AM",
            arrivalTime: "1:45 PM",
            duration: "4h 15m",
            price: 45600,
            stops: "Non-stop",
            baggage: "30kg",
            amenities: ["Wifi", "Meal", "Entertainment"],
            rating: 4.8,
        },
        {
            id: 2,
            airline: "Qatar Airways",
            airlineCode: "QR",
            flightNumber: "QR-639",
            from: "Dhaka (DAC)",
            to: "Doha (DOH)",
            departureTime: "8:15 PM",
            arrivalTime: "11:30 PM",
            duration: "5h 15m",
            price: 42500,
            stops: "Non-stop",
            baggage: "25kg",
            amenities: ["Wifi", "Meal", "Entertainment"],
            rating: 4.7,
        },
        {
            id: 3,
            airline: "Turkish Airlines",
            airlineCode: "TK",
            flightNumber: "TK-712",
            from: "Dhaka (DAC)",
            to: "Istanbul (IST)",
            departureTime: "6:45 AM",
            arrivalTime: "12:55 PM",
            duration: "7h 10m",
            price: 48900,
            stops: "Non-stop",
            baggage: "30kg",
            amenities: ["Meal", "Entertainment"],
            rating: 4.6,
        },
        {
            id: 4,
            airline: "Singapore Airlines",
            airlineCode: "SQ",
            flightNumber: "SQ-447",
            from: "Dhaka (DAC)",
            to: "Singapore (SIN)",
            departureTime: "11:55 PM",
            arrivalTime: "6:35 AM",
            duration: "3h 40m",
            price: 51200,
            stops: "Non-stop",
            baggage: "25kg",
            amenities: ["Wifi", "Meal", "Entertainment", "Power"],
            rating: 4.9,
        },
        {
            id: 5,
            airline: "Biman Bangladesh",
            airlineCode: "BG",
            flightNumber: "BG-147",
            from: "Dhaka (DAC)",
            to: "Kolkata (CCU)",
            departureTime: "9:00 AM",
            arrivalTime: "10:00 AM",
            duration: "1h 0m",
            price: 18500,
            stops: "Non-stop",
            baggage: "30kg",
            amenities: ["Meal"],
            rating: 4.2,
        },
        {
            id: 6,
            airline: "Thai Airways",
            airlineCode: "TG",
            flightNumber: "TG-322",
            from: "Dhaka (DAC)",
            to: "Bangkok (BKK)",
            departureTime: "2:30 PM",
            arrivalTime: "6:15 PM",
            duration: "2h 45m",
            price: 35800,
            stops: "Non-stop",
            baggage: "30kg",
            amenities: ["Wifi", "Meal", "Entertainment"],
            rating: 4.5,
        },
    ];

    const popularRoutes = [
        { from: "Dhaka (DAC)", to: "Dubai (DXB)", price: "45,600", airline: "Emirates" },
        { from: "Dhaka (DAC)", to: "Kolkata (CCU)", price: "18,500", airline: "Biman" },
        { from: "Dhaka (DAC)", to: "Bangkok (BKK)", price: "35,800", airline: "Thai Airways" },
        { from: "Dhaka (DAC)", to: "Singapore (SIN)", price: "51,200", airline: "Singapore Air" },
        { from: "Dhaka (DAC)", to: "Doha (DOH)", price: "42,500", airline: "Qatar Airways" },
        { from: "Chittagong (CGP)", to: "Dubai (DXB)", price: "48,900", airline: "Flydubai" },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        setShowSearchResults(true);
    };

    const getAirlineColor = (airline) => {
        const colors = {
            Emirates: "from-red-500 to-red-700",
            "Qatar Airways": "from-purple-500 to-purple-700",
            "Turkish Airlines": "from-red-600 to-red-800",
            "Singapore Airlines": "from-yellow-600 to-yellow-800",
            "Biman Bangladesh": "from-green-600 to-green-800",
            "Thai Airways": "from-purple-500 to-indigo-600",
        };
        return colors[airline] || "from-blue-500 to-blue-700";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600')",
                    }}
                />
                <div className="relative z-20 max-w-7xl mx-auto px-5 py-16 md:py-20 lg:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-2 text-blue-200 mb-4">
                            <Plane className="w-5 h-5" />
                            <span className="text-sm font-medium">Flight Booking</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
                            Book Your Next Flight
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                            Find the best flight deals to anywhere in the world. Compare prices from
                            500+ airlines and save up to 40%.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="tel:+8801819454892"
                                className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                <Phone className="w-4 h-4" />
                                +88 01819454892
                            </a>
                            <button className="border-2 border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                24/7 Support
                            </button>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 120"
                        className="w-full h-12 md:h-16"
                    >
                        <path
                            fill="#f8fafc"
                            fillOpacity="1"
                            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
                        />
                    </svg>
                </div>
            </section>

            {/* Booking Form */}
            <div className="max-w-7xl mx-auto px-5 -mt-10 relative z-30">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
                >
                    <div className="flex gap-4 mb-6 border-b pb-4">
                        <button
                            onClick={() => setTripType("round")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                                tripType === "round"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                            Round Trip
                        </button>
                        <button
                            onClick={() => setTripType("oneway")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                                tripType === "oneway"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                            One Way
                        </button>
                    </div>

                    <form onSubmit={handleSearch}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    From
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="City or Airport"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    To
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Destination"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Departure
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="date"
                                        value={departDate}
                                        onChange={(e) => setDepartDate(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            {tripType === "round" && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Return
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="date"
                                            value={returnDate}
                                            onChange={(e) => setReturnDate(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                            required={tripType === "round"}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Passengers
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select
                                        value={passengers}
                                        onChange={(e) => setPassengers(parseInt(e.target.value))}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                            <option key={num} value={num}>
                                                {num} Passenger{num > 1 ? "s" : ""}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Class
                                </label>
                                <div className="relative">
                                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select
                                        value={flightClass}
                                        onChange={(e) => setFlightClass(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    >
                                        <option value="economy">Economy Class</option>
                                        <option value="business">Business Class</option>
                                        <option value="first">First Class</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            <Search className="w-5 h-5" />
                            Search Flights
                        </button>
                    </form>
                </motion.div>
            </div>

            {/* Popular Routes */}
            <div className="max-w-7xl mx-auto px-5 py-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Popular Routes</h2>
                            <p className="text-slate-500 mt-1">Most booked flights this month</p>
                        </div>
                        <Link
                            to="/contact"
                            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {popularRoutes.map((route, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer"
                                onClick={() => {
                                    setFrom(route.from);
                                    setTo(route.to);
                                }}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-sm font-medium">
                                                {route.from}
                                            </span>
                                            <ArrowRight className="w-3 h-3" />
                                            <span className="text-sm font-medium">{route.to}</span>
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1">
                                            {route.airline}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-blue-600 font-bold">
                                            ৳{route.price}
                                        </div>
                                        <div className="text-xs text-slate-400">starting from</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Flight Results */}
            <AnimatePresence>
                {showSearchResults && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-7xl mx-auto px-5 py-8"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">Available Flights</h2>
                            <button
                                onClick={() => setShowSearchResults(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {flightResults.map((flight) => (
                                <motion.div
                                    key={flight.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all"
                                >
                                    <div
                                        className="p-5 cursor-pointer"
                                        onClick={() =>
                                            setExpandedFlight(
                                                expandedFlight === flight.id ? null : flight.id,
                                            )
                                        }
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-12 h-12 bg-gradient-to-r ${getAirlineColor(flight.airline)} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                                                >
                                                    {flight.airlineCode}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-800">
                                                        {flight.airline}
                                                    </div>
                                                    <div className="text-xs text-slate-400">
                                                        {flight.flightNumber}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-bold text-slate-800">
                                                            {flight.departureTime}
                                                        </div>
                                                        <div className="text-xs text-slate-500">
                                                            {flight.from}
                                                        </div>
                                                    </div>
                                                    <div className="text-center px-4">
                                                        <div className="text-xs text-slate-400">
                                                            {flight.duration}
                                                        </div>
                                                        <div className="relative w-24 h-px bg-slate-200 my-1">
                                                            <Plane className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 text-slate-400" />
                                                        </div>
                                                        <div className="text-xs text-slate-400">
                                                            {flight.stops}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800">
                                                            {flight.arrivalTime}
                                                        </div>
                                                        <div className="text-xs text-slate-500">
                                                            {flight.to}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-blue-600 font-bold text-xl">
                                                    ৳{flight.price.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    per person
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedFlight(flight);
                                                }}
                                                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
                                            >
                                                Book Now
                                            </button>
                                            <button className="text-slate-400">
                                                {expandedFlight === flight.id ? (
                                                    <ChevronUp className="w-5 h-5" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {expandedFlight === flight.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-slate-100 bg-slate-50 p-5"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-slate-700 mb-2">
                                                            Baggage Allowance
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Luggage className="w-4 h-4 text-blue-600" />
                                                            <span className="text-slate-600">
                                                                {flight.baggage} check-in + 7kg
                                                                cabin
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-slate-700 mb-2">
                                                            Amenities
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {flight.amenities.includes("Wifi") && (
                                                                <Wifi className="w-4 h-4 text-slate-500" />
                                                            )}
                                                            {flight.amenities.includes("Meal") && (
                                                                <Coffee className="w-4 h-4 text-slate-500" />
                                                            )}
                                                            {flight.amenities.includes(
                                                                "Entertainment",
                                                            ) && (
                                                                <Tv className="w-4 h-4 text-slate-500" />
                                                            )}
                                                            {flight.amenities.includes("Power") && (
                                                                <Battery className="w-4 h-4 text-slate-500" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-slate-700 mb-2">
                                                            Cancellation Policy
                                                        </div>
                                                        <div className="text-sm text-slate-600">
                                                            Free cancellation within 24 hours
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Why Choose Us */}
            <div className="bg-white py-12 mt-8">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                            Why Book With Us?
                        </h2>
                        <p className="text-slate-500 mt-2">
                            Best prices, exclusive deals & 24/7 support
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Award,
                                title: "Best Price Guarantee",
                                desc: "We match any lower price",
                            },
                            {
                                icon: Shield,
                                title: "Secure Booking",
                                desc: "100% payment protection",
                            },
                            {
                                icon: Clock,
                                title: "24/7 Support",
                                desc: "Round the clock assistance",
                            },
                            {
                                icon: CheckCircle,
                                title: "Instant Confirmation",
                                desc: "Get tickets immediately",
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="text-center p-4">
                                <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <item.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-slate-800">{item.title}</h3>
                                <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-blue-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-5 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help Booking?</h2>
                    <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
                        Our travel experts are here to help you find the best flights at the best
                        prices.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/contact"
                            className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all flex items-center gap-2"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Contact Us
                        </Link>
                        <a
                            href="tel:+8801819454892"
                            className="border-2 border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4" />
                            Call Now
                        </a>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <AnimatePresence>
                {selectedFlight && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedFlight(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl"
                        >
                            <div className="flex justify-between items-center p-5 border-b border-slate-100">
                                <h3 className="text-xl font-bold text-slate-800">
                                    Book Your Flight
                                </h3>
                                <button
                                    onClick={() => setSelectedFlight(null)}
                                    className="text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-semibold">
                                                {selectedFlight.airline}
                                            </div>
                                            <div className="text-sm text-slate-600">
                                                {selectedFlight.flightNumber}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-blue-600 font-bold">
                                                ৳{selectedFlight.price.toLocaleString()}
                                            </div>
                                            <div className="text-xs text-slate-500">per person</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-300 outline-none"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-300 outline-none"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-300 outline-none"
                                        placeholder="+880XXXXXXXXX"
                                    />
                                </div>
                                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
                                    Confirm Booking
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AirTicketBooking;

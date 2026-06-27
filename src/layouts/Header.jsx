import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Menu,
    X,
    ChevronRight,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Plane,
    Briefcase,
    User,
    Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "/logo.png";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Visa Processing", href: "/visa-processing" },
    // { name: "Air Ticket", href: "/air-ticket" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    return (
        <>
            {/* Main Navbar - Transparent by default, glass on scroll */}
            <motion.header
                className={[
                    "fixed top-0 left-0 w-full z-50 transition-all duration-500",
                    scrolled
                        ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border-b border-white/30"
                        : "bg-transparent backdrop-blur-0 border-b border-white/10",
                ].join(" ")}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo - with better visibility on transparent background */}
                        <Link to="/" className="flex-shrink-0">
                            <motion.img
                                src={Logo}
                                alt="Tigerden Tourism"
                                className={[
                                    "h-9 md:h-24 w-auto object-contain transition-all duration-300",
                                    scrolled ? "brightness-100" : "brightness-0 invert",
                                ].join(" ")}
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            />
                        </Link>

                        {/* Desktop Navigation Links - Centered */}
                        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                            {navigation.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link key={item.name} to={item.href}>
                                        <motion.div
                                            className={[
                                                "relative flex items-center gap-2 px-3 lg:px-4 py-2 text-sm font-bold rounded-full transition-all duration-300",
                                                active
                                                    ? "text-[#58c947] bg-white/20 backdrop-blur-sm shadow-sm"
                                                    : scrolled
                                                      ? "text-gray-700 hover:text-emerald-600"
                                                      : "text-white/90 hover:text-white hover:bg-white/10",
                                                !active && "hover:bg-white/10",
                                            ].join(" ")}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.96 }}
                                        >
                                            <span>{item.name}</span>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right side — Desktop */}
                        <div className="hidden md:flex items-center gap-3">
                            {/* User icon */}
                            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/account"
                                    className={[
                                        "flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300",
                                        scrolled
                                            ? "border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50"
                                            : "border-white/30 text-white/80 hover:border-white/60 hover:text-white hover:bg-white/10",
                                    ].join(" ")}
                                    aria-label="Account"
                                >
                                    <User className="w-4 h-4" />
                                </Link>
                            </motion.div>

                            {/* Book Now CTA with Gradient */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Link
                                    to="/contact"
                                    className="group flex items-center gap-2 bg-[#58c947] hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <MapPin className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
                                    Book Now
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile Controls */}
                        <div className="flex md:hidden items-center gap-2">
                            <Link to="/account" aria-label="Account">
                                <div
                                    className={[
                                        "p-2 rounded-full transition-colors",
                                        scrolled
                                            ? "text-gray-700 hover:bg-gray-100"
                                            : "text-white hover:bg-white/10",
                                    ].join(" ")}
                                >
                                    <User className="w-5 h-5" />
                                </div>
                            </Link>
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className={[
                                    "p-2 rounded-full transition-colors",
                                    scrolled
                                        ? "text-gray-700 hover:bg-gray-100"
                                        : "text-white hover:bg-white/10",
                                ].join(" ")}
                                aria-label="Open menu"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Border Effect - subtle */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
                    animate={{ opacity: scrolled ? 0.8 : 0.4 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.header>

            {/* Mobile Drawer - Premium Design */}
            <AnimatePresence>
                {isMenuOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        {/* Backdrop with blur */}
                        <motion.div
                            className="absolute inset-0 bg-black/40 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Drawer panel - Glass effect */}
                        <motion.div
                            className="absolute inset-y-0 right-0 w-full max-w-sm bg-white/95 backdrop-blur-xl flex flex-col shadow-2xl"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 320, damping: 32 }}
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-emerald-50/30 to-transparent">
                                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                                    <img
                                        src={Logo}
                                        className="h-[70px] w-auto object-contain"
                                        alt="Tigerden Tourism"
                                    />
                                </Link>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2.5 rounded-full bg-white shadow-sm hover:bg-gray-50 text-gray-600 transition-all duration-200 hover:rotate-90"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Navigation Links with Icons */}
                            <div className="flex-1 overflow-y-auto px-4 py-8 space-y-2">
                                {navigation.map((item, i) => {
                                    const active = isActive(item.href);
                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ x: 30, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{
                                                delay: i * 0.05,
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 26,
                                            }}
                                        >
                                            <Link
                                                to={item.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={[
                                                    "flex items-center justify-between px-5 py-4 rounded-xl text-sm font-semibold transition-all duration-200 group",
                                                    active
                                                        ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 shadow-sm"
                                                        : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600",
                                                ].join(" ")}
                                            >
                                                <span>{item.name}</span>
                                                <ChevronRight
                                                    className={[
                                                        "h-4 w-4 transition-all duration-200 group-hover:translate-x-1",
                                                        active ? "text-[#58c947]" : "text-gray-300",
                                                    ].join(" ")}
                                                />
                                            </Link>
                                        </motion.div>
                                    );
                                })}

                                {/* Book Now Button in Drawer */}
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                    className="pt-6 mt-4 border-t border-gray-100"
                                >
                                    <Link
                                        to="/contact"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm py-4 rounded-xl shadow-md transition-all duration-300"
                                    >
                                        <MapPin className="h-4 w-4 transition-transform group-hover:rotate-12" />
                                        Book Your Journey
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Contact Footer - Enhanced */}
                            <motion.div
                                className="px-6 py-6 border-t border-gray-100 space-y-4 bg-gradient-to-b from-white to-gray-50/50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.45 }}
                            >
                                <div className="flex items-center gap-3 text-gray-600 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 flex items-center justify-center shrink-0">
                                        <Phone className="h-4 w-4 text-emerald-600" />
                                    </div>
                                    <span className="font-medium">+88 01819454892</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 flex items-center justify-center shrink-0">
                                        <Mail className="h-4 w-4 text-emerald-600" />
                                    </div>
                                    <span className="font-medium">info@tigerdentourism.com</span>
                                </div>
                                <div className="flex items-start gap-3 text-gray-500 text-xs">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 flex items-center justify-center shrink-0">
                                        <Calendar className="h-4 w-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700">Business Hours</p>
                                        <p className="text-gray-500">
                                            Mon – Fri: 9:00 AM – 6:00 PM
                                        </p>
                                        <p className="text-gray-500">Sat: 10:00 AM – 2:00 PM</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

import { useState } from "react";
import {
    Facebook,
    Instagram,
    Phone,
    Mail,
    MapPin,
    ChevronUp,
    Clock,
    Send,
    Sparkles,
    Plane,
    Briefcase,
    CalendarDays,
    Building2,
    FileText,
    ShieldCheck,
    BadgeInfo,
    MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Logo from "/logo.png";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 3000);
            setEmail("");
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const footerLinks = {
        services: [
            { name: "Visa Processing", href: "/visa-processing", icon: CalendarDays },
            { name: "Air Ticket Booking", href: "/air-ticket", icon: Plane },
            { name: "Exclusive Packages", href: "/", icon: Briefcase },
        ],
        company: [
            { name: "About Us", href: "/about", icon: BadgeInfo },
            { name: "Contact Us", href: "/contact", icon: MessageCircle },
            { name: "Privacy Policy", href: "/privacy", icon: ShieldCheck },
            { name: "Terms & Conditions", href: "/terms", icon: FileText },
        ],
    };

    const socialLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            href: "https://facebook.com",
            color: "hover:text-[#1877f2]",
        },
        {
            name: "Instagram",
            icon: Instagram,
            href: "https://instagram.com",
            color: "hover:text-[#e4405f]",
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            href: "https://wa.me/8801301281452",
            color: "hover:text-[#25d366]",
        },
    ];

    const contactInfo = {
        address: "House # 20 (Flat G-2), Road # 03, Block # C, Banasree, Rampura, Dhaka",
        phones: ["+88 01301-281452", "+88 01917-231411"],
        email: "info@tigerdentourism.com",
        hours: "Sat - Thu: 9:00 AM - 8:00 PM",
    };

    return (
        <footer className="relative bg-gradient-to-b from-[#0A0D14] to-[#06080E] text-gray-300 font-['Inter',system-ui,sans-serif] overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-8">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
                    {/* Column 1 - Brand Section (3 cols on lg) */}
                    <div className="lg:col-span-3 space-y-5">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src={Logo}
                                alt="Tigerden Tourism"
                                className="h-30 w-auto object-cover mb-4"
                            />
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Your trusted partner for seamless travel experiences, visa
                                solutions, and premium tourism services across the globe.
                            </p>
                        </motion.div>

                        {/* Social Icons with Glow Effect */}
                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-white/10 hover:scale-110 ${social.color}`}
                                    whileHover={{ y: -3 }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <social.icon className="w-4.5 h-4.5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 - Services (3 cols on lg) */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h3 className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5" />
                                Our Services
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.services.map((item, idx) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <a
                                            href={item.href}
                                            className="group flex items-center gap-2 text-gray-400 hover:text-emerald-400 text-sm transition-all duration-300 hover:translate-x-1"
                                        >
                                            <item.icon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                            <span>{item.name}</span>
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Column 3 - Company (2 cols on lg) */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h3 className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Building2 className="w-3.5 h-3.5" />
                                Company
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.company.map((item, idx) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <a
                                            href={item.href}
                                            className="group flex items-center gap-2 text-gray-400 hover:text-emerald-400 text-sm transition-all duration-300 hover:translate-x-1"
                                        >
                                            <item.icon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                            <span>{item.name}</span>
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Column 4 - Contact & Newsletter (4 cols on lg) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h3 className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5" />
                                Get in Touch
                            </h3>
                            <div className="space-y-3">
                                <div className="flex gap-3 text-sm">
                                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span className="text-gray-400 leading-relaxed">
                                        {contactInfo.address}
                                    </span>
                                </div>
                                {contactInfo.phones.map((phone, idx) => (
                                    <a
                                        key={idx}
                                        href={`tel:${phone.replace(/\s/g, "")}`}
                                        className="flex gap-3 text-sm text-gray-400 hover:text-emerald-400 transition-colors group"
                                    >
                                        <Phone className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                                        <span>{phone}</span>
                                    </a>
                                ))}
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="flex gap-3 text-sm text-gray-400 hover:text-emerald-400 transition-colors group"
                                >
                                    <Mail className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                                    <span>{contactInfo.email}</span>
                                </a>
                                <div className="flex gap-3 text-sm">
                                    <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span className="text-gray-400">{contactInfo.hours}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Newsletter Card with Glassmorphism */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 shadow-xl"
                        >
                            <div className="absolute -top-3 left-4 px-3 py-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                                Newsletter
                            </div>
                            <div className="pt-3 pb-2">
                                <p className="text-xs text-gray-400 mb-3">
                                    Subscribe for exclusive deals & travel inspiration
                                </p>
                                <form onSubmit={handleNewsletterSubmit} className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address"
                                        className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                                        required
                                    />
                                    <motion.button
                                        type="submit"
                                        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        animate={isSubmitted ? { scale: [1, 1.2, 1] } : {}}
                                    >
                                        {isSubmitted ? (
                                            <Sparkles className="w-3.5 h-3.5" />
                                        ) : (
                                            <Send className="w-3.5 h-3.5" />
                                        )}
                                    </motion.button>
                                </form>
                                {isSubmitted && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-emerald-400 text-xs mt-2 text-center"
                                    >
                                        Thanks for subscribing! ✨
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Bar with Separator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="pt-8 border-t border-white/10"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-xs">
                            © {new Date().getFullYear()} Tigerden Tourism. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href="/privacy"
                                className="text-gray-500 text-xs hover:text-emerald-400 transition-colors"
                            >
                                Privacy
                            </a>
                            <a
                                href="/terms"
                                className="text-gray-500 text-xs hover:text-emerald-400 transition-colors"
                            >
                                Terms
                            </a>
                            <a
                                href="/sitemap"
                                className="text-gray-500 text-xs hover:text-emerald-400 transition-colors"
                            >
                                Sitemap
                            </a>
                        </div>
                        <motion.button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-emerald-400 text-xs font-medium transition-all duration-300"
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ChevronUp className="w-3.5 h-3.5" />
                            Back to Top
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

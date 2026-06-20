import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
    Phone,
    Mail,
    MapPin,
    MessageCircle,
    Clock,
    Send,
    CheckCircle,
    Users,
    Globe2,
    Award,
    Headphones,
    ChevronRight,
    Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        serviceType: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const serviceOptions = [
        { value: "visa", label: "Visa Processing" },
        { value: "ticket", label: "Air Ticket" },
        { value: "medical", label: "Medical Tourism" },
        { value: "tour", label: "Package Tour" },
        { value: "other", label: "Other Inquiry" },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({
                name: "",
                phone: "",
                email: "",
                serviceType: "",
                message: "",
            });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    const contactMethods = [
        {
            icon: Phone,
            title: "Call Us",
            info: "+91 98765 43210",
            subtext: "Mon-Sat, 9 AM - 8 PM",
            action: "tel:+919876543210",
        },
        {
            icon: MessageCircle,
            title: "WhatsApp",
            info: "+91 98765 43210",
            subtext: "Quick response within 2 hours",
            action: "https://wa.me/919876543210",
        },
        {
            icon: Mail,
            title: "Email Us",
            info: "hello@tigerden.com",
            subtext: "We reply within 24 hours",
            action: "mailto:hello@tigerden.com",
        },
        {
            icon: MapPin,
            title: "Visit Office",
            info: "Gurugram, Haryana",
            subtext: "Book an appointment first",
            action: "#",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - With proper gradient background */}
            <HeroSection />

            {/* Contact Methods Grid */}
            <ContactMethodsSection methods={contactMethods} />

            {/* Main Contact Section - Form + Info */}
            <MainContactSection
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isSubmitted={isSubmitted}
                serviceOptions={serviceOptions}
            />

            {/* Quick CTA Strip */}
            <QuickCTAStrip />

            {/* Trust Section */}
            <TrustSection />
        </div>
    );
};

// Hero Section Component - With proper gradient background
const HeroSection = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    useEffect(() => {
        if (isInView) controls.start("visible");
    }, [controls, isInView]);

    return (
        <section className="relative min-h-[60vh] flex items-center">
            {/* Gradient Background with subtle pattern */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMzBhMTUgMTUgMCAwIDEgMC0zMCAxNSAxNSAwIDAgMSAwIDMwem0wLTEwYTUgNSAwIDEgMCAwLTEwIDUgNSAwIDAgMCAwIDEweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-20" />
            </div>

            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

            <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-20 lg:py-24">
                <div className="max-w-2xl">
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.5 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-emerald-300 border border-emerald-400/30"
                    >
                        <Headphones size={14} />
                        <span>We're Here to Help 24/7</span>
                    </motion.div>

                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
                    >
                        Let's Plan Your{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Journey Together
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-4 text-lg text-gray-200 md:text-xl"
                    >
                        Have questions about visas, tours, flights, or medical travel? 
                        Our expert team is ready to assist you with personalized solutions.
                    </motion.p>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-6 flex flex-wrap gap-4"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-emerald-400" />
                            <span className="text-sm text-gray-300">Fast response</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-emerald-400" />
                            <span className="text-sm text-gray-300">Trusted support</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-emerald-400" />
                            <span className="text-sm text-gray-300">Hassle-free process</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
                    <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
                </svg>
            </div>
        </section>
    );
};

// Contact Methods Section
const ContactMethodsSection = ({ methods }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    useEffect(() => {
        if (isInView) controls.start("visible");
    }, [controls, isInView]);

    return (
        <section ref={ref} className="bg-white py-16 md:py-0">
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    className="mb-10 text-center"
                >
                    <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
                        Connect With Us
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Ways to Reach Us</h2>
                    <p className="mt-2 text-gray-600">Choose the channel that works best for you</p>
                </motion.div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {methods.map((method, index) => {
                        const Icon = method.icon;
                        return (
                            <motion.a
                                key={index}
                                href={method.action}
                                target={method.action.startsWith("http") ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                initial="hidden"
                                animate={controls}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group block rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 transition-all duration-300 group-hover:scale-110">
                                    <Icon className="h-6 w-6 text-emerald-600" />
                                </div>
                                <h3 className="mb-1 text-lg font-semibold text-gray-900">{method.title}</h3>
                                <p className="text-base font-medium text-emerald-600">{method.info}</p>
                                <p className="mt-1 text-sm text-gray-500">{method.subtext}</p>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// Main Contact Section
const MainContactSection = ({
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    isSubmitted,
    serviceOptions,
}) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    useEffect(() => {
        if (isInView) controls.start("visible");
    }, [controls, isInView]);

    return (
        <section ref={ref} className="bg-gray-50 py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Contact Form */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: -30 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.6 }}
                        className="rounded-3xl bg-white p-6 shadow-sm md:p-8"
                    >
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">Send us a Message</h2>
                        <p className="mb-6 text-gray-600">
                            Fill out the form and our team will get back to you within 24 hours.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-all duration-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-all duration-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-all duration-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                                        placeholder="hello@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Service Type *
                                </label>
                                <select
                                    name="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-all duration-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                                >
                                    <option value="">Select a service</option>
                                    {serviceOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-all duration-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                                    placeholder="Tell us about your travel plans or questions..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    "Sending..."
                                ) : isSubmitted ? (
                                    <>
                                        <CheckCircle size={18} />
                                        Message Sent!
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={16} className="transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>

                            {isSubmitted && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center text-sm text-emerald-600"
                                >
                                    Thanks for reaching out! We'll get back to you shortly.
                                </motion.p>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Info Card */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm md:p-8"
                    >
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">Visit Our Office</h2>
                        <p className="mb-6 text-gray-600">We'd love to meet you in person — by appointment only.</p>

                        <div className="space-y-5">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                    <MapPin size={18} className="text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Address</p>
                                    <p className="text-sm text-gray-600">
                                        7th Floor, Tower B, Cyber City,
                                        <br />
                                        Gurugram, Haryana - 122002, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                    <Phone size={18} className="text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Phone Numbers</p>
                                    <p className="text-sm text-gray-600">+91 98765 43210 (Sales)</p>
                                    <p className="text-sm text-gray-600">+91 98765 43211 (Support)</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                    <Mail size={18} className="text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Email Addresses</p>
                                    <p className="text-sm text-gray-600">hello@tigerden.com (General)</p>
                                    <p className="text-sm text-gray-600">support@tigerden.com (Support)</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                    <Clock size={18} className="text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Business Hours</p>
                                    <p className="text-sm text-gray-600">Monday – Friday: 9:00 AM – 6:00 PM</p>
                                    <p className="text-sm text-gray-600">Saturday: 10:00 AM – 2:00 PM</p>
                                    <p className="text-sm text-gray-600">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="mt-6 overflow-hidden rounded-xl">
                            <img
                                src="https://placehold.co/600x200/e2e8f0/94a3b8?text=Map+Location+-+Gurugram"
                                alt="Office location map"
                                className="h-32 w-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Quick CTA Strip
const QuickCTAStrip = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    useEffect(() => {
        if (isInView) controls.start("visible");
    }, [controls, isInView]);

    return (
        <section ref={ref} className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
                <motion.div
                    variants={{
                        hidden: { opacity: 0, scale: 0.98 },
                        visible: { opacity: 1, scale: 1 },
                    }}
                    initial="hidden"
                    animate={controls}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 shadow-xl md:p-12"
                >
                    <h2 className="text-2xl font-bold text-white md:text-3xl">Need Urgent Help?</h2>
                    <p className="mt-2 text-emerald-100">Call us directly for immediate assistance</p>
                    <motion.a
                        href="tel:+919876543210"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-lg font-semibold text-emerald-700 shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        <Phone size={18} />
                        Call Now: +91 98765 43210
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

// Trust Section
const TrustSection = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const trustItems = [
        { icon: Users, number: "5000+", label: "Happy Travelers" },
        { icon: Globe2, number: "25+", label: "Countries Served" },
        { icon: Award, number: "98%", label: "Visa Success Rate" },
        { icon: Headphones, number: "24/7", label: "Expert Support" },
    ];

    useEffect(() => {
        if (isInView) controls.start("visible");
    }, [controls, isInView]);

    return (
        <section ref={ref} className="border-t border-gray-100 bg-white py-12">
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {trustItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                initial="hidden"
                                animate={controls}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="mb-3 flex justify-center">
                                    <Icon className="h-6 w-6 text-emerald-500" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{item.number}</p>
                                <p className="text-sm text-gray-600">{item.label}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Contact;
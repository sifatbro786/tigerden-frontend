import React from "react";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, User, Building, MessageSquare } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        companyName: "",
        details: "",
        phoneNumber: "",
        email: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            alert("Thank you! Your message has been sent.");
            setFormData({
                name: "",
                companyName: "",
                details: "",
                phoneNumber: "",
                email: "",
            });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-green-50">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get in touch with us. We're ready to serve you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center mb-6">
                            <Send className="h-6 w-6 text-blue-600 mr-3" />
                            <h2 className="text-2xl font-bold text-gray-800">Send a Message</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    <User className="inline h-4 w-4 mr-2" />
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    <Mail className="inline h-4 w-4 mr-2" />
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phoneNumber"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    <Phone className="inline h-4 w-4 mr-2" />
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="+88 01XXX-XXXXXX"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="details"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    <MessageSquare className="inline h-4 w-4 mr-2" />
                                    Details *
                                </label>
                                <textarea
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    rows={4}
                                    required
                                    placeholder="Please write your message in detail..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Sending...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <Send className="h-5 w-5 mr-2" />
                                        Send Message
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Contact Information
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <MapPin className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                            Address
                                        </h3>
                                        <p className="text-gray-600">
                                            DHAKA BANGLADESH
                                            <br />
                                            Uttara, Dhaka-1230, Bangladesh
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Phone className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                                        <a
                                            href="tel:+8801819454892"
                                            className="text-green-600 hover:text-green-700"
                                        >
                                            +01568202839
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <Mail className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                                        <a
                                            href="mailto:info@shahengineering.com"
                                            className="text-purple-600 hover:text-purple-700"
                                        >
                                            info@farm.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Map */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800">Our Location</h2>
                            </div>
                            <div className="relative h-80">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58382.494845386434!2d90.28260827064511!3d23.85747401280227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c15612d0c1a5%3A0x7d853b0d816d1924!2sDiabari%20Lake!5e0!3m2!1sen!2sbd!4v1753370292454!5m2!1sen!2sbd"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-600">
                        We typically respond to your message within 1 hours.
                    </p>
                </div>
            </div>
        </div>
    );
}

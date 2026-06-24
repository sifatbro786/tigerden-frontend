// src/pages/client/NotFound.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, MapPin, Plane, Mountain, Waves, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        setAnimated(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 py-16 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Mountains */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg
                        viewBox="0 0 1440 200"
                        className="w-full"
                        preserveAspectRatio="none"
                        style={{ height: "200px" }}
                    >
                        <path
                            fill="#0d9488"
                            fillOpacity="0.1"
                            d="M0,160 L80,120 L160,140 L240,80 L320,100 L400,40 L480,80 L560,120 L640,60 L720,20 L800,80 L880,120 L960,40 L1040,100 L1120,80 L1200,120 L1280,60 L1360,100 L1440,80 L1440,200 L0,200 Z"
                        />
                        <path
                            fill="#0d9488"
                            fillOpacity="0.05"
                            d="M0,180 L80,140 L160,160 L240,100 L320,120 L400,60 L480,100 L560,140 L640,80 L720,40 L800,100 L880,140 L960,60 L1040,120 L1120,100 L1200,140 L1280,80 L1360,120 L1440,100 L1440,200 L0,200 Z"
                        />
                    </svg>
                </div>

                {/* Floating Elements */}
                <div
                    className={`absolute top-20 left-[10%] text-emerald-400/20 transition-all duration-1000 ${
                        animated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: "0.2s" }}
                >
                    <Plane className="w-24 h-24 rotate-12" />
                </div>
                <div
                    className={`absolute top-40 right-[15%] text-teal-400/20 transition-all duration-1000 ${
                        animated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: "0.4s" }}
                >
                    <Mountain className="w-20 h-20 -rotate-6" />
                </div>
                <div
                    className={`absolute bottom-40 left-[20%] text-cyan-400/20 transition-all duration-1000 ${
                        animated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: "0.6s" }}
                >
                    <Waves className="w-16 h-16" />
                </div>
                <div
                    className={`absolute top-1/2 right-[25%] text-amber-400/20 transition-all duration-1000 ${
                        animated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: "0.8s" }}
                >
                    <Compass className="w-28 h-28" />
                </div>

                {/* Floating Dots */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full bg-emerald-400/10 transition-all duration-1000 ${
                            animated ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                            width: Math.random() * 8 + 4 + "px",
                            height: Math.random() * 8 + 4 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                            transitionDelay: Math.random() * 2 + 0.5 + "s",
                            animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-3xl w-full text-center">
                {/* 404 Number with Animation */}
                <div className="relative mb-8">
                    <div
                        className={`text-[120px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 transition-all duration-1000 ${
                            animated ? "scale-100 opacity-100" : "scale-50 opacity-0"
                        }`}
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        404
                    </div>
                </div>

                {/* Error Message */}
                <div
                    className={`space-y-4 mb-10 transition-all duration-700 ${
                        animated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: "0.3s" }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-family-primary">
                        Oops! Page Not Found
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
                        Looks like this destination isn't on our map yet.
                        <br />
                        The page you're looking for seems to have wandered off.
                    </p>
                </div>

                {/* Travel Quote */}
                <div
                    className={`bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-10 border border-emerald-100/50 shadow-lg transition-all duration-700 ${
                        animated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: "0.5s" }}
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <span className="text-2xl">🧭</span>
                        <span className="text-sm font-medium text-emerald-700 uppercase tracking-wider">
                            Travel Quote
                        </span>
                    </div>
                    <p className="text-gray-700 italic text-lg font-light">
                        "Not all those who wander are lost… but sometimes we just take a wrong
                        turn."
                    </p>
                </div>

                {/* Action Buttons */}
                <div
                    className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
                        animated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: "0.7s" }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 group"
                    >
                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>

                {/* Helpful Links */}
                <div
                    className={`mt-10 flex flex-wrap items-center justify-center gap-4 text-sm transition-all duration-700 ${
                        animated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: "0.9s" }}
                >
                    <span className="text-gray-500">Still can't find your way?</span>
                    <Link
                        to="/contact"
                        className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors flex items-center gap-1"
                    >
                        <MapPin className="w-4 h-4" />
                        Contact Us
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link
                        to="/packages"
                        className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors flex items-center gap-1"
                    >
                        <Compass className="w-4 h-4" />
                        Explore Packages
                    </Link>
                </div>

                {/* Footer Decoration */}
                <div
                    className={`mt-12 text-xs text-gray-400 transition-all duration-700 ${
                        animated ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "1.1s" }}
                >
                    <p>Tigerden Tourism — Adventure awaits, even when you take a detour</p>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(5deg);
                    }
                }
            `}</style>
        </div>
    );
}

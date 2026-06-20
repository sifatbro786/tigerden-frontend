import { useEffect, useState } from "react";
import HeroVideo from "/video2.mp4";

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
 
    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-700 via-slate-700 to-slate-800">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-black/40 z-10" />
                <video
                    src={HeroVideo}
                    alt="International travel departure gate"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "30% 50%" }}
                    autoPlay
                    loop
                    muted
                />
                {/* Subtle animated grain texture */}
                <div className="absolute inset-0 z-20 opacity-20 mix-blend-overlay">
                    <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjciIG51bU9jdGF2ZXM9IjMiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjZikiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')] bg-repeat opacity-30" />
                </div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-32 md:px-10 lg:px-12">
                <h1
                    className={`mt-6 max-w-4xl transform text-center  text-5xl font-bold leading-tight tracking-tight text-white transition-all duration-700 delay-100 ease-out md:text-7xl ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                >
                    Your Journey,{" "}
                    <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                        Our Responsibility
                    </span>
                </h1>

                {/* Subheadline */}
                <p
                    className={`mt-6 max-w-2xl transform text-base text-white/80 transition-all duration-700 delay-200 ease-out md:text-lg lg:text-xl text-center  ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 "
                    }`}
                >
                    Travel, treatment, or business — we handle everything with precision, care, and
                    unwavering support. Your trusted partner for seamless global journeys.
                </p>

                {/* CTA Buttons */}
                <div
                    className={`mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-5 sm:space-y-0 transform transition-all duration-700 delay-300 ease-out ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                >
                    <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30">
                        <span className="relative z-10 flex items-center space-x-2">
                            <span>Plan Your Trip</span>
                            <svg
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </span>
                        <div className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-amber-600 to-orange-600 transition-transform duration-300 group-hover:translate-y-0" />
                    </button>

                    <button className="rounded-full border border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20 hover:shadow-lg">
                        Contact Us
                    </button>
                </div>

                {/* Stats Section with Glass Effect */}
                <div
                    className={`mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-10 transform transition-all duration-700 delay-500 ease-out ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                >
                    <div className="flex items-center space-x-4 rounded-2xl bg-white/5 px-6 py-4 backdrop-blur-sm">
                        <div className="text-3xl font-bold text-amber-400">5k+</div>
                        <div className="text-sm text-white/70">Happy Clients Worldwide</div>
                    </div>
                    <div className="flex items-center space-x-4 rounded-2xl bg-white/5 px-6 py-4 backdrop-blur-sm">
                        <div className="text-3xl font-bold text-amber-400">25+</div>
                        <div className="text-sm text-white/70">Countries Served</div>
                    </div>
                    <div className="flex items-center space-x-4 rounded-2xl bg-white/5 px-6 py-4 backdrop-blur-sm">
                        <div className="text-3xl font-bold text-amber-400">24/7</div>
                        <div className="text-sm text-white/70">Expert Support</div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 transform animate-bounce lg:block">
                <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30">
                    <div className="mt-2 h-2 w-1 rounded-full bg-white/60"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                @keyframes float-slow {
                    0%,
                    100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    50% {
                        transform: translateY(-15px) translateX(5px);
                    }
                }
                @keyframes float-delayed {
                    0%,
                    100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    50% {
                        transform: translateY(10px) translateX(-5px);
                    }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .animate-float-slow {
                    animation: float-slow 5s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 4s ease-in-out infinite;
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    transition: all 0.3s ease;
                }
                .glass-card:hover {
                    background: rgba(255, 255, 255, 0.12);
                    border-color: rgba(255, 255, 255, 0.25);
                    transform: translateY(-2px);
                }
            `}</style>
        </section>
    );
};

export default HeroSection;

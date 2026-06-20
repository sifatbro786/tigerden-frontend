import { Play } from "lucide-react";

const VideoBanner = () => {
    return (
        <section className="bg-gray-50 py-16 px-16">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div className="max-w-xl">
                        <span className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-3 block">
                            Fleet Travel UI Kit
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            Book a ticket <br /> & just leave
                        </h2>
                    </div>
                    <button className="bg-[#58C947] hover:bg-[#4bb33c] text-white font-bold py-3 px-8 rounded-full transition-all shadow-sm">
                        Book now
                    </button>
                </div>

                {/* Video/Image Container */}
                <div className="relative group overflow-hidden rounded-[32px] shadow-2xl">
                    {/* Main Image */}
                    <img
                        src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1400"
                        alt="Camping and travel"
                        className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay and Play Button */}
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <button className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 group/btn">
                            {/* Pulse effect */}
                            <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-20"></span>

                            <Play size={32} className="text-gray-900 fill-gray-900 ml-1" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoBanner;

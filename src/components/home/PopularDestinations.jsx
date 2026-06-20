import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { tourPackages } from "../../data/tourData";



const ChevronLeftIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const BADGE_COLORS = [
    "bg-pink-500",
    "bg-yellow-400",
    "bg-green-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-purple-500",
    "bg-teal-500",
    "bg-cyan-500",
];



function DestinationCard({ tour, index }) {
    const navigate = useNavigate();
    const badgeColor = BADGE_COLORS[index % BADGE_COLORS.length];

    const handleCardClick = () => {
        navigate(`/package/international/${tour.id}`);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            onClick={handleCardClick}
            className="shrink-0 w-78 cursor-pointer group"
        >

            <div className="relative h-54 rounded-2xl overflow-hidden mb-4">
                <img
                    src={tour.image}
                    alt={tour.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span
                    className={`absolute top-4 left-4 text-white text-[11px] font-bold px-3 py-1.5 rounded-full z-10 ${badgeColor}`}
                >
                    07 TOURS
                </span>

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white text-gray-900 text-sm font-semibold px-5 py-2 rounded-full shadow-md transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                    </span>
                </div>
            </div>


            <h3 className="text-xl font-extrabold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-200">
                {tour.title}
            </h3>
            <p className="text-sm text-gray-400">
                From{" "}
                <span className="font-bold text-gray-800">
                    ৳{tour.discountedPrice.toLocaleString("en-IN")}
                </span>{" "}
                per package
            </p>
        </div>
    );
}



export default function PopularDestinations() {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        scrollRef.current?.scrollBy({ left: dir * 272, behavior: "smooth" });
    };

    const tours = tourPackages.international;

    return (
        <section className="w-full bg-gray-50 py-14 px-16 font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto">

                <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
                    <div className="max-w-2xl">
                        <p className="text-xs font-bold tracking-[0.18em] uppercase text-gray-400 mb-3">
                            3 Steps for the Perfect Trip
                        </p>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                            Popular Destinations
                        </h2>
                        <p className="text-gray-400 text-base leading-relaxed">
                            An enim nullam tempor gravida donec enim congue magna at pretium purus
                            pretium ligula rutrum luctus risusd diam eget risus varius blandit sit
                            amet non magna.
                        </p>
                    </div>


                    <div className="flex gap-2 pb-1">
                        <button
                            onClick={() => scroll(-1)}
                            className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-500
                flex items-center justify-center cursor-pointer
                hover:bg-gray-100 hover:border-gray-400 active:scale-95 transition-all duration-200"
                        >
                            <ChevronLeftIcon />
                        </button>
                        <button
                            onClick={() => scroll(1)}
                            className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-500
                flex items-center justify-center cursor-pointer
                hover:bg-gray-100 hover:border-gray-400 active:scale-95 transition-all duration-200"
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>
                </div>


                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {tours.map((tour, index) => (
                        <DestinationCard key={tour.id} tour={tour} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
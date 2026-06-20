import { useState } from "react";
import { tourPackages } from "../../data/tourData";
import { useNavigate } from "react-router-dom";

const HeartIcon = ({ filled }) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={filled ? "#f43f5e" : "none"}
        stroke={filled ? "#f43f5e" : "#9ca3af"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const StarIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const ChevronLeftIcon = () => (
    <svg
        width="16"
        height="16"
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
        width="16"
        height="16"
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

// ─── TourCard ─────────────────────────────────────────────────────────────────

function TourCard({ tour, categoryType }) {  // ✅ Add categoryType prop here
    const [favorited, setFavorited] = useState(tour.isFavorited);
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = () => {
        // ✅ Use categoryType prop directly instead of tour.category
        navigate(`/package/${categoryType}/${tour.id}`);
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Prevent navigation when clicking heart
        setFavorited(!favorited);
    };

    const fmt = (n) => "৳" + n.toLocaleString("en-IN");

    return (
        <div
            className={[
                "bg-white rounded-2xl overflow-hidden border border-gray-100",
                "transition-all duration-300 cursor-pointer",
                hovered ? "shadow-xl -translate-y-1" : "shadow-sm",
            ].join(" ")}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleCardClick}
        >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={tour.image}
                    alt={tour.title}
                    className={[
                        "w-full h-full object-cover transition-transform duration-500",
                        hovered ? "scale-110" : "scale-100",
                    ].join(" ")}
                    loading="lazy"
                />

                {/* Favorite button */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all duration-200 z-10"
                >
                    <HeartIcon filled={favorited} />
                </button>

                {/* Dark overlay on hover */}
                <div
                    className={[
                        "absolute inset-0 bg-black/20 flex items-center justify-center",
                        "transition-opacity duration-200",
                        hovered ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                >
                    <span className="bg-white text-gray-900 text-sm font-semibold px-5 py-2 rounded-full shadow-md">
                        View Details
                    </span>
                </div>
            </div>

            {/* Card body */}
            <div className="p-4">
                <p className="font-bold text-gray-900 text-xl leading-snug mb-1 font-serif truncate">
                    {tour.title}
                </p>

                <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400 truncate mr-2">{tour.location}</span>
                    <div className="flex items-center gap-1 shrink-0">
                        <span className="text-xs text-gray-300 line-through">
                            {fmt(tour.originalPrice)}
                        </span>
                        <span className="text-sm font-bold text-emerald-500">
                            {fmt(tour.discountedPrice)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-[11px] text-gray-400">
                        {tour.startDate} – {tour.endDate}
                    </span>
                    <div className="flex items-center gap-1">
                        <StarIcon />
                        <span className="text-xs font-semibold text-gray-700">{tour.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── DiscoverWeekly ───────────────────────────────────────────────────────────

const PER_PAGE = 8;

export default function DiscoverWeekly() {
    const [activeTab, setActiveTab] = useState("domestic");
    const [page, setPage] = useState(0);

    const tours = tourPackages[activeTab];
    const totalPages = Math.ceil(tours.length / PER_PAGE);
    const visible = tours.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

    const switchTab = (tab) => {
        setActiveTab(tab);
        setPage(0);
    };

    return (
        // Scoped wrapper — no global styles leak out
        <section className="w-full bg-gray-50 py-12 px-14 font-sans">
            {/* Header */}
            <div className="text-center mb-10 max-w-xl mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2 font-serif">
                    Discover Weekly
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Handpicked travel packages updated every week for explorers like you
                </p>
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between max-w-7xl mx-auto mb-7 flex-wrap gap-3">
                {/* Tabs */}
                <div className="flex gap-1 bg-gray-200 rounded-full p-1">
                    {[
                        { key: "domestic", label: "Domestic" },
                        { key: "international", label: "International" },
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => switchTab(key)}
                            className={[
                                "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-0 cursor-pointer",
                                activeTab === key
                                    ? "bg-gray-900 text-white shadow-sm"
                                    : "bg-transparent text-gray-500 hover:text-gray-700",
                            ].join(" ")}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Arrow nav */}
                <div className="flex gap-2">
                    {[
                        {
                            label: "prev",
                            icon: <ChevronLeftIcon />,
                            onClick: () => setPage((p) => Math.max(0, p - 1)),
                            disabled: page === 0,
                        },
                        {
                            label: "next",
                            icon: <ChevronRightIcon />,
                            onClick: () => setPage((p) => Math.min(totalPages - 1, p + 1)),
                            disabled: page >= totalPages - 1,
                        },
                    ].map(({ label, icon, onClick, disabled }) => (
                        <button
                            key={label}
                            onClick={onClick}
                            disabled={disabled}
                            className={[
                                "w-9 h-9 rounded-full border flex items-center justify-center",
                                "transition-all duration-200 cursor-pointer",
                                disabled
                                    ? "border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed"
                                    : "border-gray-300 text-gray-600 bg-white hover:bg-gray-100 hover:border-gray-400",
                            ].join(" ")}
                        >
                            {icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
                {visible.map((tour) => (
                    <TourCard 
                        key={tour.id} 
                        tour={tour} 
                        categoryType={activeTab}  // ✅ Pass activeTab as categoryType
                    />
                ))}
            </div>

            {/* Dot pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={[
                                "h-2 rounded-full border-0 cursor-pointer transition-all duration-300",
                                i === page
                                    ? "w-6 bg-gray-900"
                                    : "w-2 bg-gray-300 hover:bg-gray-400",
                            ].join(" ")}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
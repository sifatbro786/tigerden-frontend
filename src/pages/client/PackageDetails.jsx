import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { tourPackages } from '../../data/tourData';

// ─── Icons ────────────────────────────────────────────────────────────────────
const StarIcon = ({ filled = true, size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const MapPinIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
);

const ShareIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
    </svg>
);

const HeartIcon = ({ filled }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "currentColor"} strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M19 12H5M5 12l7-7M5 12l7 7" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const CheckIcon = ({ color = "#22c55e" }) => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const XIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const GridIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
);

const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const MinusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6z" />
    </svg>
);

const MailIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

// Amenity icons
const WifiIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
);

const CoffeeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
);

const MonitorIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
);

const HospitalIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const BuildingIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

const CreditCardIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
);

// ─── Motion variants ──────────────────────────────────────────────────────────
const fadeUp = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function PackageDetails() {
    const { category, id } = useParams();
    const navigate = useNavigate();

    const [packageData, setPackageData] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [expandedDay, setExpandedDay] = useState(1); // Day 02 open by default like design
    const [guests, setGuests] = useState(2);
    const [showMore, setShowMore] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [activeTab, setActiveTab] = useState('overview'); // for mobile scroll sections

    useEffect(() => {
        const pkgs = tourPackages[category];
        const found = pkgs?.find(p => p.id === parseInt(id));
        if (found) { setPackageData(found); setIsFavorited(found.isFavorited || false); }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [category, id]);

    if (!packageData) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <p className="text-xl font-semibold text-gray-700 mb-3">Package not found</p>
                <button onClick={() => navigate('/')} className="px-5 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                    Go Home
                </button>
            </motion.div>
        </div>
    );

    const fmt = n => '৳' + n.toLocaleString('en-IN');
    const discountPct = Math.round(((packageData.originalPrice - packageData.discountedPrice) / packageData.originalPrice) * 100);
    const totalPrice = packageData.discountedPrice * guests;

    const gallery = packageData.gallery?.length > 0 ? packageData.gallery : [packageData.image, packageData.image, packageData.image, packageData.image, packageData.image];

    const amenities = [
        { icon: <HospitalIcon />, label: 'Near the hospital' },
        { icon: <MonitorIcon />, label: 'Free computer' },
        { icon: <CoffeeIcon />, label: 'Breakfast included' },
        { icon: <WifiIcon />, label: 'Free wifi 24/7' },
        { icon: <BuildingIcon />, label: 'Nearby city' },
        { icon: <CreditCardIcon />, label: 'ATM' },
    ];

    const descriptionText = packageData.fullDescription || packageData.description || '';
    const isLongDesc = descriptionText.length > 280;
    const displayDesc = showMore ? descriptionText : descriptionText.slice(0, 280) + (isLongDesc ? '…' : '');

    const ratingCategories = [
        { label: 'Location', value: 4.6 },
        { label: 'Services', value: 4.6 },
        { label: 'Amenities', value: 4.6 },
        { label: 'Price', value: 4.6 },
        { label: 'Tour', value: 4.6 },
    ];

    return (
        <motion.div className="bg-white min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            {/* ── Top Nav Bar ── */}
            <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 md:px-8 py-3.5 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                    <ArrowLeftIcon />
                    <span className="hidden sm:inline">Back</span>
                </button>
                <h1 className="text-sm font-semibold text-gray-800 truncate max-w-xs md:max-w-md">{packageData.title}</h1>
                <div className="flex items-center gap-3 text-gray-500">
                    <button className="hover:text-gray-800 transition-colors"><ShareIcon /></button>
                    <button onClick={() => setIsFavorited(v => !v)} className="hover:text-gray-800 transition-colors">
                        <HeartIcon filled={isFavorited} />
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6 pb-20">

                {/* ══════════════ TITLE ROW ══════════════ */}
                <motion.div variants={fadeUp} initial="initial" animate="animate" className="mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{packageData.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <StarIcon filled size={15} />
                            <span className="font-semibold text-gray-700">{packageData.rating}</span>
                            <span>({packageData.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPinIcon />
                            <span>{packageData.location}</span>
                        </div>
                        {discountPct > 0 && (
                            <span className="px-2.5 py-0.5 bg-red-50 text-red-500 text-xs font-bold rounded-full border border-red-100">
                                {discountPct}% OFF
                            </span>
                        )}
                    </div>
                </motion.div>

                {/* ══════════════ PHOTO GRID ══════════════ */}
                <motion.div
                    variants={fadeUp} initial="initial" animate="animate"
                    className="relative mb-8 rounded-2xl overflow-hidden"
                    style={{ height: 420 }}
                >
                    {/* Main large photo */}
                    <div className="absolute inset-0 grid grid-cols-2 gap-2">
                        {/* Left big */}
                        <div className="relative overflow-hidden rounded-l-2xl">
                            <img src={gallery[0]} alt="main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
                        </div>
                        {/* Right 2x2 */}
                        <div className="grid grid-rows-2 grid-cols-2 gap-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`relative overflow-hidden ${i === 2 ? 'rounded-tr-2xl' : i === 4 ? 'rounded-br-2xl' : ''}`}>
                                    <img
                                        src={gallery[i] || gallery[0]}
                                        alt={`photo ${i}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Show all photos button */}
                    <button className="absolute bottom-4 right-4 flex items-center gap-2 bg-white text-gray-800 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                        <GridIcon />
                        Show all photos
                    </button>
                </motion.div>

                {/* ══════════════ MAIN 2-COL LAYOUT ══════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">

                    {/* ── LEFT CONTENT ── */}
                    <div className="space-y-10">

                        {/* ── Overview ── */}
                        <motion.section variants={fadeUp} initial="initial" animate="animate">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Overview</h2>
                            <p className="text-gray-500 leading-[1.85] text-[14.5px]">{displayDesc}</p>
                            {isLongDesc && (
                                <button
                                    onClick={() => setShowMore(v => !v)}
                                    className="mt-3 text-sm font-semibold text-gray-800 underline underline-offset-2 hover:text-green-600 transition-colors"
                                >
                                    {showMore ? 'Show less' : 'Show more'}
                                </button>
                            )}
                        </motion.section>

                        {/* ── Amenities ── */}
                        <motion.section variants={fadeUp} initial="initial" animate="animate">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                                {amenities.map((a, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 3 }}
                                        className="flex items-center gap-3 text-gray-600 text-sm"
                                    >
                                        <div className="text-gray-400">{a.icon}</div>
                                        <span>{a.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* ── Tour Plan ── */}
                        <motion.section variants={fadeUp} initial="initial" animate="animate">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Tour Plan</h2>
                            <div className="space-y-2.5">
                                {packageData.itinerary?.map((day, idx) => {
                                    const isOpen = expandedDay === idx;
                                    const isActive = isOpen;
                                    return (
                                        <motion.div
                                            key={idx}
                                            className={`rounded-xl border overflow-hidden transition-colors duration-200 ${
                                                isActive ? 'border-gray-900 bg-gray-900' : 'border-gray-200 bg-white'
                                            }`}
                                        >
                                            <button
                                                onClick={() => setExpandedDay(isOpen ? -1 : idx)}
                                                className={`w-full px-5 py-4 flex items-center justify-between text-left transition-colors ${
                                                    isActive ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                                                        isActive
                                                            ? 'border-white/30 text-white/80'
                                                            : 'border-gray-200 text-gray-500'
                                                    }`}>
                                                        Day {String(day.day).padStart(2, '0')}
                                                    </span>
                                                    <span className="font-semibold text-[14.5px]">{day.title}</span>
                                                </div>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className={isActive ? 'text-white' : 'text-gray-400'}
                                                >
                                                    <ChevronDownIcon />
                                                </motion.div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-5 pb-5 pt-1">
                                                            <ul className="space-y-2 mb-4">
                                                                {day.activities.map((act, ai) => (
                                                                    <li key={ai} className="text-gray-300 text-sm leading-relaxed flex items-start gap-2">
                                                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                                                                        {act}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            {day.meals?.length > 0 && (
                                                                <div className="flex gap-2">
                                                                    {day.meals.map((m, mi) => (
                                                                        <span key={mi} className="px-3 py-1 border border-white/20 text-white/70 text-xs font-medium rounded-full">
                                                                            {m}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.section>

                        {/* ── Inclusions / Exclusions ── */}
                        {(packageData.facilities?.included?.length > 0 || packageData.facilities?.excluded?.length > 0) && (
                            <motion.section variants={fadeUp} initial="initial" animate="animate">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">What's Included</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {packageData.facilities?.included?.length > 0 && (
                                        <div>
                                            <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3">Included</p>
                                            <div className="space-y-2">
                                                {packageData.facilities.included.map((item, i) => (
                                                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                                                        <div className="mt-0.5 flex-shrink-0"><CheckIcon /></div>
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {packageData.facilities?.excluded?.length > 0 && (
                                        <div>
                                            <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">Excluded</p>
                                            <div className="space-y-2">
                                                {packageData.facilities.excluded.map((item, i) => (
                                                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                                                        <div className="mt-0.5 flex-shrink-0"><XIcon /></div>
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.section>
                        )}

                        {/* ── Tour Map ── */}
                        <motion.section variants={fadeUp} initial="initial" animate="animate">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Tour Map</h2>
                            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: 280 }}>
                                {packageData.locationMap?.mapEmbedUrl ? (
                                    <iframe
                                        src={packageData.locationMap.mapEmbedUrl}
                                        width="100%" height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen loading="lazy" title="Tour Map"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                        📍 Map not available
                                    </div>
                                )}
                            </div>
                        </motion.section>

                        {/* ── Nearby Attractions ── */}
                        {packageData.nearbyAttractions?.length > 0 && (
                            <motion.section variants={fadeUp} initial="initial" animate="animate">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Attractions</h2>
                                <div className="space-y-3">
                                    {packageData.nearbyAttractions.map((a, i) => (
                                        <div key={i} className="flex gap-4 items-start p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
                                            {a.image && <img src={a.image} alt={a.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />}
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">{a.name}</p>
                                                <p className="text-xs text-green-600 font-medium mt-0.5">{[a.distance, a.duration].filter(Boolean).join(' · ')}</p>
                                                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{a.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* ── Reviews Section ── */}
                        <motion.section variants={fadeUp} initial="initial" animate="animate">
                            <h2 className="text-xl font-bold text-gray-900 mb-5">Reviews</h2>

                            {/* Big rating number */}
                            <div className="flex items-end gap-2 mb-6">
                                <span className="text-5xl font-bold text-gray-900 leading-none">{packageData.rating}</span>
                                <span className="text-gray-400 text-base mb-1">/5</span>
                            </div>

                            {/* Rating bars */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                                {ratingCategories.map((rc, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500 w-20 flex-shrink-0">{rc.label}</span>
                                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(rc.value / 5) * 100}%` }}
                                                transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                                                className="h-full bg-gray-800 rounded-full"
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 w-10 text-right">{rc.value}/5</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* ── Add a Review ── */}
                        <motion.section variants={fadeUp} initial="initial" animate="animate" className="bg-gray-50 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Add a review</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Be the first to review <span className="font-medium text-gray-700">{packageData.title}</span>
                            </p>

                            {/* Star rating picker */}
                            <div className="flex gap-1 mb-4">
                                {[1,2,3,4,5].map(s => (
                                    <button key={s} className="hover:scale-110 transition-transform">
                                        <StarIcon filled={s <= 4} size={22} />
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={reviewText}
                                    onChange={e => setReviewText(e.target.value)}
                                    placeholder="Share your thoughts…"
                                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    className="px-5 py-3 bg-green-500 text-white text-sm font-bold rounded-xl hover:bg-green-600 transition-colors shadow-sm shadow-green-200 flex items-center gap-2"
                                >
                                    Post it!
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                                    </svg>
                                </motion.button>
                            </div>
                        </motion.section>

                        {/* ── Comments ── */}
                        {packageData.reviews?.length > 0 && (
                            <motion.section variants={fadeUp} initial="initial" animate="animate">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-lg font-bold text-gray-900">{packageData.reviews.length} comments</h3>
                                    <select className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white">
                                        <option>Newest</option>
                                        <option>Oldest</option>
                                        <option>Highest rated</option>
                                    </select>
                                </div>

                                <div className="space-y-5">
                                    {packageData.reviews.map((rev, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                            className="flex gap-3.5"
                                        >
                                            {/* Avatar */}
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                {rev.user[0]}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-1">
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">{rev.user}</p>
                                                        <p className="text-xs text-gray-400">{rev.date || 'about 1 hour ago'}</p>
                                                    </div>
                                                    <div className="flex gap-0.5">
                                                        {[...Array(5)].map((_, si) => <StarIcon key={si} filled={si < Math.floor(rev.rating)} size={12} />)}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed">{rev.comment}</p>
                                                <div className="flex gap-4 mt-2">
                                                    <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium">Like</button>
                                                    <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium">Reply</button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </div>

                    {/* ══════════════ RIGHT — BOOKING SIDEBAR ══════════════ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                    >
                        <div className="sticky top-20 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg shadow-gray-100">

                            {/* Price row */}
                            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                                <div className="flex items-baseline gap-2 mb-1">
                                    {packageData.originalPrice > packageData.discountedPrice && (
                                        <span className="text-base text-gray-400 line-through">{fmt(packageData.originalPrice)}</span>
                                    )}
                                    <span className="text-3xl font-bold text-gray-900">{fmt(packageData.discountedPrice)}</span>
                                    <span className="text-sm text-gray-400 font-normal">/person</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <StarIcon filled size={14} />
                                    <span className="text-sm font-semibold text-gray-700">{packageData.rating}</span>
                                    <span className="text-sm text-gray-400">({packageData.reviewCount} reviews)</span>
                                </div>
                            </div>

                            <div className="px-6 py-5 space-y-4">

                                {/* Date + Guests row */}
                                <div className="grid grid-cols-2 border border-gray-200 rounded-xl overflow-hidden">
                                    <div className="px-3.5 py-3 border-r border-gray-200">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Date</p>
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                                            <CalendarIcon />
                                            <span>{packageData.startDate || 'May 15, 2024'}</span>
                                        </div>
                                    </div>
                                    <div className="px-3.5 py-3">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Guests</p>
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                                            <UserIcon />
                                            <span>{guests} guests</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Check In */}
                                <div>
                                    <label className="block text-[10.5px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Check In</label>
                                    <select className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none bg-white hover:border-gray-300 transition-colors">
                                        {packageData.availableDates?.map((d, i) => <option key={i}>{d}</option>) ?? <option>May 15, 2024</option>}
                                    </select>
                                </div>

                                {/* Check Out */}
                                <div>
                                    <label className="block text-[10.5px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Check Out</label>
                                    <select className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none bg-white hover:border-gray-300 transition-colors">
                                        <option>May 18, 2024</option>
                                        <option>May 20, 2024</option>
                                        <option>May 22, 2024</option>
                                    </select>
                                </div>

                                {/* Activity */}
                                <div>
                                    <label className="block text-[10.5px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Activity</label>
                                    <select className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none bg-white hover:border-gray-300 transition-colors">
                                        <option>Airplane</option>
                                        <option>Bus</option>
                                        <option>Train</option>
                                        <option>Ship</option>
                                    </select>
                                </div>

                                {/* Total Night / Guests counter */}
                                <div>
                                    <label className="block text-[10.5px] font-bold uppercase tracking-widest text-gray-400 mb-2">Total Guests</label>
                                    <div className="flex items-center gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                            onClick={() => setGuests(g => Math.max(1, g - 1))}
                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-500 transition-colors"
                                        >
                                            <MinusIcon />
                                        </motion.button>
                                        <motion.span
                                            key={guests}
                                            initial={{ scale: 1.2 }}
                                            animate={{ scale: 1 }}
                                            className="text-lg font-bold text-gray-900 w-6 text-center"
                                        >
                                            {guests}
                                        </motion.span>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                            onClick={() => setGuests(g => g + 1)}
                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-500 transition-colors"
                                        >
                                            <PlusIcon />
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Total + Book */}
                                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                    <div>
                                        <motion.p
                                            key={guests}
                                            initial={{ scale: 1.1, opacity: 0.6 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-2xl font-bold text-gray-900"
                                        >
                                            {fmt(totalPrice)}
                                        </motion.p>
                                        <p className="text-xs text-gray-400">Total for {guests} {guests === 1 ? 'person' : 'peoples'}</p>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.04, boxShadow: '0 8px 20px rgba(34,197,94,0.3)' }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors shadow-md shadow-green-200"
                                    >
                                        Book now
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </motion.button>
                                </div>

                                {/* Contact Agent */}
                                <button className="w-full py-3 border-2 border-gray-200 hover:border-green-400 text-gray-600 hover:text-green-600 text-sm font-semibold rounded-xl transition-all duration-200">
                                    Contact Agent
                                </button>
                            </div>

                            {/* Help / contact */}
                            {(packageData.pointOfContact?.tourManager?.phone || packageData.pointOfContact?.tourManager?.email) && (
                                <div className="px-6 pb-5 pt-2 border-t border-gray-100 space-y-2">
                                    <p className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400 mb-2">Need Help?</p>
                                    {packageData.pointOfContact.tourManager.phone && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <div className="text-green-500"><PhoneIcon /></div>
                                            {packageData.pointOfContact.tourManager.phone}
                                        </div>
                                    )}
                                    {packageData.pointOfContact.tourManager.email && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <div className="text-green-500"><MailIcon /></div>
                                            {packageData.pointOfContact.tourManager.email}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Cancellation */}
                            {packageData.cancellationPolicy?.before30Days && (
                                <div className="px-6 pb-5 text-xs text-gray-400 italic leading-relaxed">
                                    <span className="font-semibold not-italic text-gray-500">Cancellation: </span>
                                    {packageData.cancellationPolicy.before30Days}
                                </div>
                            )}
                        </div>
                    </motion.div>

                </div>
            </div>
        </motion.div>
    );
}
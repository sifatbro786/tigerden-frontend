import { useState } from "react";
import { Heart, Calendar, ArrowLeft, ArrowRight, X, Clock, User, Tag, Share2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── BlogCard Component ──────────────────────────────────────────────────────
const BlogCard = ({ blog, onClick }) => {
    const [isLiked, setIsLiked] = useState(blog.isLiked);
    const [imageError, setImageError] = useState(false);

    const handleLikeClick = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const fallbackImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=600";

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={onClick}
            className="flex flex-col group cursor-pointer"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-[32px] mb-6">
                <img
                    src={imageError ? fallbackImage : blog.image}
                    alt={blog.title}
                    onError={() => setImageError(true)}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Heart Icon */}
                <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLikeClick}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors z-10"
                >
                    <Heart
                        size={20}
                        className={isLiked ? "fill-pink-500 text-pink-500" : "text-gray-400"}
                    />
                </motion.button>

                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full z-10">
                    {blog.category}
                </span>

                {/* Overlay Read More Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <motion.button 
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold shadow-lg"
                    >
                        Read Article
                    </motion.button>
                </div>
            </div>

            {/* Content */}
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{blog.readTime}</span>
                </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                {blog.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                {blog.description}
            </p>
        </motion.div>
    );
};

// ─── BlogModal Component ─────────────────────────────────────────────────────
const BlogModal = ({ blog, onClose }) => {
    if (!blog) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header with Image */}
                <div className="relative h-[400px]">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Close Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                    >
                        <X size={20} className="text-gray-700" />
                    </motion.button>

                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full z-10">
                        {blog.category}
                    </span>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h2>
                        <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{blog.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{blog.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags?.map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {blog.fullContent || blog.description}
                        </p>
                        
                        {blog.sections?.map((section, idx) => (
                            <div key={idx} className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h3>
                                <p className="text-gray-600 leading-relaxed">{section.content}</p>
                            </div>
                        ))}

                        {/* Travel Tips Section */}
                        {blog.tips && (
                            <div className="bg-emerald-50 rounded-2xl p-6 my-8">
                                <h3 className="text-lg font-bold text-emerald-800 mb-3 flex items-center gap-2">
                                    <span>💡</span> Pro Travel Tips
                                </h3>
                                <ul className="space-y-2">
                                    {blog.tips.map((tip, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                                            <span className="text-emerald-500 mt-1">✓</span>
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Share Section */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors">
                                <Heart size={20} />
                                <span>{blog.likes || 0} Likes</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors">
                                <MessageCircle size={20} />
                                <span>{blog.comments || 0} Comments</span>
                            </button>
                        </div>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors">
                            <Share2 size={20} />
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─── TravelTips Component ────────────────────────────────────────────────────
const TravelTips = () => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const blogsPerPage = 3;

    const blogs = [
        {
            image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=600",
            title: "Pack Wisely: Essential Travel Items You Shouldn't Miss",
            description: "Discover the ultimate packing list that seasoned travelers swear by. From versatile clothing to must-have gadgets.",
            date: "25 May, 2024",
            readTime: "5 min read",
            category: "Travel Tips",
            author: "Sarah Johnson",
            isLiked: true,
            likes: 245,
            comments: 18,
            tags: ["Packing", "Travel Gear", "Organization"],
            fullContent: "Packing for a trip can be overwhelming, but with the right strategy, you can travel light and smart. Start by choosing versatile clothing items that can be mixed and matched. Roll your clothes instead of folding to save space and prevent wrinkles. Always pack a small first-aid kit, power bank, and universal adapter. Remember to leave some space for souvenirs!",
            sections: [
                {
                    heading: "The Art of Minimalist Packing",
                    content: "The key to stress-free travel is packing only what you truly need. Create a capsule wardrobe with neutral colors that can be dressed up or down. Limit yourself to 3 pairs of shoes maximum: comfortable walking shoes, dress shoes, and sandals or flip-flops."
                },
                {
                    heading: "Tech Essentials for Modern Travelers",
                    content: "Don't forget your tech gear! A portable charger is essential for long days of exploration. Noise-canceling headphones can transform a noisy flight into a peaceful experience. Consider bringing a multi-port USB charger to charge multiple devices simultaneously."
                }
            ],
            tips: [
                "Roll clothes instead of folding to maximize space",
                "Use packing cubes to stay organized",
                "Pack a reusable water bottle to stay hydrated",
                "Bring a scarf - it works as blanket, pillow, or fashion accessory",
                "Download offline maps and translation apps before departure"
            ]
        },
        {
            image: "https://images.unsplash.com/photo-1518548419970-58e3b2a1952d?auto=format&fit=crop&q=80&w=600",
            title: "Introducing Bali: The Island of Gods",
            description: "Explore the enchanting beauty of Bali - from pristine beaches to ancient temples and vibrant culture.",
            date: "20 May, 2024",
            readTime: "7 min read",
            category: "Destination Guide",
            author: "Michael Chen",
            isLiked: false,
            likes: 189,
            comments: 12,
            tags: ["Bali", "Indonesia", "Culture", "Beach"],
            sections: [
                {
                    heading: "Why Bali Should Be Your Next Destination",
                    content: "Bali offers something for every type of traveler. Whether you're seeking spiritual enlightenment, adventure sports, or simply relaxation on pristine beaches, this Indonesian paradise delivers. The unique blend of Hindu culture, stunning natural landscapes, and warm hospitality makes Bali truly special."
                },
                {
                    heading: "Must-Visit Places in Bali",
                    content: "Don't miss the iconic Tanah Lot Temple perched on a rocky outcrop, the serene rice terraces of Ubud, and the stunning beaches of Uluwatu. For culture enthusiasts, attend a traditional Kecak fire dance at sunset for an unforgettable experience."
                }
            ],
            tips: [
                "Visit during shoulder season (April-June or September) for fewer crowds",
                "Rent a scooter for easy exploration, but always wear a helmet",
                "Learn a few basic Indonesian phrases - locals appreciate the effort",
                "Try local warungs for authentic and affordable Balinese cuisine",
                "Respect temple dress codes - always wear a sarong"
            ]
        },
        {
            image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=600",
            title: "How to Navigate with Traditional Maps",
            description: "In the age of smartphones, discover why paper maps are still an essential travel skill and how to use them effectively.",
            date: "15 May, 2024",
            readTime: "4 min read",
            category: "Travel Skills",
            author: "David Martinez",
            isLiked: false,
            likes: 134,
            comments: 8,
            tags: ["Navigation", "Outdoors", "Adventure"],
            sections: [
                {
                    heading: "Why Learn Map Reading?",
                    content: "While GPS and smartphones are convenient, they can fail when you need them most. Batteries die, signals drop, and devices can get damaged. Understanding how to read a physical map is a valuable skill that can save you in emergencies and enhance your travel experience."
                },
                {
                    heading: "Basic Map Reading Skills",
                    content: "Start by understanding map symbols and legends. Learn to orient the map using a compass or landmarks. Practice estimating distances using the map scale. These fundamental skills will help you navigate confidently in any situation."
                }
            ],
            tips: [
                "Always carry a physical map as backup, even when using GPS",
                "Mark your route and important landmarks before starting your journey",
                "Learn to identify north using natural indicators like the sun or stars",
                "Practice map reading in familiar areas before relying on it in unfamiliar territory",
                "Waterproof your map with a ziplock bag or map case"
            ]
        },
        {
            image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=600",
            title: "Budget Travel: See the World Without Breaking the Bank",
            description: "Expert tips and strategies for traveling on a budget while still having amazing experiences.",
            date: "10 May, 2024",
            readTime: "6 min read",
            category: "Budget Travel",
            author: "Emma Wilson",
            isLiked: true,
            likes: 312,
            comments: 22,
            tags: ["Budget", "Money Saving", "Backpacking"],
            sections: [
                {
                    heading: "Smart Money Strategies for Travelers",
                    content: "Traveling doesn't have to be expensive. With careful planning and smart choices, you can explore the world on a modest budget. Use flight comparison tools, travel during off-peak seasons, and consider alternative accommodations like hostels or homestays."
                },
                {
                    heading: "Eating Well on a Budget",
                    content: "One of the biggest travel expenses is food. Save money by shopping at local markets, cooking some meals yourself, and eating where locals eat. Street food is often not only cheaper but also more authentic than tourist restaurants."
                }
            ],
            tips: [
                "Book flights on Tuesday or Wednesday for better deals",
                "Use public transportation instead of taxis",
                "Take advantage of free walking tours in major cities",
                "Travel overnight on buses or trains to save on accommodation",
                "Get a travel rewards credit card for points and miles"
            ]
        },
        {
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600",
            title: "Solo Travel: Embracing the Journey Alone",
            description: "Everything you need to know about traveling solo - from safety tips to making friends on the road.",
            date: "5 May, 2024",
            readTime: "8 min read",
            category: "Solo Travel",
            author: "Alex Thompson",
            isLiked: false,
            likes: 278,
            comments: 31,
            tags: ["Solo Travel", "Safety", "Social"],
            sections: [
                {
                    heading: "The Joys of Solo Travel",
                    content: "Traveling alone is one of the most liberating experiences you can have. You set your own schedule, make spontaneous decisions, and learn to rely on yourself. Solo travel pushes you out of your comfort zone and helps you grow as a person."
                },
                {
                    heading: "Staying Safe as a Solo Traveler",
                    content: "While solo travel is generally safe, it's important to take precautions. Research your destination thoroughly, share your itinerary with someone back home, and trust your instincts. Stay in well-reviewed accommodations and avoid walking alone late at night in unfamiliar areas."
                }
            ],
            tips: [
                "Stay in social hostels to meet other travelers",
                "Join group tours or activities to connect with people",
                "Keep digital and physical copies of important documents",
                "Learn basic self-defense techniques before your trip",
                "Use apps like Meetup or Couchsurfing to find local events"
            ]
        },
        {
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600",
            title: "Sustainable Travel: Exploring Responsibly",
            description: "How to minimize your environmental impact while traveling and support local communities.",
            date: "1 May, 2024",
            readTime: "5 min read",
            category: "Eco-Travel",
            author: "Lisa Green",
            isLiked: true,
            likes: 201,
            comments: 15,
            tags: ["Sustainability", "Eco-Friendly", "Responsible Travel"],
            sections: [
                {
                    heading: "Why Sustainable Travel Matters",
                    content: "Tourism can have significant environmental and social impacts on destinations. By traveling sustainably, you help preserve natural environments and support local economies. Small changes in how you travel can make a big difference."
                },
                {
                    heading: "Practical Eco-Friendly Travel Tips",
                    content: "Choose eco-certified accommodations, reduce plastic waste by carrying reusable items, and respect wildlife by observing from a distance. Support local businesses and artisans rather than international chains."
                }
            ],
            tips: [
                "Carry a reusable water bottle, shopping bag, and utensils",
                "Choose direct flights to reduce carbon emissions",
                "Stay on marked trails to protect fragile ecosystems",
                "Avoid animal attractions that exploit wildlife",
                "Offset your carbon footprint through verified programs"
            ]
        }
    ];

    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const currentBlogs = blogs.slice(
        currentPage * blogsPerPage,
        (currentPage + 1) * blogsPerPage
    );

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    };

    return (
        <>
            <section className="py-20 px-4 md:px-16 bg-white">
                <div className="max-w-7xl mx-auto">
                    {/* Header with Navigation */}
                    <div className="flex justify-between items-end mb-12">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="max-w-2xl"
                        >
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                                Travel Tips & Advice
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                Discover expert travel tips, destination guides, and practical advice 
                                to make your journey unforgettable. From packing hacks to cultural insights, 
                                we've got you covered.
                            </p>
                        </motion.div>

                        <div className="hidden md:flex gap-4">
                            <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePrevPage}
                                disabled={currentPage === 0}
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                                    currentPage === 0 
                                        ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                                        : 'border-gray-200 text-gray-400 hover:border-gray-900 hover:text-gray-900'
                                }`}
                            >
                                <ArrowLeft size={20} />
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages - 1}
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                                    currentPage === totalPages - 1
                                        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                        : 'border-gray-200 text-gray-400 hover:border-gray-900 hover:text-gray-900'
                                }`}
                            >
                                <ArrowRight size={20} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {currentBlogs.map((blog, index) => (
                            <BlogCard 
                                key={index} 
                                blog={blog} 
                                onClick={() => setSelectedBlog(blog)}
                            />
                        ))}
                    </div>

                    {/* Page Indicators */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8 md:hidden">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        i === currentPage
                                            ? "w-6 bg-gray-900"
                                            : "w-2 bg-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {selectedBlog && (
                    <BlogModal 
                        blog={selectedBlog} 
                        onClose={() => setSelectedBlog(null)} 
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default TravelTips;
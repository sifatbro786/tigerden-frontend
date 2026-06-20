import ScrollToTop from "../../components/ScrollToTop";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const blogPosts = [
    {
        id: 1,
        title: "The Future of Organic Farming in Bangladesh",
        summary:
            "Discover how modern techniques and technology are shaping the future of sustainable farming in rural Bangladesh.",
        image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D",
        slug: "/blog/future-of-organic-farming",
    },
    {
        id: 2,
        title: "Dairy Farming Best Practices",
        summary:
            "Maximize milk yield and animal health with these proven strategies for your dairy farm.",
        image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhcm1pbmd8ZW58MHx8MHx8fDA%3D",
        slug: "/blog/dairy-farming-tips",
    },
    {
        id: 3,
        title: "How to Grow and Sell Organic Vegetables",
        summary:
            "A step-by-step guide to growing fresh, organic vegetables and turning them into profit.",
        image: "https://plus.unsplash.com/premium_photo-1663926032113-cc8eee2268e1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b3JnYW5pYyUyMHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D",
        slug: "/blog/grow-sell-vegetables",
    },
];

const Blog = () => {
    return (
        <div className="section-padding bg-gradient-to-br from-green-50 via-white to-lime-100 min-h-screen">
            <ScrollToTop />

            {/* Hero */}
            <div className="text-center py-16 px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
                    Farm Fresh News & Tips 🌱
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Get the latest stories, agricultural trends, and tips from our farming experts.
                </p>
            </div>

            {/* Blog Cards */}
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-20">
                {blogPosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-6 flex flex-col justify-between h-full">
                            <h2 className="text-xl font-bold text-green-700 mb-2">{post.title}</h2>
                            <p className="text-gray-600 text-sm mb-4">{post.summary}</p>
                            <Link
                                to={post.slug}
                                className="text-green-700 font-semibold hover:underline text-sm"
                            >
                                Read more →
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Blog;

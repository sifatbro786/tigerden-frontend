import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function UnderConstructionPage() {
    return (
        <div className="md:min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center md:items-start justify-center px-4 py-14 md:py-0 md:pt-32 ">
            <div className="max-w-6xl w-full grid md:grid-cols-2 items-center gap-10">
                {/* Left: Text content */}
                <div className="text-center md:text-left space-y-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-green-900">
                        Website Is <br />
                        <span className="pt-0.5">Under Maintenance</span>
                    </h1>
                    <p className="text-green-800 text-sm md:text-base leading-relaxed">
                        We're currently working hard to improve our website and will be ready to
                        launch soon. Thank you for your patience! Stay tuned for something amazing.
                        🚧
                    </p>
                    <Link to="/" passHref>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-orange-500 text-white font-medium px-6 py-2 rounded-md shadow-md cursor-pointer"
                        >
                            Back to Homepage
                        </motion.button>
                    </Link>
                </div>

                {/* Right: Image + Alert Icon */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="relative mt-3 md:mt-0"
                >
                    <img
                        src="https://cdn.vectorstock.com/i/500p/88/12/grunge-green-under-maintenance-word-square-rubber-vector-56098812.jpg"
                        alt="Under Construction"
                        className="w-full max-w-[420px] mx-auto object-cover rounded-xl"
                    />

                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-5 left-1/2 -translate-x-1/2"
                    >
                        <AlertTriangle className="w-10 h-10 text-orange-500 animate-pulse" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

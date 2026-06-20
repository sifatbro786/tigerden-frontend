import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productsData from "../../data/products.json";
import { ShoppingCart } from "lucide-react";

export default function ProductDetails() {
    const { slug } = useParams();
    const [mainImageIndex, setMainImageIndex] = useState(0);

    // Find the product by slug
    let product = null;

    for (const category of productsData.products) {
        product = category.items.find(
            (item) =>
                item.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "") === slug,
        );
        if (product) {
            product = {
                ...product,
                category: category.category,
                images: product.images.map((img) =>
                    img.startsWith("http") ? img : `https://example.com${img}`,
                ),
            };
            break;
        }
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-green-800 mb-4">Product Not Found</h1>
                    <p className="text-lg text-gray-600">
                        The product you're looking for doesn't exist.
                    </p>
                </div>
            </div>
        );
    }

    const handleThumbnailClick = (index) => {
        setMainImageIndex(index);
    };

    return (
        <div className="min-h-screen  py-12 px-6">
            <div className="container mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Images */}
                        <div className="p-6">
                            <div className="h-96 rounded-lg overflow-hidden mb-4">
                                <img
                                    src={product.images[mainImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/600x600?text=Image+Not+Found";
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`h-20 rounded overflow-hidden cursor-pointer border-2 ${mainImageIndex === index ? "border-green-500" : "border-transparent"}`}
                                        onClick={() => handleThumbnailClick(index)}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://via.placeholder.com/150?text=Thumbnail";
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                            <div className="mb-4">
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    {product.category}
                                </span>
                                <h1 className="text-3xl font-bold text-green-900 mt-2">
                                    {product.name}
                                </h1>
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-lg text-gray-700 ml-1">
                                        {product.rating}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-2xl font-bold text-green-800">
                                    ৳ {product.price}
                                </p>
                                <p className="text-gray-500 mt-1">
                                    Available in: {product.weight_options.join(", ")}
                                </p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-green-900 mb-2">
                                    Description
                                </h2>
                                <p className="text-gray-700">{product.description}</p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-green-900 mb-2">
                                    Features
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-green-900 mb-2">
                                    Shelf Life
                                </h2>
                                <p className="text-gray-700">{product.shelf_life}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <select className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                                    {product.weight_options.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-200">
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

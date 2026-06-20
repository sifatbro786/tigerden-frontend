import React, { useState } from "react";
import { ShoppingCart, Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import productsData from "../../data/products.json";
import ScrollToTop from "../../components/ScrollToTop";

export default function ShoppingPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    // Get all unique categories from the data
    const categories = [
        "All",
        ...new Set(productsData.products.map((product) => product.category)),
    ];

    // Filter products
    const filteredProducts = productsData.products.flatMap((categoryData) => {
        if (selectedCategory !== "All" && categoryData.category !== selectedCategory) {
            return [];
        }

        return categoryData.items
            .map((item) => ({
                ...item,
                category: categoryData.category,
                image:
                    item.images && item.images.length > 0
                        ? item.images[0].startsWith("http")
                            ? item.images[0]
                            : `https://example.com${item.images[0]}`
                        : "https://via.placeholder.com/300",
                slug: item.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, ""),
            }))
            .filter(
                (item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchTerm.toLowerCase()),
            );
    });

    // Get current products for pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Reset to first page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100">
            <ScrollToTop />
            {/* Mobile filter dialog */}
            <div
                className={`fixed inset-0 z-40 lg:hidden ${mobileFiltersOpen ? "block" : "hidden"}`}
            >
                <div
                    className="fixed inset-0 bg-black bg-opacity-25"
                    onClick={() => setMobileFiltersOpen(false)}
                />
                <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-lg overflow-y-auto">
                    <div className="p-4 flex items-center justify-between border-b">
                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                        <button
                            type="button"
                            className="-mr-2 w-10 h-10 flex items-center justify-center"
                            onClick={() => setMobileFiltersOpen(false)}
                        >
                            <X className="h-6 w-6 text-gray-500" />
                        </button>
                    </div>

                    {/* Mobile filter content */}
                    <div className="p-4">
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <div key={category} className="flex items-center">
                                        <input
                                            id={`mobile-filter-${category}`}
                                            name="category"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 rounded text-green-600 focus:ring-green-500"
                                            checked={selectedCategory === category}
                                            onChange={() => {
                                                setSelectedCategory(category);
                                                setMobileFiltersOpen(false);
                                            }}
                                        />
                                        <label
                                            htmlFor={`mobile-filter-${category}`}
                                            className="ml-3 text-gray-600"
                                        >
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-green-800">Farm Fresh Products</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Direct from our farm to your table!
                    </p>
                </div>

                {/* Mobile filter button */}
                <div className="lg:hidden mb-6">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        onClick={() => setMobileFiltersOpen(true)}
                    >
                        <Filter className="h-5 w-5 mr-2 text-gray-500" />
                        Filters
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop sidebar filters */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                            <div className="relative mb-6">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">
                                    Categories
                                </h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <div key={category} className="flex items-center">
                                            <input
                                                id={`filter-${category}`}
                                                name="category"
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 rounded text-green-600 focus:ring-green-500"
                                                checked={selectedCategory === category}
                                                onChange={() => setSelectedCategory(category)}
                                            />
                                            <label
                                                htmlFor={`filter-${category}`}
                                                className="ml-3 text-gray-600"
                                            >
                                                {category}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="flex-1">
                        {/* Products Grid */}
                        {currentProducts.length > 0 ? (
                            <>
                                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                                    {currentProducts.map((product, index) => (
                                        <Link
                                            to={`/products/${product.slug}`}
                                            key={`${product.category}-${product.name}-${index}`}
                                            className="block"
                                        >
                                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.target.src =
                                                            "https://via.placeholder.com/300";
                                                    }}
                                                />
                                                <div className="p-5">
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="text-xl font-semibold text-green-900">
                                                            {product.name}
                                                        </h3>
                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                            {product.category}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                        {product.description}
                                                    </p>
                                                    <div className="flex items-center mt-2">
                                                        <span className="text-yellow-500">★</span>
                                                        <span className="text-sm text-gray-700 ml-1">
                                                            {product.rating}
                                                        </span>
                                                    </div>
                                                    <div className="mt-3 flex justify-between items-center">
                                                        <p className="text-lg font-medium text-gray-700">
                                                            ৳ {product.price}
                                                        </p>
                                                        <span className="text-sm text-gray-500">
                                                            {product.weight_options[0]}
                                                        </span>
                                                    </div>
                                                    <button
                                                        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <ShoppingCart className="h-5 w-5 mr-2" />
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="mt-12 flex items-center justify-center">
                                    <nav className="flex items-center space-x-2">
                                        <button
                                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className={`p-2 rounded-full ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-green-600 hover:bg-green-100"}`}
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                            (number) => (
                                                <button
                                                    key={number}
                                                    onClick={() => paginate(number)}
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === number ? "bg-green-600 text-white" : "text-green-600 hover:bg-green-100"}`}
                                                >
                                                    {number}
                                                </button>
                                            ),
                                        )}

                                        <button
                                            onClick={() =>
                                                paginate(Math.min(totalPages, currentPage + 1))
                                            }
                                            disabled={currentPage === totalPages}
                                            className={`p-2 rounded-full ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-green-600 hover:bg-green-100"}`}
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </nav>
                                </div>

                                {/* Product count */}
                                <div className="mt-4 text-center text-gray-600">
                                    Showing {indexOfFirstProduct + 1}-
                                    {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                                    {filteredProducts.length} products
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-600 text-lg">
                                    No products found. Try a different search or category.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

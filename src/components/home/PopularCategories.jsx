import SectionHeader from "../common/SectionHeader";
import { Link } from "react-router-dom";

const PopularCategories = () => {
    const categories = [
        {
            id: 1,
            name: "Cow Meat",
            image: "https://chefsmandala.com/wp-content/uploads/2018/03/Beef-Shank.jpg",
            bgColor: "bg-green-200",
            exploreText: "Explore All",
        },
        {
            id: 2,
            name: "Indian Cow",
            image: "https://img.freepik.com/premium-photo/meat-white-background_308643-1566.jpg",
            bgColor: "bg-green-200",
            exploreText: "Explore All",
        },
        {
            id: 3,
            name: "Buffalo",
            image: "https://img.freepik.com/premium-photo/fresh-meats-white-background_41969-19019.jpg",
            bgColor: "bg-green-200",
            exploreText: "Explore All",
        },
        {
            id: 4,
            name: "Fruits",
            image: "/Categories/fruits.png",
            bgColor: "bg-white",
            exploreText: "Explore All",
        },
        {
            id: 5,
            name: "Milk",
            image: "https://www.thefrozengarden.com/cdn/shop/articles/benefits-of-whole-milk-benefits-of-drinking-whole-milk-blog-frozen-garden_e991a019-eebb-455b-99b2-96041863f037.webp?v=1706546802",
            bgColor: "bg-gray-200",
            exploreText: "Explore All",
        },
        {
            id: 6,
            name: "Purified milk",
            image: "https://www.shutterstock.com/image-vector/tall-glass-milk-carton-box-600nw-2017090295.jpg",
            bgColor: "bg-orange-200",
            exploreText: "Explore All",
        },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16">
            <div className="text-center mb-8 md:mb-12">
                {/* Header Section */}
                <SectionHeader paragraph="OUR BENEFIT" heading="Our Popular Categories" />

                {/* Left Side Content */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 mb-8 md:mb-12">
                    <div className="lg:w-1/3 text-center lg:text-left">
                        <p className="text-md md:text-lg text-gray-700 mb-4 md:mb-6">
                            Get the best organic & healthy food products from ROUF'S RIVERSIDE RANCH
                        </p>

                        {/* Cow Image - Hidden on small screens, shown on medium and up */}
                        <div className="hidden md:block mb-4 md:mb-6">
                            <img
                                src="/Categories/cow1.png"
                                alt="Cow"
                                className="w-32 md:w-48 h-32 md:h-48 object-cover rounded-lg mx-auto lg:mx-0"
                            />
                        </div>

                        {/* Vegetables Collection Image - Hidden on small screens, shown on medium and up */}
                        <div className="hidden md:block">
                            <img
                                src="/Categories/veg1.png"
                                className="w-full max-w-xs md:max-w-md h-48 md:h-64 object-cover rounded-lg  mx-auto lg:mx-0"
                            />
                        </div>
                    </div>

                    {/* Categories Grid */}
                    <div className="lg:w-2/3 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {categories.map((category) => (
                                <div key={category.id} className="group">
                                    <div
                                        className={`${category.bgColor} rounded-xl md:rounded-2xl p-3 md:p-0 transition-all duration-300 hover:shadow-lg md:hover:shadow-xl hover:scale-[1.02] md:hover:scale-105`}
                                    >
                                        {/* Category Image */}
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-[255px] h-[255px] object-cover mx-auto rounded-xl"
                                        />
                                    </div>

                                    {/* Category Info */}
                                    <div className="mt-3 md:mt-4 text-center">
                                        <h3 className="text-sm md:text-xl font-semibold text-gray-700 mb-1 md:mb-2">
                                            {category.name}
                                        </h3>
                                        <Link
                                            to={"/shopping"}
                                            className="text-base text-green-600 hover:text-green-700 transition-colors duration-200 font-medium cursor-pointer"
                                        >
                                            {category.exploreText}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularCategories;

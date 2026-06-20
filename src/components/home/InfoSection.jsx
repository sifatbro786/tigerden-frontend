export default function InfoSection() {
    return (
        <section className="max-w-[1170px] mx-auto bg-green-100 mt-10 md:mt-[75px]">
            <div className="max-w-6xl mx-auto px-[50px] py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Return Policy */}
                <div className="flex items-center justify-start gap-5">
                    <img src="/icons/icon.svg" alt="icon" className="w-10 md:w-auto" />
                    <div>
                        <h3 className="font-medium md:font-semibold text-gray-800 font-family-manrope text-sm md:text-base">
                            Return Policy
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 font-family-manrope">
                            Money Back Guarantee
                        </p>
                    </div>
                </div>

                {/* Free Shipping */}
                <div className="flex items-center justify-start gap-5 ">
                    <img src="/icons/icon1.svg" alt="icon" className="w-10 md:w-auto" />
                    <div>
                        <h3 className="font-medium md:font-semibold text-gray-800 font-family-manrope text-sm md:text-base">
                            Free Shipping
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 font-family-manrope">
                            On All Orders Over $45.00
                        </p>
                    </div>
                </div>

                {/* Store Locator */}
                <div className="flex items-center justify-start gap-5 ">
                    <img src="/icons/icon2.svg" alt="icon" className="w-10 md:w-auto" />
                    <div>
                        <h3 className="font-medium md:font-semibold text-gray-800 font-family-manrope text-sm md:text-base">
                            Store Locator
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 font-family-manrope">
                            Find Your Nearest Store
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

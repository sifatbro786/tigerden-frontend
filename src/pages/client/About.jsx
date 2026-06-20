import {
    ShieldCheck,
    Plane,
    Heart,
    Map,
    CheckCircle2,
    Users,
    Award,
    Clock,
    PhoneCall,
} from "lucide-react";
import AboutImage from "/about.jpg";

const AboutPage = () => {
    return (
        <div className="font-sans antialiased text-gray-900 bg-white">
            {/* 1. HERO SECTION (Full-Width, Left-Aligned) */}
            <section className="relative h-[85vh] w-full flex items-center overflow-hidden">
                {/* Background Image with Dark Gradient Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={AboutImage}
                        alt="Travel Journey"
                        className="w-full h-full object-cover object-bottom"
                    />
                    {/* Gradient: Black/60 to Transparent for left-side readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                            Your Trusted Partner for <br />
                            <span className="text-[#58C947]">Travel & Medical</span> Journeys
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-light">
                            Experience hassle-free visa processing, personalized tour packages, and
                            dedicated medical assistance in India with Tigerden Tourism.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. ABOUT STORY (2 Column) */}
            <section className="py-24 bg-gray-50 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-[#58C947]/10 rounded-2xl group-hover:bg-[#58C947]/20 transition-all"></div>
                        <img
                            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070&auto=format&fit=crop"
                            alt="Our Story"
                            className="relative rounded-2xl shadow-2xl"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-sm font-black text-[#58C947] uppercase tracking-[0.2em]">
                            Our Heritage
                        </h2>
                        <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                            We Redefine The Way You Explore The World
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Tigerden Tourism is a premier travel agency based in Dhaka, dedicated to
                            providing seamless travel solutions. We specialize in making travel
                            accessible, affordable, and stress-free for every traveler.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Whether you're planning a vacation, business trip, or seeking medical
                            treatment in India, our dedicated team ensures a hassle-free experience
                            through trust and reliability.
                        </p>
                        <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-2xl font-bold text-gray-900">Dhaka, BD</p>
                                <p className="text-sm text-gray-500">Headquarters</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">Global</p>
                                <p className="text-sm text-gray-500">Service Reach</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SERVICES GRID */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Comprehensive Solutions</h2>
                    <div className="w-20 h-1 bg-[#58C947] mx-auto"></div>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <ShieldCheck size={32} />,
                            title: "Visa Processing",
                            desc: "Expert documentation with high success rates for India, Thailand, & more.",
                        },
                        {
                            icon: <Map size={32} />,
                            title: "Tour Packages",
                            desc: "Customized holiday deals that fit your budget and preferences.",
                        },
                        {
                            icon: <Plane size={32} />,
                            title: "Air Ticketing",
                            desc: "Real-time booking for domestic and international airlines at competitive prices.",
                        },
                        {
                            icon: <Heart size={32} />,
                            title: "Medical Support",
                            desc: "Priority appointments with top specialized doctors and hospitals in India.",
                        },
                    ].map((service, idx) => (
                        <div
                            key={idx}
                            className="p-8 border border-gray-100 rounded-3xl hover:shadow-xl hover:-translate-y-2 transition-all group bg-white"
                        >
                            <div className="text-[#58C947] mb-6 group-hover:scale-110 transition-transform">
                                {service.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. WHY CHOOSE US */}
            <section className="py-24 bg-gray-50 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-8">Why Travelers Trust Us</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    title: "24/7 Dedicated Support",
                                    desc: "Always available to assist you throughout your journey.",
                                },
                                {
                                    title: "Transparent Pricing",
                                    desc: "No hidden costs, just honest and affordable rates.",
                                },
                                {
                                    title: "Certified Expertise",
                                    desc: "Years of experience in handling complex travel documentations.",
                                },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#58C947]/10 flex items-center justify-center text-[#58C947]">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900">{item.title}</h5>
                                        <p className="text-gray-500 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                        <h4 className="text-2xl font-bold mb-4 text-[#58C947]">Our Mission</h4>
                        <p className="italic text-gray-600 text-lg leading-relaxed">
                            "To redefine the travel experience by providing personalized services,
                            transparent pricing, and 24/7 customer support. We believe in building
                            long-term relationships with our clients through trust and reliability".
                        </p>
                    </div>
                </div>
            </section>

            {/* 5. STATS SECTION */}
            <section className="py-20 bg-white px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {[
                        {
                            num: "5K+",
                            label: "Happy Clients",
                            icon: <Users className="mx-auto mb-2 opacity-20" />,
                        },
                        {
                            num: "10+",
                            label: "Countries Covered",
                            icon: <Map className="mx-auto mb-2 opacity-20" />,
                        },
                        {
                            num: "98%",
                            label: "Visa Success",
                            icon: <ShieldCheck className="mx-auto mb-2 opacity-20" />,
                        },
                        {
                            num: "24/7",
                            label: "Expert Support",
                            icon: <Clock className="mx-auto mb-2 opacity-20" />,
                        },
                    ].map((stat, idx) => (
                        <div key={idx} className="p-6">
                            {stat.icon}
                            <p className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">
                                {stat.num}
                            </p>
                            <p className="text-gray-500 font-medium uppercase text-xs tracking-widest">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. HUMAN TOUCH SECTION */}
            <section className="py-24 px-6 bg-[#0A0D14] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex p-4 rounded-full bg-white/5 mb-8">
                        <Award className="text-[#58C947]" size={32} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                        Beyond Business, We Build Relationships
                    </h2>
                    <p className="text-xl text-gray-400 font-light leading-relaxed mb-10">
                        We understand that travel is personal. Whether it's a family vacation or a
                        critical medical journey to India, our team treats your trip as if it were
                        our own. Trust is our core currency.
                    </p>
                    <div className="flex justify-center items-center gap-4 text-left border-t border-white/10 pt-10">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#58C947] to-emerald-900 flex items-center justify-center font-black text-2xl">
                            TT
                        </div>
                        <div>
                            <p className="font-bold text-xl">The Tigerden Team</p>
                            <p className="text-[#58C947] text-sm">Dedicated To Your Journey</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. CTA SECTION (Light Emerald Tint) */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto bg-[#58C947]/5 rounded-[3rem] p-12 md:p-20 text-center border border-[#58C947]/10">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                        Visit us at House #20, Road #03, Block #C, Banasree, Dhaka or call us today
                        to get expert consultation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a
                            href="tel:+8801301281452"
                            className="flex items-center gap-3 text-2xl font-black text-gray-900 hover:text-[#58C947] transition-colors"
                        >
                            <PhoneCall className="text-[#58C947]" /> +88 01301-281452
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

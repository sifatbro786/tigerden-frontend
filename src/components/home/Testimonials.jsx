import { useState } from "react";

const testimonialsData = [
    {
        id: 1,
        name: "Isabelle O'Conner",
        role: "BA at Robin",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
        comment:
            "An enim nullam tempor gravida donec enim congue magna at pretium purus pretium ligula rutrum luctus risusd diam eget risus varius blandit sit amet non magna.",
    },
    {
        id: 2,
        name: "Mara Hilpert",
        role: "Web Designer",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
        comment:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
    },
    {
        id: 3,
        name: "John Doe",
        role: "Marketing Manager",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        comment:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.",
    },
    {
        id: 4,
        name: "Sarah Jenkins",
        role: "CEO at TechFlow",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
        comment:
            "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla.",
    },
];

const Testimonials = () => {
    const [activeTab, setActiveTab] = useState(testimonialsData[0]);

    return (
        <section className="bg-gray-100 py-20 px-16 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left Side: Header */}
                    <div>
                        <span className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4 block">
                            Testimonials
                        </span>
                        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-8">
                            What our happy <br /> clients say
                        </h2>
                        <button className="bg-white border border-gray-200 text-gray-900 px-8 py-3 rounded-full font-semibold shadow-sm hover:bg-gray-50 transition-all">
                            Contact Us
                        </button>
                    </div>

                    {/* Right Side: Active Review Card */}
                    <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-xl relative min-h-[350px] flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-8">
                            <img
                                src={activeTab.image}
                                alt={activeTab.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-pink-200"
                            />
                            <div>
                                <h4 className="font-bold text-xl text-gray-900">
                                    {activeTab.name}
                                </h4>
                                <p className="text-gray-400 text-sm">{activeTab.role}</p>
                            </div>
                        </div>
                        <p className="text-gray-500 text-lg leading-relaxed italic">
                            "{activeTab.comment}"
                        </p>
                    </div>
                </div>

                {/* Bottom Section: Tabs/Profiles */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {testimonialsData.map((client) => (
                        <div
                            key={client.id}
                            onClick={() => setActiveTab(client)}
                            className={`flex items-center gap-4 cursor-pointer pb-4 border-b-2 transition-all duration-300 ${
                                activeTab.id === client.id
                                    ? "border-gray-900"
                                    : "border-transparent opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                            }`}
                        >
                            <img
                                src={client.image}
                                alt={client.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h5 className="font-bold text-gray-900 text-sm">{client.name}</h5>
                                <p className="text-gray-400 text-xs">{client.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

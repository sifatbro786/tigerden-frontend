import { Lightbulb, Zap, Star } from "lucide-react";

const Card = ({ icon: Icon, color, title, description }) => (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start transition-all hover:shadow-md">
        <div className={`p-4 rounded-2xl mb-6 ${color}`}>
            <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
);

const TravelPerfection = () => {
    return (
        <section className="py-20 px-16 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center">
                {/* Header Section */}
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    3 STEPS FOR THE PERFECT TRIP
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    Find Travel Perfection
                </h2>
                <p className="max-w-2xl mx-auto text-gray-500 mb-10 leading-relaxed">
                    An enim nullam tempor gravida donec enim congue magna at pretium purus pretium
                    ligula rutrum luctus risusd diam eget risus varius blandit sit amet non magna.
                </p>

                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-colors mb-16">
                    Book now
                </button>

                {/* Cards Section */}
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    <Card
                        icon={Lightbulb}
                        color="bg-blue-400"
                        title="Tell us what you want to do"
                        description="Fully layered dolor sit amet, consectetur adipisicing elit. Facere, nobis, id expedita dolores officiis laboriosam."
                    />
                    <Card
                        icon={Zap}
                        color="bg-yellow-400"
                        title="Share your travel preference"
                        description="Fully layered dolor sit amet, consectetur adipisicing elit. Facere, nobis, id expedita dolores officiis laboriosam."
                    />
                    <Card
                        icon={Star}
                        color="bg-pink-400"
                        title="We’ll give you recommendations"
                        description="Fully layered dolor sit amet, consectetur adipisicing elit. Facere, nobis, id expedita dolores officiis laboriosam."
                    />
                </div>
            </div>
        </section>
    );
};

export default TravelPerfection;

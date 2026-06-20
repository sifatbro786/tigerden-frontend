import DiscoverWeekly from "../../components/home/DiscoverWeekly";
import HeroSection from "../../components/home/hero/HeroSection";
import TravelPerfection from "../../components/home/TravelPerfection";
import TravelGuideline from "../../components/home/TravelGuideline";
import PopularDestinations from "../../components/home/PopularDestinations";
import Testimonials from "../../components/home/Testimonials";
import VideoBanner from "../../components/home/VideoBanner";
import TravelTips from "../../components/home/TravelTips";

export default function HomePage() {
    return (
        <div className="font-family-manrope">
            <HeroSection />
            <DiscoverWeekly />
            <TravelPerfection />
            <TravelGuideline />
            <PopularDestinations />
            <Testimonials />
            <VideoBanner />
            <TravelTips />
        </div>
    );
}

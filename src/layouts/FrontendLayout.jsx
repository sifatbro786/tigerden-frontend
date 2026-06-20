import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function FrontendLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* ---- Header ---- */}
            <Header />

            {/* ---- Page Content ---- */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* ---- Footer ---- */}
            <Footer />
        </div>
    );
}

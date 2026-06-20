import { useAuth } from "../contexts/AuthContext";
import UnderConstructionPage from "../pages/client/UnderConstructionPage";

const PublicGuard = ({ children }) => {
    const { user } = useAuth();

    // allow homepage to be shown
    const currentPath = window.location.pathname;

    const isAllowed = currentPath === "/" || (user && user.role === "admin");

    if (!isAllowed) {
        return <UnderConstructionPage />;
    }

    return children;
};

export default PublicGuard;

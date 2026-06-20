"use client";
import { useNavigate } from "react-router-dom";
import ProjectCreate from "../dashboard/ProjectCreate";

export default function ProjectCreatePage() {
    const navigate = useNavigate();

    const handleSuccess = (newProject) => {
        navigate("/dashboard/projects");
    };

    const handleClose = () => {
        navigate("/dashboard/projects");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ProjectCreate onClose={handleClose} onSuccess={handleSuccess} />
        </div>
    );
}

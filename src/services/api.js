// src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        if (response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);

// Helper for multipart/form-data
export const formDataApi = {
    post: (url, data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (data[key] !== null && data[key] !== undefined) {
                if (Array.isArray(data[key])) {
                    const hasFiles = data[key].some((item) => item instanceof File);
                    if (hasFiles) {
                        // multi-image upload case (e.g. package images)
                        data[key].forEach((item) => {
                            if (item instanceof File) formData.append(key, item);
                        });
                    } else {
                        // primitive array (e.g. expertise) — always send, even if empty
                        formData.append(key, JSON.stringify(data[key]));
                    }
                } else if (data[key] instanceof File) {
                    formData.append(key, data[key]);
                } else if (typeof data[key] === "object" && !(data[key] instanceof File)) {
                    formData.append(key, JSON.stringify(data[key]));
                } else {
                    formData.append(key, data[key]);
                }
            }
        });
        return api.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
    put: (url, data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (data[key] !== null && data[key] !== undefined) {
                if (Array.isArray(data[key])) {
                    const hasFiles = data[key].some((item) => item instanceof File);
                    if (hasFiles) {
                        // multi-image upload case (e.g. package images)
                        data[key].forEach((item) => {
                            if (item instanceof File) formData.append(key, item);
                        });
                    } else {
                        // primitive array (e.g. expertise) — always send, even if empty
                        formData.append(key, JSON.stringify(data[key]));
                    }
                } else if (data[key] instanceof File) {
                    formData.append(key, data[key]);
                } else if (typeof data[key] === "object" && !(data[key] instanceof File)) {
                    formData.append(key, JSON.stringify(data[key]));
                } else {
                    formData.append(key, data[key]);
                }
            }
        });
        return api.put(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
};

// Page Meta API endpoints
export const pageMetaApi = {
    // Get all page meta entries
    getAll: () => api.get("/admin/page-meta"),

    // Get a single page meta by ID
    getById: (id) => api.get(`/admin/page-meta/${id}`),

    // Create a new page meta
    create: (data) => api.post("/admin/page-meta", data),

    // Update a page meta
    update: (id, data) => api.put(`/admin/page-meta/${id}`, data),

    // Delete a page meta
    delete: (id) => api.delete(`/admin/page-meta/${id}`),

    // Toggle active status
    toggleStatus: (id, updatedBy) => api.patch(`/admin/page-meta/${id}/toggle`, { updatedBy }),
};

export default api;

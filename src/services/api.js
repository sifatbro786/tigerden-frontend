import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);

// ─── FormData builder ──────────────────────────────────────────────────────────
// Handles: File (single), File[] (multi-upload), primitive[], object → JSON string
const buildFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        const val = data[key];
        if (val === null || val === undefined) return;

        if (Array.isArray(val)) {
            const hasFiles = val.some((item) => item instanceof File);
            if (hasFiles) {
                // multi-file upload (e.g. gallery) — append each File separately
                val.forEach((item) => {
                    if (item instanceof File) formData.append(key, item);
                });
            } else {
                // primitive/object array — JSON-stringify so backend can parse it
                formData.append(key, JSON.stringify(val));
            }
        } else if (val instanceof File) {
            // single file (e.g. coverImage)
            formData.append(key, val);
        } else if (typeof val === "object") {
            formData.append(key, JSON.stringify(val));
        } else {
            formData.append(key, val);
        }
    });
    return formData;
};

export const formDataApi = {
    post: (url, data) =>
        api.post(url, buildFormData(data), {
            headers: { "Content-Type": "multipart/form-data" },
        }),
    put: (url, data) =>
        api.put(url, buildFormData(data), {
            headers: { "Content-Type": "multipart/form-data" },
        }),
};

// ─── Namespaced API helpers ────────────────────────────────────────────────────
export const pageMetaApi = {
    getAll: () => api.get("/admin/page-meta"),
    getById: (id) => api.get(`/admin/page-meta/${id}`),
    create: (data) => api.post("/admin/page-meta", data),
    update: (id, data) => api.put(`/admin/page-meta/${id}`, data),
    delete: (id) => api.delete(`/admin/page-meta/${id}`),
    toggleStatus: (id, updatedBy) =>
        api.patch(`/admin/page-meta/${id}/toggle`, { updatedBy }),
};

export const contactApi = {
    getAll: (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        return api.get(`/admin/contact${qs ? `?${qs}` : ""}`);
    },
    getById: (id) => api.get(`/admin/contact/${id}`),
    updateStatus: (id, status) =>
        api.patch(`/admin/contact/${id}/status`, { status }),
};

export default api;
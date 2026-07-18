
// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://13.233.207.68:8000/api",
//     headers: {
//         "Content-Type": "application/json",
//     },
// });
// localStorage.setItem(
//     "token",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ6ZW5pdGhAZmp0Y28uY29tIiwidXNlcl9pZCI6Miwicm9sZSI6IkFkbWluIiwiZnVsbF9uYW1lIjoiWmVuaXRoIFVzZXIiLCJleHAiOjE3ODM2ODc0MTJ9.EfjiajLe2FimUpxaV1bnSq_dNt0OHj-lX9HnVEwSUZE"
// );
// // Automatically attach JWT token
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
// export default api;

import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: "http://13.233.207.68:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Temporary token (remove this in production)

// After successful login
//localStorage.setItem("token", response.data.access_token);
localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ6ZW5pdGhAZmp0Y28uY29tIiwidXNlcl9pZCI6Miwicm9sZSI6IkFkbWluIiwiZnVsbF9uYW1lIjoiWmVuaXRoIFVzZXIiLCJleHAiOjE3ODM2ODc0MTJ9.EfjiajLe2FimUpxaV1bnSq_dNt0OHj-lX9HnVEwSUZE"
);

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,

    (error) => {
        const status = error.response?.status;

        switch (status) {

            case 401:
                toast.error("Session expired. Please login again.");
                localStorage.removeItem("token");
                window.location.href = "/login";
                break;

            case 403:
                toast.error("Permission denied.");
                break;

            case 404:
                toast.error("Record not found.");
                break;

            case 500:
                toast.error("Server error. Please contact support.");
                break;

            default:
                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong."
                );
        }

        return Promise.reject(error);
    }
);

export default api;

import axios from "axios";

const api = axios.create({
    baseURL: "http://13.233.207.68:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});
localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ6ZW5pdGhAZmp0Y28uY29tIiwidXNlcl9pZCI6Miwicm9sZSI6IkFkbWluIiwiZnVsbF9uYW1lIjoiWmVuaXRoIFVzZXIiLCJleHAiOjE3ODM2MzI4MzN9.rMGO6wL6bh37-4mkwpJfoeTxpCDr8UzYnNjTdNZAGcI"
);
// Automatically attach JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default api;
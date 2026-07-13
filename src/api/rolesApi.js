import api from "./axios";

// Roles
export const addRole = (data) =>
    api.post("/admin/roles", data);

export const getRole = () =>
    api.get("/admin/roles");

export const updateRole = (roleCode, data) =>
    api.put(`/admin/roles/${roleCode}`, data);
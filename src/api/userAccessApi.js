
import api from "./axios";

export const getUserAccessSummary = () =>
  api.get("/admin/summary");

// Load selected access for a user
export const getUserAccess = (userProfileId) =>
    api.get(`/admin/users/${userProfileId}/access`);

// Save user access
export const saveUserAccess = (userProfileId, payload) =>
    api.post(`/admin/users/${userProfileId}/access`, payload);
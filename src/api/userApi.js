
import api from "./axios";

export const getUsers = () => {
  return api.get("/admin/users");
};

export const getSystemStatus = () => {
  return api.get("/admin/system/status");
};

export const getRoles = () => {
  return api.get("/admin/roles");
};

export const getLegalGroups = () => {
  return api.get("/admin/master/legal-groups");
};

export const addUser = (data) => {
  return api.post("/admin/users", data);
};

export const updateUser = (userProfileId, data) => {
  return api.put(`/admin/users/${userProfileId}`, data);
};

export const updateUserStatus = (userProfileId, payload) => {
  return api.put(`/admin/users/${userProfileId}`, payload);
};
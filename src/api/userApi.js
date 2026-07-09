
import api from "./axios";

export const getUsers = () => {
    return api.get("/admin/users");
};

export const getSystemStatus = () => {
  return api.get("/admin/system/status");
};

export const getRoles = () => {
   return api.get("/admin/lookups/roles");
};

export const getLegalGroups = () => {
  return api.get("/admin/lookups/legal-groups");
};
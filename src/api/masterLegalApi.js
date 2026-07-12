import api from "./axios";

// Legal Groups
export const addLegalGroup = (data) =>
  api.post("/admin/master/legal-groups", data);

export const getLegalGroups = () =>
  api.get("/admin/master/legal-groups");

export const updateLegalGroup = (id, data) =>
  api.put(`/admin/master/legal-groups/${id}`, data);

// Legal Entities
export const addLegalEntities = (data) =>
  api.post("/admin/master/legal-entities", data);

export const getLegalEntities = () =>
  api.get("/admin/master/legal-entities");

export const updateLegalEntities = (id, data) =>
  api.put(`/admin/master/legal-entities/${id}`, data);

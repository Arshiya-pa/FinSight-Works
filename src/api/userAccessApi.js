
import api from "./axios";

export const getUserAccessSummary = () =>
  api.get("/admin/summary");
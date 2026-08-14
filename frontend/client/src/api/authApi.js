import api from "./client";

export const register = (payload) => api.post("/auth/register", payload).then((response) => response.data);
export const login = (payload) => api.post("/auth/login", payload).then((response) => response.data);
export const getProfile = () => api.get("/auth/profile").then((response) => response.data);
export const updateProfile = (payload) => api.put("/auth/updateProfile", payload).then((response) => response.data);
export const deleteProfile = () => api.delete("/auth/deleteUser").then((response) => response.data);

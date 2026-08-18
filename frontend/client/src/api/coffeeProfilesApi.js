import api from "./client";

export const getCoffeeProfiles = () =>
  api.get("/coffee-profiles").then((response) => response.data.data);

export const getCoffeeProfileById = (id) =>
  api.get(`/coffee-profiles/${id}`).then((response) => response.data.data);

import api from "./client";

const getData = (path) => api.get(path).then((response) => response.data.data);

export const dashboardApi = {
  getCoffeeProfiles: () => getData("/coffee-profiles"),
  getRecipes: () => getData("/recipes"),
  getFavorites: () => getData("/favorites"),
  getPosts: () => getData("/posts"),
  getGames: () => getData("/games"),
  getCompanions: () => getData("/coffee-companions"),
};

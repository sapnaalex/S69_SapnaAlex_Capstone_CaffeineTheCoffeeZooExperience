import { useCallback, useEffect, useState } from "react";
import { dashboardApi } from "../api/dashboardApi";

const resources = {
  coffeeProfiles: dashboardApi.getCoffeeProfiles,
  recipes: dashboardApi.getRecipes,
  favorites: dashboardApi.getFavorites,
  posts: dashboardApi.getPosts,
  games: dashboardApi.getGames,
  companions: dashboardApi.getCompanions,
};

const createInitialState = () => Object.fromEntries(
  Object.keys(resources).map((key) => [key, { data: null, error: null, isLoading: true }])
);

const useDashboardData = () => {
  const [state, setState] = useState(createInitialState);

  const load = useCallback(async (key) => {
    setState((current) => ({ ...current, [key]: { ...current[key], isLoading: true, error: null } }));
    try {
      const data = await resources[key]();
      setState((current) => ({ ...current, [key]: { data, error: null, isLoading: false } }));
    } catch (error) {
      setState((current) => ({ ...current, [key]: { ...current[key], error, isLoading: false } }));
    }
  }, []);

  useEffect(() => {
    Object.keys(resources).forEach(load);
  }, [load]);

  return { ...state, reload: load };
};

export default useDashboardData;

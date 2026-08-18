import { useCallback, useEffect, useState } from "react";
import { getCoffeeProfiles } from "../api/coffeeProfilesApi";

export const useCoffeeProfiles = () => {
  const [profiles, setProfiles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCoffeeProfiles();
      setProfiles(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { profiles, isLoading, error, reload: load };
};

export default useCoffeeProfiles;

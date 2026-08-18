import { useCallback, useEffect, useState } from "react";
import { getCoffeeProfileById } from "../api/coffeeProfilesApi";

export const useCoffeeProfile = (id) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCoffeeProfileById(id);
      setProfile(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { profile, isLoading, error, reload: load };
};

export default useCoffeeProfile;

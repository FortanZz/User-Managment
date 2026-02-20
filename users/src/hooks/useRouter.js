import { useState, useCallback } from "react";

export function useRouter() {
  const [route, setRoute] = useState({ path: "/", params: {} });

  const navigate = useCallback((path, params = {}) => {
    setRoute({ path, params });
    window.scrollTo(0, 0);
  }, []);

  return { route, navigate };
}
import { useState, useEffect, useCallback, useRef } from "react";
import { getAirQualityByCoords } from "../services/openWeatherMapService";

/**
 * Hook to fetch air quality data (AQI & components) for a geographic coordinate.
 * Handles loading, error, data states, and exposes a manual refetch trigger.
 * 
 * Example:
 *   const { data, loading, error, refetch } = useAirQuality({ lat, lon })
 *
 * @param {{ lat: number, lon: number }} coords - Coordinates object
 * @returns {{
 *   data: { aqi: number, components: object, data: object } | null,
 *   loading: boolean,
 *   error: Error | null,
 *   refetch: () => void
 * }}
 */
// PUBLIC_INTERFACE
export function useAirQuality(coords) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Ref to prevent fetch on mount when refetch() is called manually before coords arrive
  const shouldFetch = useRef(true);

  const fetchData = useCallback(async () => {
    if (!coords || typeof coords.lat !== "number" || typeof coords.lon !== "number") {
      setError(new Error("Coordinates must be provided as { lat, lon } with numeric values."));
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await getAirQualityByCoords(coords.lat, coords.lon);
      setData(result);
      setError(null);
    } catch (err) {
      setData(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [coords]);

  // PUBLIC_INTERFACE
  const refetch = useCallback(() => {
    shouldFetch.current = true;
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!coords 
        || typeof coords.lat !== "number" 
        || typeof coords.lon !== "number"
        || Number.isNaN(coords.lat)
        || Number.isNaN(coords.lon)
    ) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }
    // Fetch on coords change or mount
    shouldFetch.current = false;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords.lat, coords.lon]);

  return { data, loading, error, refetch };
}

export default useAirQuality;

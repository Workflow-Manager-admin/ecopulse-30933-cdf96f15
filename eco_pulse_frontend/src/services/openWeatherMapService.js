import axios from "axios";
import { REACT_APP_OPENWEATHERMAP_API_KEY } from "../config";

/**
 * Fetch air quality index and main pollutants by geographic coordinates from OpenWeatherMap.
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {Promise<{aqi: number, components: object, data: object}>} 
 *   Resolves with AQI (1-5), pollutant components, and raw API data.
 * @throws {Error} If the API key is missing or the request fails, throws with a clear message.
 */
// PUBLIC_INTERFACE
export async function getAirQualityByCoords(lat, lon) {
  if (!REACT_APP_OPENWEATHERMAP_API_KEY) {
    throw new Error(
      "[OpenWeatherMap Service] Missing OpenWeatherMap API Key: Please set REACT_APP_OPENWEATHERMAP_API_KEY in your environment variables."
    );
  }

  if (
    typeof lat !== "number" ||
    typeof lon !== "number" ||
    Number.isNaN(lat) ||
    Number.isNaN(lon)
  ) {
    throw new Error(
      "[OpenWeatherMap Service] Invalid coordinates: latitude and longitude must be numbers."
    );
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${REACT_APP_OPENWEATHERMAP_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);

    if (
      !response.data ||
      !response.data.list ||
      !Array.isArray(response.data.list) ||
      response.data.list.length === 0
    ) {
      throw new Error(
        "[OpenWeatherMap Service] API response missing air quality data."
      );
    }

    const airData = response.data.list[0];
    const aqi = airData.main?.aqi;
    const components = airData.components;

    return { aqi, components, data: airData };
  } catch (error) {
    let msg = "[OpenWeatherMap Service] Failed to fetch air quality data.";
    if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      msg += ` OpenWeatherMap error: ${error.response.data.message}`;
    } else if (error.message) {
      msg += ` ${error.message}`;
    }
    throw new Error(msg);
  }
}

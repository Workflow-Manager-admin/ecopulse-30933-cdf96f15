/**
 * Centralized configuration: access all environment variables required by the app.
 * Warns if any required variable is missing.
 */

// PUBLIC_INTERFACE
function getEnvOrWarn(key) {
  const value = process.env[key];
  if (typeof value === "undefined") {
    // eslint-disable-next-line no-console
    console.error(
      `[EcoPulse Config] Missing required environment variable: ${key}`
    );
  }
  return value;
}

// List all required environment variable keys
const REQUIRED_KEYS = [
  "REACT_APP_OPENWEATHERMAP_API_KEY",
  "REACT_APP_NASA_API_KEY",
  "REACT_APP_GOOGLE_MAPS_API_KEY",
  "REACT_APP_FIREBASE_API_KEY",
  "REACT_APP_FIREBASE_AUTH_DOMAIN",
  "REACT_APP_FIREBASE_PROJECT_ID",
  "REACT_APP_FIREBASE_STORAGE_BUCKET",
  "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
  "REACT_APP_FIREBASE_APP_ID"
];

// Export all config values as named exports
const config = {};
REQUIRED_KEYS.forEach((key) => {
  config[key] = getEnvOrWarn(key);
});

export const {
  REACT_APP_OPENWEATHERMAP_API_KEY,
  REACT_APP_NASA_API_KEY,
  REACT_APP_GOOGLE_MAPS_API_KEY,
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} = config;

export default config;

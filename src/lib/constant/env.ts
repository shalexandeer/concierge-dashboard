const mode = import.meta.env.VITE_MODE;

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const isProd = mode === 'PROD';
export const isDev = mode === 'DEV';
export const GEOCODING_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
export const GEOCODING_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

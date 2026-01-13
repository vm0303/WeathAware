// src/utils/weatherAPI.js (CRA / webpack version)
import axios from "axios";

const API_KEY = "***REMOVED***";
const BASE = "https://api.weatherapi.com/v1";

// ✅ DEV TEST STRING
const FORCED_CONDITION_TEXT = "Moderate or heavy showers of ice pellets";

// ✅ Toggle: set to true when you want to test
const FORCE_CONDITION_IN_DEV = false;

const applyForcedConditionText = (data) => {
    if (!data) return data;

    // Current condition
    if (data.current?.condition) {
        data.current.condition = {
            ...data.current.condition,
            text: FORCED_CONDITION_TEXT,
        };
    }

    // Forecast days + day condition + hourly conditions
    const days = data.forecast?.forecastday;
    if (Array.isArray(days)) {
        data.forecast.forecastday = days.map((fd) => {
            const next = { ...fd };

            if (next.day?.condition) {
                next.day = {
                    ...next.day,
                    condition: { ...next.day.condition, text: FORCED_CONDITION_TEXT },
                };
            }

            if (Array.isArray(next.hour)) {
                next.hour = next.hour.map((h) => ({
                    ...h,
                    condition: h.condition
                        ? { ...h.condition, text: FORCED_CONDITION_TEXT }
                        : h.condition,
                }));
            }

            return next;
        });
    }

    return data;
};

export const getWeather = async (q) => {
    try {
        const url = `${BASE}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
            q
        )}&days=7&aqi=no&alerts=no`;

        const res = await axios.get(url);

        // WeatherAPI embeds errors INSIDE the JSON
        if (res.data?.error) {
            throw new Error(res.data.error.message);
        }

        const data = res.data;

        // ✅ CRA dev check (Vite's import.meta.env.DEV will NOT work in CRA)
        const isDev = process.env.NODE_ENV !== "production";

        // ✅ DEV ONLY: force long condition text everywhere for padding tests
        if (isDev && FORCE_CONDITION_IN_DEV) {
            // optional: quick sanity check
            // console.log("✅ FORCING CONDITION TEXT (DEV)");
            return applyForcedConditionText(data);
        }

        return data;
    } catch (err) {
        // Axios errors have err.response
        if (err.response?.data?.error?.message) {
            throw new Error(err.response.data.error.message);
        }

        throw new Error("Network error. Please try again later.");
    }
};

export const searchCities = async (query) => {
    if (!query || query.length < 2) return [];
    const url = `${BASE}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`;
    const res = await axios.get(url);
    return res.data;
};

import axios from "axios";

const API_KEY = "5f1fb40872a14cc9a96175203251003"; // put your key here
const BASE = "https://api.weatherapi.com/v1";

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

        return res.data;
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
    const url = `${BASE}/search.json?key=${API_KEY}&q=${encodeURIComponent(
        query
    )}`;
    const res = await axios.get(url);
    return res.data;
};

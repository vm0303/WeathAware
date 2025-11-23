import axios from "axios";

const API_KEY = "5f1fb40872a14cc9a96175203251003"; // put your key here
const BASE = "https://api.weatherapi.com/v1";

export const getWeather = async (q) => {
    const url = `${BASE}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
        q
    )}&days=7&aqi=no&alerts=no`;

    const res = await axios.get(url);
    return res.data;
};

export const searchCities = async (query) => {
    if (!query || query.length < 2) return [];
    const url = `${BASE}/search.json?key=${API_KEY}&q=${encodeURIComponent(
        query
    )}`;
    const res = await axios.get(url);
    return res.data;
};

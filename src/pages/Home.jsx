// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Header from "../components/Header";
import Search from "../components/Search";
import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import SunriseSunsetCard from "../components/SunriseSunset";

import { getWeather } from "../utils/weatherAPI";
import { getWeatherTheme } from "../utils/weatherThemes";

export default function Home() {
    const [weather, setWeather] = useState(null);
    const [unit, setUnit] = useState("C");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const initialTheme = getWeatherTheme(null, darkMode);
    const [prevTheme, setPrevTheme] = useState(initialTheme);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const isDark =
                document.documentElement.classList.contains("dark");
            setDarkMode(isDark);
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    const handleSelectCity = async (q) => {
        try {
            setError("");
            setLoading(true);
            await new Promise((res) => setTimeout(res, 4000));
            const data = await getWeather(q);
            setWeather(data);
        } catch (e) {
            console.error(e);
            setError("Could not load weather for that location.");
        } finally {
            setLoading(false);
        }
    };

    const theme = getWeatherTheme(weather, darkMode);

    useEffect(() => {
        if (theme.bg !== prevTheme.bg) {
            setFading(true);

            const timeout = setTimeout(() => {
                setPrevTheme(theme);
                setFading(false);
            }, 700);

            return () => clearTimeout(timeout);
        }
    }, [theme, prevTheme]);

    return (
        <motion.div className="relative min-h-screen transition-none">
            {/* Background: old theme (fades out) */}
            <div
                className={`
                    absolute inset-0 -z-10
                    ${prevTheme.bg}
                    transition-opacity duration-300
                    ${fading ? "opacity-0" : "opacity-100"}
                `}
            />

            {/* Background: new theme (behind) */}
            <div
                className={`
                    absolute inset-0 -z-20
                    ${theme.bg}
                `}
            />

            {/* Page content */}
            <div className={`relative ${theme.text}`}>
                {loading && <LoadingScreen darkMode={darkMode} />}

                <div className="max-w-4xl mx-auto px-4 pb-10">
                    <Header theme={theme} />

                    <Search onSelectCity={handleSelectCity} />

                    {error && (
                        <p className="text-sm text-red-100 bg-red-500/70 px-4 py-2 rounded-full inline-block mb-4">
                            {error}
                        </p>
                    )}

                    {weather && (
                        <>
                            <CurrentWeather
                                weather={weather}
                                unit={unit}
                                onUnitChange={setUnit}
                                theme={theme}
                                prevTheme={prevTheme}
                            />

                            {/* 🌅 Sunrise / Sunset card */}
                            <SunriseSunsetCard
                                astro={
                                    weather.forecast?.forecastday?.[0]?.astro
                                }
                                theme={theme}
                            />

                            {/* 3-Day Forecast */}
                            <Forecast
                                weather={weather}
                                unit={unit}
                                theme={theme}
                            />
                        </>
                    )}

                    <Footer />
                </div>
            </div>
        </motion.div>
    );
}

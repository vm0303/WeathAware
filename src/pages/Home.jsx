import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Search from "../components/Search";
import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { getWeather } from "../utils/weatherAPI";

import { getWeatherTheme } from "../utils/weatherThemes";

export default function Home() {
    const [weather, setWeather] = useState(null);
    const [unit, setUnit] = useState("C");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(localStorage.getItem("theme")==="dark");

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains("dark");
            setDarkMode(isDark);
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    const handleSelectCity = async (q) => {
        try {
            setError("");
            setLoading(true);
            const data = await getWeather(q);
            setWeather(data);
        } catch (e) {
            console.error(e);
            setError("Could not load weather for that location.");
        } finally {
            setLoading(false);
        }
    };

// Apply theme (handles bg + text)
    const theme = getWeatherTheme(weather, darkMode);

    return (
        <motion.div
            key={theme.bg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`min-h-screen transition-colors duration-700 ${theme.bg} ${theme.text}`}
        >
            {loading && <Spinner />}

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
                            theme = {theme}
                        />
                        <Forecast weather={weather} unit={unit} theme = {theme} />
                    </>
                )}

                <Footer />
            </div>
        </motion.div>
    );
}

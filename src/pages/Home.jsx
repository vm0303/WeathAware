// src/pages/Home.jsx
import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";

import Header from "../components/Header";
import Search from "../components/Search";
import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import SunriseSunsetCard from "../components/SunriseSunset";

import {getWeather} from "../utils/weatherAPI";
import {getWeatherTheme} from "../utils/weatherThemes";
import {toast} from "react-toastify";
import HourlyForecast from "../components/HourlyForecast";


export default function Home() {
    const [weather, setWeather] = useState(null);
    const [unit, setUnit] = useState("C");
    const [loading, setLoading] = useState(false);

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

        observer.observe(document.documentElement, {attributes: true});

        return () => observer.disconnect();
    }, []);

    const handleSelectCity = async (q) => {
        if (!q || q.trim() === "") {
            toast.error("Please enter a city name.");
            return;
        }

        try {
            // Quick check — call API but DO NOT show loading screen yet
            const quickCheck = await getWeather(q);

            // 100% valid → start loading screen
            setLoading(true);

            await new Promise((res) => setTimeout(res, 3500));

            setWeather(quickCheck);
            toast.success(`Weather successfully loaded for ${quickCheck.location.name}, ${quickCheck.location.region}!`);
            //Only add to recents on successful fetch
            addRecentSearch(quickCheck.location);
            // ⭐ AUTO THEME BASED ON LOCAL TIME, SUNRISE, SUNSET
            try {
                const localTimeStr = quickCheck.location.localtime;
                // e.g. "2025-12-01 02:18"

                const astro = quickCheck.forecast?.forecastday?.[0]?.astro;
                const sunriseStr = astro?.sunrise; // e.g. "6:58 AM"
                const sunsetStr = astro?.sunset;   // e.g. "4:32 PM"

                if (!localTimeStr || !sunriseStr || !sunsetStr) {
                    throw new Error("Missing time/astro data");
                }

                // ---- parse local time ("YYYY-MM-DD HH:MM") ----
                const [, timePart] = localTimeStr.split(" "); // ["YYYY-MM-DD", "HH:MM"]
                const [localHourStr, localMinuteStr] = timePart.split(":");
                const localHour = parseInt(localHourStr, 10);
                const localMinute = parseInt(localMinuteStr, 10);
                const localMinutes = localHour * 60 + localMinute;

                // ---- helper to parse "H:MM AM/PM" into minutes since midnight ----
                const toMinutes = (t) => {
                    const m = t.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
                    if (!m) throw new Error(`Bad time format: ${t}`);
                    let h = parseInt(m[1], 10);
                    const min = parseInt(m[2], 10);
                    const period = m[3].toUpperCase();

                    if (period === "PM" && h !== 12) h += 12;
                    if (period === "AM" && h === 12) h = 0;

                    return h * 60 + min;
                };

                const sunriseMinutes = toMinutes(sunriseStr);
                const sunsetMinutes = toMinutes(sunsetStr);

                // 🌙 Night if before sunrise OR after/equal sunset
                const isNight =
                    localMinutes < sunriseMinutes || localMinutes >= sunsetMinutes;

                if (isNight) {
                    document.documentElement.classList.add("dark");
                    localStorage.setItem("theme", "dark");
                } else {
                    document.documentElement.classList.remove("dark");
                    localStorage.setItem("theme", "light");
                }

                setDarkMode(isNight);
            } catch (e) {
                console.warn("Auto theme failed:", e);
            }

        } catch (err) {
            const msg = err.message || "";

            if (msg.includes("No matching location found")) {
                toast.error("Invalid city name. Please try again.", {
                    autoClose: 5000 // 3 seconds
                });
            } else {
                toast.error(
                    "Something went wrong while fetching the data. Please try again later."
                    , {
                        autoClose: 5000 // 3 seconds
                    });
            }
        } finally {
            setLoading(false);
        }
    };

    const theme = getWeatherTheme(weather, darkMode);

    useEffect(() => {
        let timeout;

        if (theme.bg !== prevTheme.bg) {
            setFading(true);

            timeout = setTimeout(() => {
                setPrevTheme(theme);
                setFading(false);
            }, 250);
        }

        return () => clearTimeout(timeout); // ⭐ prevents interruptions
    }, [theme, prevTheme]);


    const [cardsShouldFade, setCardsShouldFade] = useState(false);
    useEffect(() => {
        if (!weather) {
            setCardsShouldFade(false);
            return;
        }

        // Remove animation class, then re-add it in next tick
        setCardsShouldFade(false);
        const t = setTimeout(() => {
            setCardsShouldFade(true);
        }, 0);

        return () => clearTimeout(t);
    }, [weather]);

    const [recentSearches, setRecentSearches] = useState(() => {
        try {
            const saved = localStorage.getItem("recentSearches");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const addRecentSearch = (location) => {
        if (!location) return;

        const entry = {
            name: location.name,
            region: location.region,
            country: location.country,
            lat: location.lat,
            lon: location.lon,
        };

        setRecentSearches((prev) => {
            // de-dupe using lat+lon
            const filtered = prev.filter(
                (r) => !(r.lat === entry.lat && r.lon === entry.lon)
            );
            const updated = [entry, ...filtered].slice(0, 5); // keep last 5

            try {
                localStorage.setItem("recentSearches", JSON.stringify(updated));
            } catch {
                // ignore storage errors
            }

            return updated;
        });
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        try {
            localStorage.removeItem("recentSearches");
        } catch {
            // ignore
        }
    };



    return (
        <motion.div className="relative min-h-screen transition-none">
            {/* Background Transition */}
            <div
                className={`
                    absolute inset-0 -z-10
                    ${prevTheme.bg}
                    transition-opacity duration-300
                    ${fading ? "opacity-0" : "opacity-100"}
                `}
            />
            <div
                className={`
                    absolute inset-0 -z-20
                    ${theme.bg}
                `}
            />

            {/* Page Content */}
            <div className={`relative ${theme.text}`}>
                {loading && <LoadingScreen darkMode={darkMode}/>}


                {/* 🔹 Header ALWAYS visible */}

                <div className="px-6 md:px-16 lg:px-10 xl:px-6">
                    <Header theme={theme}/>
                </div>

                <div className="max-w-4xl mx-auto px-4 pb-10">

                    {/* 🔹 Search bar stays SAME SIZE, ONLY vertical position changes */}
                    <div
                        className={`
                            w-full opacity-100 transition-all duration-700
                            ${!weather ? "pt-[30vh] animate-fadeIn" : "pt-6"}
                        `}
                    >
                        <Search
                            onSelectCity={handleSelectCity}
                            recentSearches={recentSearches}
                            onClearRecentSearches={clearRecentSearches}
                        />
                    </div>


                    {weather && (
                        <>
                            <div className={cardsShouldFade ? "animate-fadeIn" : ""}>
                                <CurrentWeather
                                    weather={weather}
                                    unit={unit}
                                    onUnitChange={setUnit}
                                    theme={theme}
                                    prevTheme={prevTheme}
                                />
                            </div>

                            <div className={cardsShouldFade ? "animate-fadeIn" : ""}>
                                <SunriseSunsetCard
                                    astro={weather.forecast?.forecastday?.[0]?.astro}
                                    theme={theme}
                                />
                            </div>

                            <div className={cardsShouldFade ? "animate-fadeIn" : ""}>
                                <HourlyForecast
                                    hours={weather.forecast?.forecastday?.[0]?.hour}
                                    unit={unit}
                                    theme={theme}
                                    localTime={weather.location.localtime}
                                />

                            </div>

                            <div className={cardsShouldFade ? "animate-fadeIn" : ""}>
                                <Forecast
                                    weather={weather}
                                    unit={unit}
                                    theme={theme}
                                />
                            </div>
                        </>
                    )}


                    <Footer/>
                </div>
            </div>
        </motion.div>
    );
}

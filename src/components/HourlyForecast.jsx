// src/components/HourlyForecast.jsx
import React, {useMemo, useEffect, useState} from "react";
import WeatherIcon from "./WeatherIcon";


export default function HourlyForecast({hours, unit, theme, localTime}) {
    const safeHours = Array.isArray(hours) ? hours : [];
    const safeLocalTime = localTime || null;

    // ---------- Build sorted hours ----------
    const sortedHours = useMemo(() => {
        if (safeHours.length === 0 || !safeLocalTime) return [];

        const local = new Date(safeLocalTime.replace(" ", "T"));
        const currentHour = local.getHours();

        const before = safeHours.slice(currentHour);
        const after = safeHours.slice(0, currentHour);

        return [...before, ...after];
    }, [safeHours, safeLocalTime]);

    const [anim, setAnim] = useState(false);

    useEffect(() => {
        setAnim(true);
        const t = setTimeout(() => setAnim(false), 450);
        return () => clearTimeout(t);
    }, [unit]);


    if (sortedHours.length === 0) return null;

    // ---------- Helpers ----------
    const convertTemp = (c) =>
        unit === "C" ? Math.round(c) : Math.round((c * 9) / 5 + 32);

    const format12Hour = (timeStr) => {
        const date = new Date(timeStr.replace(" ", "T"));
        return date
            .toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
            .replace(":00", "");
    };

    return (
        <div className="rounded-2xl shadow-lg mb-8 overflow-hidden relative">
            {/* Fade overlay (left side) */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-12 z-20 "></div>

            <div className={`${theme.card} p-5`}>
                <h2 className={`text-xl font-semibold mb-3 ${theme.text}`}>
                    Hourly Forecast
                </h2>

                <div className="relative">
                    {/* Scrollable hours */}
                    <div className="flex gap-6 overflow-x-auto pb-3 pt-1 scrollbar-none">
                        {sortedHours.map((h, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center min-w-[80px]"
                            >
                                {/* Time */}
                                <p className={`text-sm opacity-70 ${theme.text}`}>
                                    {i === 0 ? "Now" : format12Hour(h.time)}
                                </p>

                                {/* Icon */}
                                <WeatherIcon
                                    code={h.condition.code}
                                    isDay={h.is_day === 1}
                                    size={45}
                                />

                                {/* Temp */}
                                <div className={`text-container font-semibold mt-1 ${theme.text}`}>
                                    {/* Fahrenheit */}
                                    <span className={`text ${unit === "F" ? "visible" : ""}`}>
    {Math.round(h.temp_f)}°F
  </span>

                                    {/* Celsius */}
                                    <span className={`text ${unit === "C" ? "visible" : ""}`}>
    {Math.round(h.temp_c)}°C
  </span>
                                </div>


                                {/* Condition */}
                                <p
                                    className={`text-xs opacity-70 mt-0.5 text-center ${theme.text}`}
                                >
                                    {h.condition.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

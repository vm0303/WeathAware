// src/components/Forecast.jsx
import React from "react";
import ForecastItem from "./ForecastItem";

export default function Forecast({ weather, unit, theme }) {
    if (!weather?.forecast?.forecastday || !weather?.location?.localtime) {
        return null;
    }

    // "2025-12-06 13:25" -> "2025-12-06"
    const todayStr = weather.location.localtime.split(" ")[0];

    // Keep today and future days
    const days = weather.forecast.forecastday
        .filter(d => d.date >= todayStr)
        .slice(0, 3);

    return (
        <div className="relative rounded-2xl shadow-lg mb-8 overflow-hidden">
            <div
                className={`relative z-10 ${theme.card} p-6 transition-colors duration-300`}
            >
                <h2 className={`text-xl font-semibold text-center ${theme.text}`}>
                    3-Day Forecast
                </h2>

                <div className="flex justify-center overflow-x-auto gap-12 mt-4 pb-2">
                    {days.map((d, i) => (
                        <ForecastItem
                            key={d.date}
                            day={d}
                            unit={unit}
                            theme={theme}
                            label={i === 0 ? "Today" : null}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

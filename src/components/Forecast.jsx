// src/components/Forecast.jsx
import React from "react";
import ForecastItem from "./ForecastItem";

export default function Forecast({ weather, unit, theme, prevTheme }) {
    if (!weather?.forecast?.forecastday) return null;

    const days = weather.forecast.forecastday;

    return (
        <div className="relative rounded-2xl shadow-lg mb-8 overflow-hidden">


            {/* Current card theme */}
            <div className={`relative z-10 ${theme.card} p-6 transition-colors duration-300`}>
                <h2 className={`text-xl font-semibold text-center ${theme.text}`}>
                    3-Day Forecast
                </h2>

                <div className="flex justify-center overflow-x-auto gap-12 mt-4 pb-2">
                    {days.map((d, i) => (
                        <ForecastItem key={i} day={d} unit={unit} theme={theme} />
                    ))}
                </div>
            </div>
        </div>
    );
}

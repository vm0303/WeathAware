import React from "react";
import ForecastItem from "./ForecastItem";

export default function Forecast({ weather, unit, theme }) {
    if (!weather?.forecast?.forecastday) return null;

    const days = weather.forecast.forecastday;

    return (
        <div className={`${theme.card} rounded-2xl shadow-lg p-6 mb-8`}>
            <h2 className={`text-lg font-semibold text-center ${theme.text}`}>
                3-Day Forecast
            </h2>

            <div className="flex justify-center overflow-x-auto gap-12 mt-4 pb-2">
                {days.map((d, i) => (
                    <ForecastItem key={i} day={d} unit={unit} theme={theme} />
                ))}
            </div>
        </div>
    );
}

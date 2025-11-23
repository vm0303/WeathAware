import React, { useEffect, useState } from "react";
import WeatherIcon from "./WeatherIcon";

export default function CurrentWeather({ weather, unit, onUnitChange, theme }) {
    const [lastCity, setLastCity] = useState(null);

    useEffect(() => {
        if (!weather?.location?.name || !weather?.location?.country) return;

        const city = weather.location.name;
        const country = weather.location.country.toLowerCase();

        if (city === lastCity) return;
        setLastCity(city);

        if (country.includes("united states")) {
            if (unit !== "F") onUnitChange("F");
        } else {
            if (unit !== "C") onUnitChange("C");
        }
    }, [weather, lastCity, unit, onUnitChange]);

    if (!weather) return null;

    const w = weather.current;

    const convertTemp = (c) =>
        unit === "C" ? Math.round(c) : Math.round((c * 9) / 5 + 32);

    const temp = convertTemp(w.temp_c);
    const feels = convertTemp(w.feelslike_c);
    const wind =
        unit === "C" ? `${w.wind_kph} kph` : `${Math.round(w.wind_kph / 1.609)} mph`;

    return (
        <div className={`${theme.card} rounded-2xl shadow-lg p-6 mb-8`}>

            {/* ---- Header Section ---- */}
            <div className="flex justify-between items-center">
                <h2 className={`text-lg font-semibold ${theme.text}`}>
                    Current Weather
                </h2>

                <button
                    onClick={() => onUnitChange(unit === "F" ? "C" : "F")}
                    className={`
                        px-3 py-1 rounded-full text-sm font-semibold
                        ${theme.card}
                        transition
                        ${theme.text}
                    `}
                >
                    {unit === "F" ? "Convert to °C" : "Convert to °F"}
                </button>
            </div>

            {/* ---- Main Row ---- */}
            <div className="flex flex-wrap mt-6 items-center justify-between gap-6">

                {/* LEFT */}
                <div>
                    <h3 className={`text-3xl font-semibold ${theme.text}`}>
                        {weather.location.name}
                    </h3>

                    <p className={`text-sm opacity-80 ${theme.text}`}>
                        {weather.location.region}, {weather.location.country}
                    </p>

                    <div className="flex items-center mt-3">
                        <WeatherIcon code={w.condition.code} isDay={w.is_day === 1} />

                        <span className={`text-7xl font-light ml-3 leading-none ${theme.text}`}>
                            {temp}
                            <span className="text-4xl opacity-80">°{unit}</span>
                        </span>
                    </div>

                    <h4 className={`text-lg mt-2 capitalize opacity-80 ${theme.text}`}>
                        {w.condition.text}
                    </h4>
                </div>

                {/* RIGHT DETAILS */}
                <div className={`space-y-3 w-full md:w-auto ${theme.text}`}>
                    <p className="text-lg flex justify-between md:block">
                        <span className="opacity-70">Feels like </span>
                        <span className="font-semibold">
                            {feels}°{unit}
                        </span>
                    </p>

                    <p className="flex justify-between md:justify-start md:gap-4">
                        <span className="opacity-70">Humidity</span>
                        <span className="font-semibold">{w.humidity}%</span>
                    </p>

                    <p className="flex justify-between md:justify-start md:gap-4">
                        <span className="opacity-70">Wind</span>
                        <span className="font-semibold">{wind}</span>
                    </p>

                    <p className="flex justify-between md:justify-start md:gap-4">
                        <span className="opacity-70">Pressure</span>
                        <span className="font-semibold">{w.pressure_mb} hPa</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

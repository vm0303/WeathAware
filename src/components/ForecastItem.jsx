import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function ForecastItem({ day, unit, theme }) {
    const convertTemp = (c) =>
        unit === "C" ? Math.round(c) : Math.round((c * 9) / 5 + 32);

    const date = new Date(day.date);
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });

    return (
        <div className="flex flex-col items-center min-w-[90px]">
            <h6 className={`font-semibold ${theme.text}`}>
                {weekday}
            </h6>

            <WeatherIcon code={day.day.condition.code} isDay={true} />

            <p className={`text-1xl mt-1 capitalize opacity-80 ${theme.text}`}>
                {day.day.condition.text}
            </p>

            <span className={`text-lg font-semibold mt-1 ${theme.text}`}>
                {convertTemp(day.day.maxtemp_c)}°{unit}
                <span className="opacity-70 text-sm"> / </span>
                {convertTemp(day.day.mintemp_c)}°{unit}
            </span>
        </div>
    );
}

// src/components/ForecastItem.jsx
import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function ForecastItem({ day, unit, theme, label, isTiny, dragRef }) {
    const [y, m, d] = day.date.split("-");
    const localDate = new Date(y, m - 1, d);
    const weekday = localDate.toLocaleDateString("en-US", { weekday: "short" });

    return (
        <div
            data-forecast-card="true"
            className={`
        flex-shrink-0
        w-[150px]
        rounded-2xl
        px-3 py-3
        flex flex-col items-center text-center
        ${theme.text}

        max-[280px]:w-[124px]
        max-[280px]:px-2 max-[280px]:py-2
        max-[280px]:snap-center
      `}
        >
            {/* Title (match Hourly time block height + text feel) */}
            <div className="h-[70px] flex items-center justify-center max-[280px]:h-[55px]">
                <p className="text-md opacity-80 font-semibold tracking-tight whitespace-nowrap max-[280px]:text-md">
                    {label || weekday}
                </p>
            </div>

            {/* Icon (match Hourly icon box) */}
            <div className="h-[75px] flex items-center justify-center max-[280px]:h-[55px]">
                <WeatherIcon code={day.day.condition.code} isDay={true} size={70} />
            </div>

            {/* Condition (match Hourly condition box) */}
            <div
                className="
          w-full
          h-[88px]
          px-2
          mt-0.5
          flex items-center justify-center
          max-[280px]:h-[80px]
        "
            >
                <p
                    className="
            w-full
            text-sm opacity-80 leading-snug text-center
            break-words
            overflow-y-auto
            scrollbar-none
            max-h-full
            py-1
            max-[280px]:text-[13.5px]

          "
                    onPointerDown={(e) => {
                        if (isTiny && dragRef?.current?.didDrag) e.preventDefault();
                    }}
                >
                    {day.day.condition.text}
                </p>
            </div>

            {/* Temps (match Hourly temp sizing + spacing + baseline) */}
            <div className="flex items-center justify-center mt-2 max-[280px]:mt-2.5">
                <div className="fade-stack center tabular-nums font-semibold leading-none min-w-[9ch] whitespace-nowrap">
                    {/* Fahrenheit layer */}
                    <span className={`fade-text ${unit === "F" ? "visible" : ""}`}>
            <span className="text-lg inline-flex items-baseline leading-none max-[280px]:text-md">
              {Math.round(day.day.maxtemp_f)}
                <span className="text-sm ml-1 leading-none max-[280px]:text-[13px]">°F</span>
            </span>

            <span className="opacity-50 mx-1">/</span>

            <span className="text-lg inline-flex items-baseline leading-none opacity-70 max-[280px]:text-md">
              {Math.round(day.day.mintemp_f)}
                <span className="text-sm ml-1 leading-none max-[280px]:text-[13px]">°F</span>
            </span>
          </span>

                    {/* Celsius layer */}
                    <span className={`fade-text ${unit === "C" ? "visible" : ""}`}>
            <span className="text-lg inline-flex items-baseline leading-none max-[280px]:text-md">
              {Math.round(day.day.maxtemp_c)}
                <span className="text-sm ml-1 leading-none max-[280px]:text-[13px]">°C</span>
            </span>

            <span className="opacity-50 mx-1">/</span>

            <span className="text-lg inline-flex items-baseline leading-none opacity-70 max-[280px]:text-md">
              {Math.round(day.day.mintemp_c)}
                <span className="text-sm ml-1 leading-none max-[280px]:text-[13px]">°C</span>
            </span>
          </span>
                </div>
            </div>
        </div>
    );
}

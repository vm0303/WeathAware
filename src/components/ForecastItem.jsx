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

        /* <=320: slightly wider than 280 so it breathes (mirror Hourly) */
        max-[320px]:w-[136px]
        max-[320px]:px-2.5 max-[320px]:py-2.5

        /* <=280: keep exact tiny sizing */
        max-[280px]:w-[124px]
        max-[280px]:px-2 max-[280px]:py-2
        max-[280px]:snap-center
      `}
        >
            {/* Title */}
            <div className="h-[70px] flex items-center justify-center max-[320px]:h-[62px] max-[280px]:h-[55px]">
                <p className="text-md opacity-80 font-semibold tracking-tight whitespace-nowrap max-[320px]:text-[15px] max-[280px]:text-md">
                    {label || weekday}
                </p>
            </div>

            {/* Icon */}
            <div className="h-[75px] flex items-center justify-center max-[320px]:h-[64px] max-[280px]:h-[55px]">
                <WeatherIcon
                    code={day.day.condition.code}
                    isDay={true}
                    // match Hourly behavior: tiny stays same, 320 gets a small bump
                    size={isTiny ? 70 : 75}
                />
            </div>

            {/* Condition */}
            <div
                className="
          w-full
          h-[88px]
          px-2
          mt-0.5
          flex items-center justify-center
          max-[320px]:h-[74px]
          max-[280px]:h-[65px]
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
            max-[320px]:text-[14px]
            max-[280px]:text-[13.5px]
          "
                    onPointerDown={(e) => {
                        if (isTiny && dragRef?.current?.didDrag) e.preventDefault();
                    }}
                >
                    {day.day.condition.text}
                </p>
            </div>

            {/* Temps */}
            <div className="flex items-center justify-center mt-2 max-[320px]:mt-2.5 max-[280px]:mt-2.5">
                <div className="fade-stack center tabular-nums font-semibold leading-none min-w-[9ch] whitespace-nowrap">
                    {/* F */}
                    <span className={`fade-text ${unit === "F" ? "visible" : ""}`}>
            <span className="text-lg inline-flex items-baseline leading-none max-[320px]:text-lg max-[280px]:text-md">
              {Math.round(day.day.maxtemp_f)}
                <span className="text-sm ml-1 leading-none max-[320px]:text-sm max-[280px]:text-[13px]">°F</span>
            </span>

            <span className="opacity-50 mx-1">/</span>

            <span className="text-lg inline-flex items-baseline leading-none opacity-70 max-[320px]:text-lg max-[280px]:text-md">
              {Math.round(day.day.mintemp_f)}
                <span className="text-sm ml-1 leading-none max-[320px]:text-sm max-[280px]:text-[13px]">°F</span>
            </span>
          </span>

                    {/* C */}
                    <span className={`fade-text ${unit === "C" ? "visible" : ""}`}>
            <span className="text-lg inline-flex items-baseline leading-none max-[320px]:text-lg max-[280px]:text-md">
              {Math.round(day.day.maxtemp_c)}
                <span className="text-sm ml-1 leading-none max-[320px]:text-sm max-[280px]:text-[13px]">°C</span>
            </span>

            <span className="opacity-50 mx-1">/</span>

            <span className="text-lg inline-flex items-baseline leading-none opacity-70 max-[320px]:text-lg max-[280px]:text-md">
              {Math.round(day.day.mintemp_c)}
                <span className="text-sm ml-1 leading-none max-[320px]:text-sm max-[280px]:text-[13px]">°C</span>
            </span>
          </span>
                </div>
            </div>
        </div>
    );
}

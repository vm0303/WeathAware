// src/components/HourlyForecast.jsx
import React, { useMemo } from "react";
import WeatherIcon from "./WeatherIcon";

export default function HourlyForecast({ hours, unit, theme, localTime }) {
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

    if (sortedHours.length === 0) return null;

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
            {/* (optional) left fade overlay for scroll hint */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-10 z-20" />

            <div className={`${theme.card} p-5`}>
                <h2 className={`text-xl font-semibold mb-3 ${theme.text}`}>
                    Hourly Forecast
                </h2>

                <div className="relative">
                    <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none">
                        {sortedHours.map((h, i) => (
                            <div
                                key={i}
                                className={`
                  flex-shrink-0
                  w-[110px]
                  rounded-2xl
                  px-3 py-3
                  flex flex-col items-center text-center
                  ${theme.text}
                `}
                            >
                                {/* Time (fixed height so all columns align) */}
                                <div className="h-[45px] flex items-center justify-center">
                                    <p className="text-sm opacity-70 whitespace-nowrap">
                                        {i === 0 ? "Now" : format12Hour(h.time)}
                                    </p>
                                </div>

                                {/* Icon (fixed box) */}
                                <div className="h-[56px] flex items-center justify-center">
                                    <WeatherIcon
                                        code={h.condition.code}
                                        isDay={h.is_day === 1}
                                        size={45}
                                    />
                                </div>

                                {/* Condition (fixed height so baselines match across all columns) */}
                                <div className="h-[50px] flex items-center justify-center mt-1">
                                    <p className="text-xs opacity-70 leading-snug line-clamp-2">
                                        {h.condition.text}
                                    </p>
                                </div>

                                {/* Temp (fixed height, perfectly centered) */}
                                <div className="h-[5px] flex items-center justify-center mt-1">
                                    <div className="fade-stack center tabular-nums font-semibold leading-none min-w-[5ch]">
                                        {/* Fahrenheit */}
                                        <span className={`fade-text ${unit === "F" ? "visible" : ""}`}>
                      <span className="inline-flex items-baseline leading-none">
                        {Math.round(h.temp_f)}
                          <span className="text-xs ml-1 leading-none">°F</span>
                      </span>
                    </span>

                                        {/* Celsius */}
                                        <span className={`fade-text ${unit === "C" ? "visible" : ""}`}>
                      <span className="inline-flex items-baseline leading-none">
                        {Math.round(h.temp_c)}
                          <span className="text-xs ml-1 leading-none">°C</span>
                      </span>
                    </span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

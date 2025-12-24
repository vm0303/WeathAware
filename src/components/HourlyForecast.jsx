import React, { useMemo, useRef, useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";

/**
 * ForecastItem-style condition clamp:
 * - Detects overflow
 * - Click to expand/collapse ONLY if ellipsed
 * - Expands inside fixed-height box (scrollable)
 */
function ConditionClamp({ text }) {
    const textRef = useRef(null);
    const [isEllipsed, setIsEllipsed] = useState(false);
    const [showFull, setShowFull] = useState(false);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        setShowFull(false);

        const raf = requestAnimationFrame(() => {
            const node = textRef.current;
            if (!node) return;
            const isOver =
                node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth;
            setIsEllipsed(isOver);
        });

        return () => cancelAnimationFrame(raf);
    }, [text]);

    const toggle = () => {
        if (isEllipsed) setShowFull((v) => !v);
    };

    return (
        <p
            ref={textRef}
            onClick={toggle}
            onKeyDown={(e) => {
                if (!isEllipsed) return;
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle();
                }
            }}
            role={isEllipsed ? "button" : undefined}
            tabIndex={isEllipsed ? 0 : -1}
            className={`
        w-full px-2 py-[2px]
  text-sm opacity-70 leading-snug text-center
  ${isEllipsed ? "cursor-pointer hover:underline" : "cursor-default"}
      `}
            style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: showFull ? "block" : "-webkit-box",
                WebkitLineClamp: showFull ? undefined : 3,
                WebkitBoxOrient: showFull ? undefined : "vertical",
                overflowY: showFull ? "auto" : "hidden",
                maxHeight: "95px",
            }}
            title={isEllipsed ? text : undefined}
        >
            {text}
        </p>
    );
}


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
    w-[150px]
    rounded-2xl
    px-3 py-3
    flex flex-col items-center text-center
    ${theme.text}
  `}
                            >
                                {/* Time (fixed height so all columns align) */}
                                <div className="h-[70px] flex items-center justify-center">
                                    <p className="text-md opacity-70 whitespace-nowrap">
                                        {i === 0 ? "Now" : format12Hour(h.time)}
                                    </p>
                                </div>

                                {/* Icon (fixed box) */}
                                <div className="h-[75px] flex items-center justify-center">
                                    <WeatherIcon
                                        code={h.condition.code}
                                        isDay={h.is_day === 1}
                                        size={45}
                                    />
                                </div>

                                {/* Condition (ForecastItem-style clamp) */}
                                <div className="h-[95px] flex items-center justify-center mt-1 w-full">
                                    <ConditionClamp text={h.condition.text} />
                                </div>

                                {/* Temp (fixed height, perfectly centered) */}
                                <div className="h-[10px] flex items-center justify-center mt-1">
                                    <div className="fade-stack center tabular-nums font-semibold leading-none min-w-[5ch]">
                                        {/* Fahrenheit */}
                                        <span className={`fade-text ${unit === "F" ? "visible" : ""}`}>
                      <span className="text-lg inline-flex items-baseline leading-none">
                        {Math.round(h.temp_f)}
                          <span className="text-sm ml-1 leading-none">°F</span>
                      </span>
                    </span>

                                        {/* Celsius */}
                                        <span className={`fade-text ${unit === "C" ? "visible" : ""}`}>
                      <span className="text-lg inline-flex items-baseline leading-none">
                        {Math.round(h.temp_c)}
                          <span className="text-sm ml-1 leading-none">°C</span>
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

// src/components/ForecastItem.jsx
import React, { useMemo, useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";

export default function ForecastItem({ day, unit, theme, label, isTiny, dragRef }) {
    const [y, m, d] = day.date.split("-");
    const localDate = new Date(y, m - 1, d);
    const weekday = localDate.toLocaleDateString("en-US", { weekday: "short" });

    // ✅ Option B: viewport-based icon sizing (range-aware)
    const [vw, setVw] = useState(
        typeof window !== "undefined" ? window.innerWidth : 9999
    );

    useEffect(() => {
        const onResize = () => setVw(window.innerWidth);
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const iconSize = useMemo(() => {
        if (vw <= 280) return 70; // 240–280
        if (vw <= 320) return 76; // 281–320
        if (vw <= 346) return 78; // 321–346
        if (vw <= 360) return 82; // 347–360
        return 78;
    }, [vw]);

    return (
        <div
            data-forecast-card="true"
            className={`
        flex-shrink-0
        rounded-2xl
        flex flex-col items-center text-center
        ${theme.text}

        /* base */
        w-[150px] px-3 py-3.5

        /* 347–360 (match Hourly rhythm) */
        min-[347px]:max-[360px]:w-[160px]
        min-[347px]:max-[360px]:px-3
        min-[347px]:max-[360px]:py-3.5

        /* 321–346 */
        min-[321px]:max-[346px]:w-[154px]
        min-[321px]:max-[346px]:px-3
        min-[321px]:max-[346px]:py-3

        /* 281–320 */
        min-[281px]:max-[320px]:w-[148px]
        min-[281px]:max-[320px]:px-2.5
        min-[281px]:max-[320px]:py-3

        /* 240–280 */
        min-[240px]:max-[280px]:w-[124px]
        min-[240px]:max-[280px]:px-2
        min-[240px]:max-[280px]:py-2
        min-[240px]:max-[280px]:snap-center
      `}
        >
            {/* Title */}
            <div
                className={`
          flex items-center justify-center
          h-[78px]

          /* 321–346 */
          min-[321px]:max-[346px]:h-[74px]

          /* 281–320 */
          min-[281px]:max-[320px]:h-[70px]

          /* 240–280 */
          min-[240px]:max-[280px]:h-[60px]
        `}
            >
                <p
                    className={`
            opacity-80 font-semibold tracking-tight whitespace-nowrap
            min-[347px]:max-[360px]:text-[18px]
            min-[321px]:max-[346px]:text-[17px]
            min-[281px]:max-[320px]:text-[16px]
            min-[240px]:max-[280px]:text-[15px]
          `}
                >
                    {label || weekday}
                </p>
            </div>

            {/* Icon */}
            <div
                className={`
          flex items-center justify-center
          h-[78px]

          /* 347–360 */
          min-[347px]:max-[360px]:h-[72px]

          /* 321–346 */
          min-[321px]:max-[346px]:h-[70px]

          /* 281–320 */
          min-[281px]:max-[320px]:h-[68px]

          /* 240–280 */
          min-[240px]:max-[280px]:h-[58px]
        `}
            >
                <WeatherIcon
                    code={day.day.condition.code}
                    isDay={true}
                    size={iconSize}
                />
            </div>

            {/* Condition */}
            <div
                className={`
          w-full
          flex items-center justify-center
          mt-1
          min-[347px]:max-[360px]:h-[104px]
          min-[321px]:max-[346px]:h-[96px]
          min-[281px]:max-[320px]:h-[90px]
          min-[240px]:max-[280px]:h-[80px]
        `}
            >
                <p
                    className={`
            w-full
            text-center
            leading-snug
            opacity-80
            break-words
            overflow-y-auto
            scrollbar-none
            px-2

            min-[347px]:max-[360px]:text-[17px]
            min-[321px]:max-[346px]:text-[16px]
            min-[281px]:max-[320px]:text-[15px]
            min-[240px]:max-[280px]:text-[14px]
            min-[240px]:max-[280px]:px-0
          `}
                    onPointerDown={(e) => {
                        if (isTiny && dragRef?.current?.didDrag) e.preventDefault();
                    }}
                >
                    {day.day.condition.text}
                </p>
            </div>

            {/* Temps */}
            <div
                className={`
          flex items-center justify-center
          mt-3
          min-[240px]:max-[280px]:mt-2.5
        `}
            >
                <div className="fade-stack center tabular-nums font-semibold leading-none min-w-[9ch] whitespace-nowrap">
                    {/* F */}
                    <span className={`fade-text ${unit === "F" ? "visible" : ""}`}>
            <span className="text-[20px] inline-flex items-baseline max-[280px]:text-[17px]">
              {Math.round(day.day.maxtemp_f)}
                <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°F</span>
            </span>

            <span className="opacity-50 mx-1">/</span>

            <span className="text-[20px] inline-flex items-baseline opacity-70 max-[280px]:text-[17px]">
              {Math.round(day.day.mintemp_f)}
                <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°F</span>
            </span>
          </span>

                    {/* C */}
                    <span className={`fade-text ${unit === "C" ? "visible" : ""}`}>
            <span className="text-[20px] inline-flex items-baseline max-[280px]:text-[17px]">
              {Math.round(day.day.maxtemp_c)}
                <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°C</span>
            </span>

            <span className="opacity-50 mx-1">/</span>

            <span className="text-[20px] inline-flex items-baseline opacity-70 max-[280px]:text-[17px]">
              {Math.round(day.day.mintemp_c)}
                <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°C</span>
            </span>
          </span>
                </div>
            </div>
        </div>
    );
}

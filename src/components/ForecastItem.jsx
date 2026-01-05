// src/components/ForecastItem.jsx
import React, { useMemo, useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";

export default function ForecastItem({ day, unit, theme, label, isTiny, dragRef }) {
    const [y, m, d] = day.date.split("-");
    const localDate = new Date(y, m - 1, d);
    const weekday = localDate.toLocaleDateString("en-US", { weekday: "short" });

    // ✅ Option B: viewport-based icon sizing (range-aware)
    const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 9999);

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
            {/* ✅ 4-row grid ensures alignment across all forecast cards */}
            <div
                className={`
          grid items-center justify-items-center text-center
          [grid-template-rows:58px_58px_84px_28px]

          /* 347–360 */
          min-[347px]:max-[360px]:[grid-template-rows:78px_72px_104px_48px]

          /* 321–346 */
          min-[321px]:max-[346px]:[grid-template-rows:74px_70px_96px_48px]

          /* 281–320 */
          min-[281px]:max-[320px]:[grid-template-rows:70px_68px_90px_48px]

          /* 240–280 */
          min-[240px]:max-[280px]:[grid-template-rows:60px_58px_80px_44px]
        `}
            >
                {/* Title */}
                <p
                    className={`
            opacity-80 text-lg font-semibold tracking-tight whitespace-nowrap
            min-[347px]:max-[360px]:text-[18px]
            min-[321px]:max-[346px]:text-[17px]
            min-[281px]:max-[320px]:text-[16px]
            min-[240px]:max-[280px]:text-[15px]
          `}
                >
                    {label || weekday}
                </p>

                {/* Icon */}
                <div className="flex items-center justify-center">
                    <WeatherIcon code={day.day.condition.code} isDay={true} size={iconSize} />
                </div>

                {/* ✅ Condition: fixed slot + centered vertically */}
                <div className="w-full flex items-center justify-center px-2 min-[240px]:max-[280px]:px-0">
                    <p
                        className={`
              w-full text-center leading-snug opacity-80
              break-words whitespace-normal hyphens-auto
              overflow-hidden
              line-clamp-3

              min-[347px]:max-[360px]:text-[17px]
              min-[321px]:max-[346px]:text-[16px]
              min-[281px]:max-[320px]:text-[15px]
              min-[240px]:max-[280px]:text-[14px]
            `}
                        onPointerDown={(e) => {
                            if (isTiny && dragRef?.current?.didDrag) e.preventDefault();
                        }}
                        title={day.day.condition.text}
                    >
                        {day.day.condition.text}
                    </p>
                </div>

                {/* ✅ Temps: fixed slot so all temps align */}
                <div className="flex items-center justify-center">
                    <div className="fade-stack center tabular-nums font-semibold leading-none min-w-[9ch] whitespace-nowrap">
                        {/* F */}
                        <span className={`fade-text ${unit === "F" ? "visible" : ""}`}>
              {/* HIGH */}
                            <span
                                className={`inline-flex items-baseline text-[20px] opacity-95 max-[280px]:text-[17px] ${theme.text}`}
                            >
                {Math.round(day.day.maxtemp_f)}
                                <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°F</span>
              </span>

              <span className="opacity-40 mx-1">/</span>

                            {/* LOW */}
                            <span
                                className={`inline-flex items-baseline text-[20px] opacity-70 max-[280px]:text-[17px] ${theme.text}`}
                            >
                {Math.round(day.day.mintemp_f)}
                                <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°F</span>
              </span>
            </span>

                        {/* C */}
                        <span className={`fade-text ${unit === "C" ? "visible" : ""}`}>
              {/* HIGH */}
                            <span
                                className={`inline-flex items-baseline text-[20px] opacity-95 max-[280px]:text-[17px] ${theme.text}`}
                            >
                {Math.round(day.day.maxtemp_c)}
                                <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°C</span>
              </span>

              <span className="opacity-40 mx-1">/</span>

                            {/* LOW */}
                            <span
                                className={`inline-flex items-baseline text-[20px] opacity-70 max-[280px]:text-[17px] ${theme.text}`}
                            >
                {Math.round(day.day.mintemp_c)}
                                <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°C</span>
              </span>
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

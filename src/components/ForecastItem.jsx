// src/components/ForecastItem.jsx
import React, { useRef, useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";


export default function ForecastItem({ day, unit, theme, label }) {


    // FIX: Parse as local calendar date
    const [y, m, d] = day.date.split("-");
    const localDate = new Date(y, m - 1, d);

    const weekday = localDate.toLocaleDateString("en-US", { weekday: "short" });

    const textRef = useRef(null);
    const [isEllipsed, setIsEllipsed] = useState(false);
    const [showFull, setShowFull] = useState(false);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;
        setIsEllipsed(el.scrollHeight > el.clientHeight);
    }, [day]);

    return (
        <div className="flex flex-col items-center min-w-[90px]">

            {/* Title */}
            <h6 className={`font-semibold text-xl ${theme.text}`}>
                {label || weekday}
            </h6>

            <WeatherIcon code={day.day.condition.code} isDay={true} />

            {/* Condition text */}
            <div className="relative mt-2 h-[70px] flex items-center justify-center text-center max-w-[165px]">
            <p
                    ref={textRef}
                    onClick={() => setShowFull(!showFull)}
                    className={`
                        text-base capitalize opacity-80 leading-snug
                        ${theme.text}
                        ${isEllipsed ? "cursor-pointer" : ""}
                    `}
                    style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: showFull ? "unset" : 2,
                        WebkitBoxOrient: "vertical",
                    }}
                    title={isEllipsed ? day.day.condition.text : undefined}
                >
                    {day.day.condition.text}
                </p>
            </div>

            {/* Temps */}

            {/* Temps */}
            <div className={`fade-stack center text-lg font-semibold mt-3 ${theme.text} tabular-nums whitespace-nowrap`}>

                {/* Fahrenheit layer */}
                <span className={`fade-text ${unit === "F" ? "visible" : ""}`}>
  <span className="font-semibold">
    {Math.round(day.day.maxtemp_f)}°F
  </span>
  <span className="opacity-50"> / </span>
  <span className="opacity-70">
    {Math.round(day.day.mintemp_f)}°F
  </span>
</span>

                {/* Celsius layer */}
                <span className={`fade-text ${unit === "C" ? "visible" : ""}`}>
  <span className="font-semibold">
    {Math.round(day.day.maxtemp_c)}°C
  </span>
  <span className="opacity-50"> / </span>
  <span className="opacity-70">
    {Math.round(day.day.mintemp_c)}°C
  </span>
</span>



            </div>


        </div>
    );
}

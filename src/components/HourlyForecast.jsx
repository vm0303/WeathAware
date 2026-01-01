// src/components/HourlyForecast.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";

export default function HourlyForecast({ hours, unit, theme, localTime }) {
    // tiny breakpoint state (<= 280px)
    const [isTiny, setIsTiny] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 280px)");
        const sync = () => setIsTiny(mq.matches);
        sync();

        if (mq.addEventListener) mq.addEventListener("change", sync);
        else mq.addListener(sync);

        return () => {
            if (mq.removeEventListener) mq.removeEventListener("change", sync);
            else mq.removeListener(sync);
        };
    }, []);

    // ---------- Build sorted hours ----------
    const sortedHours = useMemo(() => {
        const safeHours = Array.isArray(hours) ? hours : [];
        const safeLocalTime = localTime || null;

        if (safeHours.length === 0 || !safeLocalTime) return [];

        const local = new Date(safeLocalTime.replace(" ", "T"));
        const currentHour = local.getHours();

        const before = safeHours.slice(currentHour);
        const after = safeHours.slice(0, currentHour);

        return [...before, ...after];
    }, [hours, localTime]);

    const scrollerRef = useRef(null);

    const dragRef = useRef({
        isDown: false,
        startX: 0,
        scrollLeft: 0,
        didDrag: false,
    });

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
            <div className="pointer-events-none absolute left-0 top-0 h-full w-10 z-20" />

            {/* Padding: 280 stays tight, 320 gets a touch more room */}
            <div className={`${theme.card} p-5 max-[320px]:p-4 max-[280px]:p-4`}>
                <h2
                    className={`
            text-xl font-semibold mb-3 ${theme.text}
            max-[320px]:text-lg max-[320px]:text-center
            max-[280px]:text-base max-[280px]:text-center
          `}
                >
                    Hourly Forecast
                </h2>

                <div className="relative">
                    <div
                        ref={scrollerRef}
                        className={`
              flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none

              /* <=320: slightly tighter than desktop, but not as tight as 280 */
              max-[320px]:gap-3.5
              max-[320px]:pb-2.5
              max-[320px]:px-4
              max-[320px]:scroll-px-4

              /* <=280: keep your tiny carousel behavior */
              max-[280px]:gap-3
              max-[280px]:pb-2
              max-[280px]:snap-x max-[280px]:snap-mandatory
              max-[280px]:select-none
            `}
                        onPointerDown={(e) => {
                            if (!isTiny) return;
                            const el = scrollerRef.current;
                            if (!el) return;

                            dragRef.current.isDown = true;
                            dragRef.current.startX = e.clientX;
                            dragRef.current.scrollLeft = el.scrollLeft;
                            dragRef.current.didDrag = false;

                            el.setPointerCapture?.(e.pointerId);
                        }}
                        onPointerMove={(e) => {
                            if (!isTiny) return;
                            const el = scrollerRef.current;
                            if (!el) return;
                            if (!dragRef.current.isDown) return;

                            const dx = e.clientX - dragRef.current.startX;
                            if (Math.abs(dx) > 4) dragRef.current.didDrag = true;

                            el.scrollLeft = dragRef.current.scrollLeft - dx;
                        }}
                        onPointerUp={() => {
                            if (!isTiny) return;
                            dragRef.current.isDown = false;
                            window.setTimeout(() => {
                                dragRef.current.didDrag = false;
                            }, 120);
                        }}
                        onPointerCancel={() => {
                            if (!isTiny) return;
                            dragRef.current.isDown = false;
                            dragRef.current.didDrag = false;
                        }}
                    >
                        {sortedHours.map((h, i) => (
                            <div
                                key={i}
                                data-hour-card="true"
                                className={`
                  flex-shrink-0
                  w-[150px]
                  rounded-2xl
                  px-3 py-3
                  flex flex-col items-center text-center
                  ${theme.text}

                  /* <=320: slightly wider than 280 so it breathes */
                  max-[320px]:w-[136px]
                  max-[320px]:px-2.5 max-[320px]:py-2.5

                  /* <=280: keep your exact tiny sizing */
                  max-[280px]:w-[124px]
                  max-[280px]:px-2 max-[280px]:py-2
                  max-[280px]:snap-center
                `}
                            >
                                {/* Time */}
                                <div className="h-[70px] flex items-center justify-center max-[320px]:h-[62px] max-[280px]:h-[55px]">
                                    <p className="text-md font-semibold tracking-tight opacity-80 whitespace-nowrap max-[320px]:text-[15px] max-[280px]:text-md">
                                        {i === 0 ? "Now" : format12Hour(h.time)}
                                    </p>
                                </div>

                                {/* Icon */}
                                <div className="h-[75px] flex items-center justify-center max-[320px]:h-[64px] max-[280px]:h-[55px]">
                                    <WeatherIcon
                                        code={h.condition.code}
                                        isDay={h.is_day === 1}
                                        // 320 gets a tiny bump; 280 stays the same feel
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
                                            if (isTiny && dragRef.current.didDrag) e.preventDefault();
                                        }}
                                    >
                                        {h.condition.text}
                                    </p>
                                </div>

                                {/* Temp */}
                                <div className="flex items-center justify-center mt-2 max-[320px]:mt-2.5 max-[280px]:mt-2.5">
                                    <div className="fade-stack center tabular-nums font-semibold leading-none min-w-[5ch]">
                    <span className={`fade-text ${unit === "F" ? "visible" : ""}`}>
                      <span className="text-lg inline-flex items-baseline leading-none max-[320px]:text-lg max-[280px]:text-md">
                        {Math.round(h.temp_f)}
                          <span className="text-sm ml-1 leading-none max-[320px]:text-sm max-[280px]:text-[13px]">
                          °F
                        </span>
                      </span>
                    </span>

                                        <span className={`fade-text ${unit === "C" ? "visible" : ""}`}>
                      <span className="text-lg inline-flex items-baseline leading-none max-[320px]:text-lg max-[280px]:text-md">
                        {Math.round(h.temp_c)}
                          <span className="text-sm ml-1 leading-none max-[320px]:text-sm max-[280px]:text-[13px]">
                          °C
                        </span>
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

// src/components/HourlyForecast.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";

export default function HourlyForecast({ hours, unit, theme, localTime }) {
    // tiny breakpoint state (<= 280px)
    const [isTiny, setIsTiny] = useState(false);

    // ✅ Option B: viewport-based icon sizing (range-aware)
    const [vw, setVw] = useState(
        typeof window !== "undefined" ? window.innerWidth : 9999
    );

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 280px)");
        const syncTiny = () => setIsTiny(mq.matches);
        syncTiny();

        if (mq.addEventListener) mq.addEventListener("change", syncTiny);
        else mq.addListener(syncTiny);

        const onResize = () => setVw(window.innerWidth);
        window.addEventListener("resize", onResize, { passive: true });

        return () => {
            if (mq.removeEventListener) mq.removeEventListener("change", syncTiny);
            else mq.removeListener(syncTiny);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const iconSize = useMemo(() => {
        if (vw <= 280) return 70; // 240–280
        if (vw <= 320) return 76; // 281–320
        if (vw <= 346) return 78; // 321–346
        if (vw <= 360) return 82; // 347–360
        return 78; // fallback (desktop-ish)
    }, [vw]);

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

            {/* Card */}
            <div className={`${theme.card} p-5 max-[360px]:p-4 max-[280px]:p-4`}>
                <h2
                    className={`
            text-xl font-semibold mb-4 ${theme.text}
            min-[347px]:max-[360px]:text-xl
            min-[321px]:max-[346px]:text-xl
            min-[281px]:max-[320px]:text-xl
            min-[240px]:max-[280px]:text-lg
            max-[360px]:text-center
          `}
                >
                    Hourly Forecast
                </h2>

                <div className="relative">
                    <div
                        ref={scrollerRef}
                        className={`
              flex overflow-x-auto scrollbar-none
              gap-5 pb-4 px-2

              /* 347–360 */
              min-[347px]:max-[360px]:gap-5
              min-[347px]:max-[360px]:px-4

              /* 321–346 */
              min-[321px]:max-[346px]:gap-4.5
              min-[321px]:max-[346px]:px-4

              /* 281–320 */
              min-[281px]:max-[320px]:gap-4
              min-[281px]:max-[320px]:px-3

              /* <=280 tiny carousel */
              max-[280px]:gap-3
              max-[280px]:snap-x
              max-[280px]:snap-mandatory
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
                            if (!dragRef.current.isDown) return;

                            const el = scrollerRef.current;
                            const dx = e.clientX - dragRef.current.startX;
                            if (Math.abs(dx) > 4) dragRef.current.didDrag = true;

                            el.scrollLeft = dragRef.current.scrollLeft - dx;
                        }}
                        onPointerUp={() => {
                            dragRef.current.isDown = false;
                            setTimeout(() => (dragRef.current.didDrag = false), 120);
                        }}
                        onPointerCancel={() => {
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
                  rounded-2xl
                  flex flex-col items-center text-center
                  ${theme.text}

                  /* 347–360 */
                  min-[347px]:max-[360px]:w-[160px]
                  min-[347px]:max-[360px]:px-3 min-[347px]:max-[360px]:py-3.5

                  /* 321–346 */
                  min-[321px]:max-[346px]:w-[154px]
                  min-[321px]:max-[346px]:px-3 min-[321px]:max-[346px]:py-3

                  /* 281–320 */
                  min-[281px]:max-[320px]:w-[148px]
                  min-[281px]:max-[320px]:px-2.5 min-[281px]:max-[320px]:py-3

                  /* <=280 */
                  max-[280px]:w-[124px]
                  max-[280px]:px-2 max-[280px]:py-2
                  max-[280px]:snap-center
                `}
                            >
                                {/* Time */}
                                <div className="h-[78px] flex items-center justify-center max-[320px]:h-[70px] max-[280px]:h-[60px]">
                                    <p
                                        className={`
                      font-semibold opacity-85 whitespace-nowrap
                      min-[347px]:max-[360px]:text-[19px]
                      min-[321px]:max-[346px]:text-[18px]
                      min-[281px]:max-[320px]:text-[17px]
                      min-[240px]:max-[280px]:text-[16px]
                    `}
                                    >
                                        {i === 0 ? "Now" : format12Hour(h.time)}
                                    </p>
                                </div>

                                {/* Icon */}
                                <div className="h-[78px] flex items-center justify-center max-[320px]:h-[68px] max-[280px]:h-[58px]">
                                    <WeatherIcon
                                        code={h.condition.code}
                                        isDay={h.is_day === 1}
                                        // ✅ Range-aware size (Option B). isTiny can still be used by your drag logic.
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
                      overflow-hidden
                      px-2

                      min-[347px]:max-[360px]:text-[17px]
                      min-[321px]:max-[346px]:text-[16px]
                      min-[281px]:max-[320px]:text-[15px]
                      min-[240px]:max-[280px]:text-[14px]
                      min-[240px]:max-[280px]:px-0
                    `}
                                        onPointerDown={(e) => {
                                            if (isTiny && dragRef.current.didDrag) e.preventDefault();
                                        }}
                                    >
                                        {h.condition.text}
                                    </p>
                                </div>

                                {/* Temp */}
                                <div className="flex items-center justify-center mt-3 max-[320px]:mt-3 max-[280px]:mt-2.5">
                                    <div className="fade-stack center tabular-nums font-semibold leading-none min-w-[5ch]">
                    <span className={`fade-text ${unit === "F" ? "visible" : ""}`}>
                      <span className="text-[20px] inline-flex items-baseline max-[280px]:text-[17px]">
                        {Math.round(h.temp_f)}
                          <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°F</span>
                      </span>
                    </span>

                                        <span className={`fade-text ${unit === "C" ? "visible" : ""}`}>
                      <span className="text-[20px] inline-flex items-baseline max-[280px]:text-[17px]">
                        {Math.round(h.temp_c)}
                          <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°C</span>
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

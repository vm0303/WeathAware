// src/components/Forecast.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import ForecastItem from "./ForecastItem";

export default function Forecast({ weather, unit, theme }) {
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

    const scrollerRef = useRef(null);
    const dragRef = useRef({
        isDown: false,
        startX: 0,
        scrollLeft: 0,
        didDrag: false,
    });

    const days = useMemo(() => {
        const forecastDays = weather?.forecast?.forecastday;
        const localtime = weather?.location?.localtime;
        if (!forecastDays || !localtime) return [];

        const todayStr = localtime.split(" ")[0];
        return forecastDays.filter((d) => d.date >= todayStr).slice(0, 3);
    }, [weather]);

    if (days.length === 0) return null;

    return (
        <div className="rounded-2xl shadow-lg mb-8 overflow-hidden relative">
            <div
                className={`
          ${theme.card}
          transition-colors duration-300

          p-6

          /* 347–360 */
          min-[347px]:max-[360px]:p-5

          /* 321–346 */
          min-[321px]:max-[346px]:p-5

          /* 281–320 */
          min-[281px]:max-[320px]:p-4

          /* 240–280 */
          min-[240px]:max-[280px]:p-4
        `}
            >
                <h2
                    className={`
            text-xl font-semibold text-center ${theme.text}

            /* match Hourly Forecast rhythm */
            min-[347px]:max-[360px]:text-xl
            min-[321px]:max-[346px]:text-xl
            min-[281px]:max-[320px]:text-xl
            min-[240px]:max-[280px]:text-lg
          `}
                >
                    3-Day Forecast
                </h2>

                <div className="relative">
                    <div
                        ref={scrollerRef}
                        className={`
              flex overflow-x-auto mt-4 pb-2 scrollbar-none

              /* 347–360 */
              min-[347px]:max-[360px]:gap-5
              min-[347px]:max-[360px]:px-4
              min-[347px]:max-[360px]:scroll-px-4

              /* 321–346 */
              min-[321px]:max-[346px]:gap-4.5
              min-[321px]:max-[346px]:px-4
              min-[321px]:max-[346px]:scroll-px-4

              /* 281–320 */
              min-[281px]:max-[320px]:gap-4
              min-[281px]:max-[320px]:px-3
              min-[281px]:max-[320px]:scroll-px-3

              /* 240–280 tiny carousel behavior */
              min-[240px]:max-[280px]:gap-3
              min-[240px]:max-[280px]:snap-x
              min-[240px]:max-[280px]:snap-mandatory
              min-[240px]:max-[280px]:select-none

              /* larger screens: keep centered like before */
              md:justify-center md:gap-12 md:px-0 md:snap-none
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
                        {days.map((d, i) => (
                            <ForecastItem
                                key={d.date}
                                day={d}
                                unit={unit}
                                theme={theme}
                                label={i === 0 ? "Today" : null}
                                isTiny={isTiny}
                                dragRef={dragRef}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

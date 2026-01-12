// src/components/HourlyForecast.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import WeatherIcon, {useWeatherIconSize} from "./WeatherIcon";

export default function HourlyForecast({ hours, unit, theme, localTime }) {
    const [isTiny, setIsTiny] = useState(false);
    const iconSize = useWeatherIconSize();

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 280px)");
        const syncTiny = () => setIsTiny(mq.matches);
        syncTiny();

        if (mq.addEventListener) mq.addEventListener("change", syncTiny);
        else mq.addListener(syncTiny);

        return () => {
            if (mq.removeEventListener) mq.removeEventListener("change", syncTiny);
            else mq.removeListener(syncTiny);
        };
    }, []);



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
            text-xl text-center font-semibold mb-4 ${theme.text}
            

            /* 413–432 */
            min-[413px]:max-[432px]:text-[22px]
            

            /* 401–412 */
            min-[401px]:max-[412px]:text-[22px]
            

            /* 391–400 */
            min-[391px]:max-[400px]:text-[21px]
            

            /* 385–390 */
            min-[385px]:max-[390px]:text-[21px]
            

            /* 377–384 */
            min-[377px]:max-[384px]:text-[20px]
            

            /* 361–376 */
            min-[361px]:max-[376px]:text-[20px]
            

            /* 347–360 */
            min-[347px]:max-[360px]:text-xl

            /* 321–346 */
            min-[321px]:max-[346px]:text-xl

            /* 281–320 */
            min-[281px]:max-[320px]:text-xl

            /* 240–280 */
            min-[240px]:max-[280px]:text-lg
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

              /* 413–432 */
              min-[413px]:max-[432px]:gap-6
              min-[413px]:max-[432px]:px-5

              /* 401–412 */
              min-[401px]:max-[412px]:gap-6
              min-[401px]:max-[412px]:px-5

              /* 391–400 */
              min-[391px]:max-[400px]:gap-5.5
              min-[391px]:max-[400px]:px-5

              /* 385–390 */
              min-[385px]:max-[390px]:gap-5.5
              min-[385px]:max-[390px]:px-5

              /* 377–384 */
              min-[377px]:max-[384px]:gap-5
              min-[377px]:max-[384px]:px-4.5

              /* 361–376 */
              min-[361px]:max-[376px]:gap-5
              min-[361px]:max-[376px]:px-4.5

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
                  ${theme.text}

                  /* ✅ base (desktop too) */
                  w-[150px] px-3 py-3.5

                  /* 413–432 */
                  min-[413px]:max-[432px]:w-[176px]
                  min-[413px]:max-[432px]:px-3.5
                  min-[413px]:max-[432px]:py-4

                  /* 401–412 */
                  min-[401px]:max-[412px]:w-[172px]
                  min-[401px]:max-[412px]:px-3.5
                  min-[401px]:max-[412px]:py-4

                  /* 391–400 */
                  min-[391px]:max-[400px]:w-[168px]
                  min-[391px]:max-[400px]:px-3.5
                  min-[391px]:max-[400px]:py-4

                  /* 385–390 */
                  min-[385px]:max-[390px]:w-[166px]
                  min-[385px]:max-[390px]:px-3.25
                  min-[385px]:max-[390px]:py-3.75

                  /* 377–384 */
                  min-[377px]:max-[384px]:w-[164px]
                  min-[377px]:max-[384px]:px-3.25
                  min-[377px]:max-[384px]:py-3.75

                  /* 361–376 */
                  min-[361px]:max-[376px]:w-[162px]
                  min-[361px]:max-[376px]:px-3.25
                  min-[361px]:max-[376px]:py-3.75

                  /* 347–360 */
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

                  /* <=280 */
                  max-[280px]:w-[124px]
                  max-[280px]:px-2
                  max-[280px]:py-2
                  max-[280px]:snap-center
                `}
                            >
                                {/* ✅ 4-row grid ensures alignment across all cards */}
                                <div
                                    className={`
                    grid items-center justify-items-center text-center
                    [grid-template-rows:68px_68px_95px_30px]

                    /* 413–432 */
                    min-[413px]:max-[432px]:[grid-template-rows:82px_76px_110px_50px]

                    /* 401–412 */
                    min-[401px]:max-[412px]:[grid-template-rows:82px_76px_110px_50px]

                    /* 391–400 */
                    min-[391px]:max-[400px]:[grid-template-rows:80px_74px_108px_50px]

                    /* 385–390 */
                    min-[385px]:max-[390px]:[grid-template-rows:80px_74px_106px_50px]

                    /* 377–384 */
                    min-[377px]:max-[384px]:[grid-template-rows:79px_73px_106px_50px]

                    /* 361–376 */
                    min-[361px]:max-[376px]:[grid-template-rows:79px_73px_104px_50px]

                    /* 347–360 */
                    min-[347px]:max-[360px]:[grid-template-rows:78px_72px_104px_48px]

                    /* 321–346 */
                    min-[321px]:max-[346px]:[grid-template-rows:74px_70px_96px_48px]

                    /* 281–320 */
                    min-[281px]:max-[320px]:[grid-template-rows:70px_68px_90px_48px]

                    /* 240–280 */
                    max-[280px]:[grid-template-rows:60px_58px_80px_44px]
                  `}
                                >
                                    {/* Time */}
                                    <p
                                        className={`
                      font-semibold text-lg opacity-85 whitespace-nowrap

                      /* 401–412 */
                      min-[401px]:max-[412px]:text-[20px]

                      /* 391–400 */
                      min-[391px]:max-[400px]:text-[19px]

                      /* 385–390 */
                      min-[385px]:max-[390px]:text-[19px]

                      /* 361–384 */
                      min-[361px]:max-[384px]:text-[18px]

                      min-[347px]:max-[360px]:text-[19px]
                      min-[321px]:max-[346px]:text-[18px]
                      min-[281px]:max-[320px]:text-[17px]
                      min-[240px]:max-[280px]:text-[16px]
                    `}
                                    >
                                        {i === 0 ? "Now" : format12Hour(h.time)}
                                    </p>

                                    {/* Icon */}
                                    <div className="flex items-center justify-center">
                                        <WeatherIcon code={h.condition.code} isDay={h.is_day === 1} size={iconSize} />
                                    </div>

                                    {/* ✅ Condition: fixed slot + centered vertically */}
                                    <div className="w-full flex items-center justify-center px-2 max-[280px]:px-0 ">
                                        <p
                                            className={`
                        w-full text-center leading-snug opacity-80
                        break-words whitespace-normal
                        
                        
                        /* 433-440 */
                        min-[433px]:max:[440px]:text-[20px]

                        /* 413–432 */
                        min-[413px]:max-[432px]:text-[17px]

                        /* 401–412 */
                        min-[401px]:max-[412px]:text-[17px]

                        /* 391–400 */
                        min-[391px]:max-[400px]:text-[16px]

                        /* 385–390 */
                        min-[385px]:max-[390px]:text-[17px]

                        /* 361–384 */
                        min-[361px]:max-[384px]:text-[17px]

                        min-[347px]:max-[360px]:text-[17px]
                        min-[321px]:max-[346px]:text-[16px]
                        min-[281px]:max-[320px]:text-[15px]
                        min-[240px]:max-[280px]:text-[14px]
                      `}
                                            onPointerDown={(e) => {
                                                if (isTiny && dragRef.current.didDrag) e.preventDefault();
                                            }}
                                            title={h.condition.text}
                                        >
                                            {h.condition.text}
                                        </p>
                                    </div>

                                    {/* ✅ Temp: fixed slot so all temps align */}
                                    <div className="flex items-center justify-center">
                                        <div className="fade-stack center tabular-nums font-semibold leading-none min-w-[5ch]">
                      <span className={`fade-text ${unit === "F" ? "visible" : ""}`}>
                        <span
                            className={`
                            text-[20px] inline-flex items-baseline max-[280px]:text-[17px]

                            /* 413–432 */
                            min-[413px]:max-[432px]:text-[21px]

                            /* 401–412 */
                            min-[401px]:max-[412px]:text-[21px]

                            /* 391–400 */
                            min-[391px]:max-[400px]:text-[20px]

                            /* 385–390 */
                            min-[385px]:max-[390px]:text-[20px]

                            /* 361–384 */
                            min-[361px]:max-[384px]:text-[19px]
                          `}
                        >
                          {Math.round(h.temp_f)}
                            <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°F</span>
                        </span>
                      </span>

                                            <span className={`fade-text ${unit === "C" ? "visible" : ""}`}>
                        <span
                            className={`
                            text-[20px] inline-flex items-baseline max-[280px]:text-[17px]

                            /* 413–432 */
                            min-[413px]:max-[432px]:text-[21px]

                            /* 401–412 */
                            min-[401px]:max-[412px]:text-[21px]

                            /* 391–400 */
                            min-[391px]:max-[400px]:text-[20px]

                            /* 385–390 */
                            min-[385px]:max-[390px]:text-[20px]

                            /* 361–384 */
                            min-[361px]:max-[384px]:text-[19px]
                          `}
                        >
                          {Math.round(h.temp_c)}
                            <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°C</span>
                        </span>
                      </span>
                                        </div>
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

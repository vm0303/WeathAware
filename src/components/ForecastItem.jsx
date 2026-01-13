// src/components/ForecastItem.jsx
import React from "react";
import WeatherIcon,{useWeatherIconSize} from "./WeatherIcon";

export default function ForecastItem({ day, unit, theme, label, isTiny, dragRef }) {
    const [y, m, d] = day.date.split("-");
    const localDate = new Date(y, m - 1, d);
    const weekday = localDate.toLocaleDateString("en-US", { weekday: "short" });
    const iconSize =useWeatherIconSize();




    return (
        <div
            data-forecast-card="true"
            className={`
        flex-shrink-0
        rounded-2xl
        ${theme.text}

        /* base */
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
          min-[240px]:max-[280px]:[grid-template-rows:60px_58px_80px_44px]
        `}
            >
                {/* Title */}
                <p
                    className={`
            opacity-80 text-lg font-semibold tracking-tight whitespace-nowrap

            /* 413–432 */
            min-[413px]:max-[432px]:text-[20px]

            /* 401–412 */
            min-[401px]:max-[412px]:text-[20px]

            /* 391–400 */
            min-[391px]:max-[400px]:text-[19px]

            /* 385–390 */
            min-[385px]:max-[390px]:text-[19px]

            /* 361–384 */
            min-[361px]:max-[384px]:text-[18px]

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
                <div className="w-full flex items-center justify-center px-1 min-[240px]:max-[280px]:px-0">
                    <p
                        className={`
              w-full text-center leading-snug opacity-80
              break-words whitespace-normal hyphens-auto
              
              
              
              

              /* 413–432 */
              min-[413px]:max-[432px]:text-[18px]

              /* 401–412 */
              min-[401px]:max-[412px]:text-[17px]

              /* 391–400 */
              min-[391px]:max-[400px]:text-[17px]

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
                                className={`
                  inline-flex items-baseline text-[20px] opacity-95 max-[280px]:text-[17px] ${theme.text}

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
                {Math.round(day.day.maxtemp_f)}
                                <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°F</span>
              </span>

              <span className="opacity-40 mx-1">/</span>

                            {/* LOW */}
                            <span
                                className={`
                  inline-flex items-baseline text-[20px] opacity-70 max-[280px]:text-[17px] ${theme.text}

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
                {Math.round(day.day.mintemp_f)}
                                <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°F</span>
              </span>
            </span>

                        {/* C */}
                        <span className={`fade-text ${unit === "C" ? "visible" : ""}`}>
              {/* HIGH */}
                            <span
                                className={`
                  inline-flex items-baseline text-[20px] opacity-95 max-[280px]:text-[17px] ${theme.text}

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
                {Math.round(day.day.maxtemp_c)}
                                <span className="text-[14px] ml-1 max-[280px]:text-[13px]">°C</span>
              </span>

              <span className="opacity-40 mx-1">/</span>

                            {/* LOW */}
                            <span
                                className={`
                  inline-flex items-baseline text-[20px] opacity-70 max-[280px]:text-[17px] ${theme.text}

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

// src/components/SunriseSunsetCard.jsx
import React from "react";
import sunriseIcon from "../assets/meteocons/sunrise.svg";
import sunsetIcon from "../assets/meteocons/sunset.svg";

export default function SunriseSunsetCard({ astro, theme }) {
    if (!astro) return null;

    const { sunrise, sunset } = astro;

    return (
        <div className={`rounded-2xl shadow-lg mb-8 overflow-hidden ${theme.card}`}>
            <div
                className="
          p-6

          /* 413–432 */
          min-[413px]:max-[432px]:p-6

          /* 401–412 */
          min-[401px]:max-[412px]:p-6

          /* 391–400 */
          min-[391px]:max-[400px]:p-6

          /* 385–390 */
          min-[385px]:max-[390px]:p-6

          /* 377–384 */
          min-[377px]:max-[384px]:p-6

          /* 361–376 */
          min-[361px]:max-[376px]:p-6

          /* 347–360 */
          min-[347px]:max-[360px]:p-5

          /* 321–346 */
          min-[321px]:max-[346px]:p-4

          /* 281–320 */
          min-[281px]:max-[320px]:p-4

          /* 240–280 */
          min-[240px]:max-[280px]:p-3
        "
            >
                <h2
                    className={`
            font-semibold text-center ${theme.text}

            /* base (desktop+) */
            text-xl mb-6

            /* 413–432 (down one) */
            min-[413px]:max-[432px]:text-[22px]
            min-[413px]:max-[432px]:mb-6

            /* 401–412 (down one) */
            min-[401px]:max-[412px]:text-[22px]
            min-[401px]:max-[412px]:mb-6

            /* 391–400 (down one) */
            min-[391px]:max-[400px]:text-[21px]
            min-[391px]:max-[400px]:mb-6

            /* 385–390 (down one) */
            min-[385px]:max-[390px]:text-[21px]
            min-[385px]:max-[390px]:mb-6

            /* 377–384 (down one) */
            min-[377px]:max-[384px]:text-[20px]
            min-[377px]:max-[384px]:mb-6

            /* 361–376 (down one) */
            min-[361px]:max-[376px]:text-[20px]
            min-[361px]:max-[376px]:mb-6

            /* 347–360 */
            min-[347px]:max-[360px]:text-xl
            min-[347px]:max-[360px]:mb-5

            /* 321–346 */
            min-[321px]:max-[346px]:text-xl
            min-[321px]:max-[346px]:mb-4

            /* 281–320 */
            min-[281px]:max-[320px]:text-xl
            min-[281px]:max-[320px]:mb-4

            /* 240–280 */
            min-[240px]:max-[280px]:text-lg
            min-[240px]:max-[280px]:mb-3
          `}
                >
                    Sunrise &amp; Sunset
                </h2>

                <div
                    className="
            grid grid-cols-2 text-center
            gap-8

            /* 413–432 (down one) */
            min-[413px]:max-[432px]:gap-9

            /* 401–412 (down one) */
            min-[401px]:max-[412px]:gap-9

            /* 391–400 (down one) */
            min-[391px]:max-[400px]:gap-8

            /* 385–390 (down one) */
            min-[385px]:max-[390px]:gap-8

            /* 377–384 (down one) */
            min-[377px]:max-[384px]:gap-8

            /* 361–376 (down one) */
            min-[361px]:max-[376px]:gap-8

            /* 347–360 */
            min-[347px]:max-[360px]:gap-7

            /* 321–346 */
            min-[321px]:max-[346px]:gap-6

            /* 281–320 */
            min-[281px]:max-[320px]:gap-5

            /* 240–280 */
            min-[240px]:max-[280px]:gap-3
          "
                >
                    {/* Sunrise */}
                    <div className="flex flex-col items-center">
                        <img
                            src={sunriseIcon}
                            alt="Sunrise"
                            className="
                object-contain weather-icon

                /* base (desktop+) */
                w-20 h-20

                /* 413–432 (down one) */
                min-[413px]:max-[432px]:w-[92px]
                min-[413px]:max-[432px]:h-[92px]

                /* 401–412 (down one) */
                min-[401px]:max-[412px]:w-[90px]
                min-[401px]:max-[412px]:h-[90px]

                /* 391–400 (down one) */
                min-[391px]:max-[400px]:w-[88px]
                min-[391px]:max-[400px]:h-[88px]

                /* 385–390 (down one) */
                min-[385px]:max-[390px]:w-[86px]
                min-[385px]:max-[390px]:h-[86px]

                /* 377–384 (down one) */
                min-[377px]:max-[384px]:w-[86px]
                min-[377px]:max-[384px]:h-[86px]

                /* 361–376 (down one) */
                min-[361px]:max-[376px]:w-[84px]
                min-[361px]:max-[376px]:h-[84px]

                /* 347–360 (slightly bigger) */
                min-[347px]:max-[360px]:w-[88px]
                min-[347px]:max-[360px]:h-[88px]

                /* 321–346 */
                min-[321px]:max-[346px]:w-[84px]
                min-[321px]:max-[346px]:h-[84px]

                /* 281–320 */
                min-[281px]:max-[320px]:w-[80px]
                min-[281px]:max-[320px]:h-[80px]

                /* 240–280 */
                min-[240px]:max-[280px]:w-[76px]
                min-[240px]:max-[280px]:h-[76px]

                /* keep your larger breakpoints */
                md:w-24 md:h-24
                lg:w-28 lg:h-28
              "
                        />
                        <p
                            className={`
                opacity-80 mt-1 ${theme.text}

                /* base */
                text-lg

                /* 413–432 (down one) */
                min-[413px]:max-[432px]:text-[17px]

                /* 401–412 (down one) */
                min-[401px]:max-[412px]:text-[17px]

                /* 391–400 (down one) */
                min-[391px]:max-[400px]:text-[16px]

                /* 385–390 (down one) */
                min-[385px]:max-[390px]:text-[16px]

                /* 361–384 (down one) */
                min-[361px]:max-[384px]:text-[15px]

                /* 347–360 */
                min-[347px]:max-[360px]:text-[16px]

                /* 321–346 */
                min-[321px]:max-[346px]:text-[15px]

                /* 281–320 */
                min-[281px]:max-[320px]:text-[15px]

                /* 240–280 */
                min-[240px]:max-[280px]:text-[14px]
              `}
                        >
                            Sunrise
                        </p>
                        <p
                            className={`
                font-bold mt-1 ${theme.text}

                /* base */
                text-xl

                /* 413–432 (down one) */
                min-[413px]:max-[432px]:text-[22px]

                /* 401–412 (down one) */
                min-[401px]:max-[412px]:text-[22px]

                /* 391–400 (down one) */
                min-[391px]:max-[400px]:text-[21px]

                /* 385–390 (down one) */
                min-[385px]:max-[390px]:text-[20px]

                /* 361–384 (down one) */
                min-[361px]:max-[384px]:text-[19px]

                /* 347–360 */
                min-[347px]:max-[360px]:text-[18px]

                /* 321–346 */
                min-[321px]:max-[346px]:text-[17px]

                /* 281–320 */
                min-[281px]:max-[320px]:text-[17px]

                /* 240–280 */
                min-[240px]:max-[280px]:text-[16px]
              `}
                        >
                            {sunrise}
                        </p>
                    </div>

                    {/* Sunset */}
                    <div className="flex flex-col items-center">
                        <img
                            src={sunsetIcon}
                            alt="Sunset"
                            className="
                object-contain weather-icon

                /* base (desktop+) */
                w-20 h-20

                /* 413–432 (down one) */
                min-[413px]:max-[432px]:w-[92px]
                min-[413px]:max-[432px]:h-[92px]

                /* 401–412 (down one) */
                min-[401px]:max-[412px]:w-[90px]
                min-[401px]:max-[412px]:h-[90px]

                /* 391–400 (down one) */
                min-[391px]:max-[400px]:w-[88px]
                min-[391px]:max-[400px]:h-[88px]

                /* 385–390 (down one) */
                min-[385px]:max-[390px]:w-[86px]
                min-[385px]:max-[390px]:h-[86px]

                /* 377–384 (down one) */
                min-[377px]:max-[384px]:w-[86px]
                min-[377px]:max-[384px]:h-[86px]

                /* 361–376 (down one) */
                min-[361px]:max-[376px]:w-[84px]
                min-[361px]:max-[376px]:h-[84px]

                /* 347–360 (slightly bigger) */
                min-[347px]:max-[360px]:w-[88px]
                min-[347px]:max-[360px]:h-[88px]

                /* 321–346 */
                min-[321px]:max-[346px]:w-[84px]
                min-[321px]:max-[346px]:h-[84px]

                /* 281–320 */
                min-[281px]:max-[320px]:w-[80px]
                min-[281px]:max-[320px]:h-[80px]

                /* 240–280 */
                min-[240px]:max-[280px]:w-[76px]
                min-[240px]:max-[280px]:h-[76px]

                /* keep your larger breakpoints */
                md:w-24 md:h-24
                lg:w-28 lg:h-28
              "
                        />
                        <p
                            className={`
                opacity-80 mt-1 ${theme.text}

                /* base */
                text-lg

                /* 413–432 (down one) */
                min-[413px]:max-[432px]:text-[17px]

                /* 401–412 (down one) */
                min-[401px]:max-[412px]:text-[17px]

                /* 391–400 (down one) */
                min-[391px]:max-[400px]:text-[16px]

                /* 385–390 (down one) */
                min-[385px]:max-[390px]:text-[16px]

                /* 361–384 (down one) */
                min-[361px]:max-[384px]:text-[15px]

                /* 347–360 */
                min-[347px]:max-[360px]:text-[16px]

                /* 321–346 */
                min-[321px]:max-[346px]:text-[15px]

                /* 281–320 */
                min-[281px]:max-[320px]:text-[15px]

                /* 240–280 */
                min-[240px]:max-[280px]:text-[14px]
              `}
                        >
                            Sunset
                        </p>
                        <p
                            className={`
                font-bold mt-1 ${theme.text}

                /* base */
                text-xl

                /* 413–432 (down one) */
                min-[413px]:max-[432px]:text-[22px]

                /* 401–412 (down one) */
                min-[401px]:max-[412px]:text-[22px]

                /* 391–400 (down one) */
                min-[391px]:max-[400px]:text-[21px]

                /* 385–390 (down one) */
                min-[385px]:max-[390px]:text-[20px]

                /* 361–384 (down one) */
                min-[361px]:max-[384px]:text-[19px]

                /* 347–360 */
                min-[347px]:max-[360px]:text-[18px]

                /* 321–346 */
                min-[321px]:max-[346px]:text-[17px]

                /* 281–320 */
                min-[281px]:max-[320px]:text-[17px]

                /* 240–280 */
                min-[240px]:max-[280px]:text-[16px]
              `}
                        >
                            {sunset}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

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

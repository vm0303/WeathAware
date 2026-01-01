// src/components/SunriseSunsetCard.jsx
import React from "react";
import sunriseIcon from "../assets/meteocons/sunrise.svg";
import sunsetIcon from "../assets/meteocons/sunset.svg";

export default function SunriseSunsetCard({ astro, theme }) {
    if (!astro) return null;

    const { sunrise, sunset } = astro;

    return (
        <div className={`rounded-2xl shadow-lg mb-8 overflow-hidden ${theme.card}`}>
            <div className="p-6 max-[320px]:p-4 max-[280px]:p-3">
                <h2
                    className={`
            text-xl font-semibold mb-6 text-center ${theme.text}
            max-[320px]:text-lg max-[320px]:mb-4
            max-[280px]:text-base max-[280px]:mb-3
          `}
                >
                    Sunrise &amp; Sunset
                </h2>

                <div className="grid grid-cols-2 text-center gap-8 max-[320px]:gap-4 max-[280px]:gap-2">
                    {/* Sunrise */}
                    <div className="flex flex-col items-center">
                        <img
                            src={sunriseIcon}
                            alt="Sunrise"
                            className="
                w-14 h-14
                max-[320px]:w-[64px] max-[320px]:h-[64px]
                max-[280px]:w-[70px] max-[280px]:h-[70px]
                md:w-24 md:h-24 lg:w-28 lg:h-28
                object-contain weather-icon
              "
                        />
                        <p
                            className={`
                text-lg opacity-80 ${theme.text}
                mt-1
                max-[320px]:text-[14px]
                max-[280px]:text-[13px]
              `}
                        >
                            Sunrise
                        </p>
                        <p
                            className={`
                text-xl font-bold mt-1 ${theme.text}
                max-[320px]:text-[15px]
                max-[280px]:text-sm
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
                w-14 h-14
                max-[320px]:w-[64px] max-[320px]:h-[64px]
                max-[280px]:w-[70px] max-[280px]:h-[70px]
                md:w-24 md:h-24 lg:w-28 lg:h-28
                object-contain weather-icon
              "
                        />
                        <p
                            className={`
                text-lg opacity-80 ${theme.text}
                mt-1
                max-[320px]:text-[14px]
                max-[280px]:text-[13px]
              `}
                        >
                            Sunset
                        </p>
                        <p
                            className={`
                text-xl font-bold mt-1 ${theme.text}
                max-[320px]:text-[15px]
                max-[280px]:text-sm
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

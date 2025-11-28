// src/components/SunriseSunsetCard.jsx
import React from "react";
import sunriseIcon from "../assets/meteocons/sunrise.svg";
import sunsetIcon from "../assets/meteocons/sunset.svg";

export default function SunriseSunsetCard({ astro, theme }) {
    if (!astro) return null;

    const { sunrise, sunset } = astro;

    return (
        <div
            className={`
                rounded-2xl shadow-lg mb-8 overflow-hidden
                ${theme.card}
            `}
        >
            <div className="p-6">
                <h2 className={`text-xl font-semibold mb-6 ${theme.text} text-center`}>
                    Sunrise &amp; Sunset
                </h2>

                {/* --- FIXED LAYOUT: 2 columns like forecast --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">

                    {/* Sunrise */}
                    <div className="flex flex-col items-center">
                        <img
                            src={sunriseIcon}
                            alt="Sunrise"
                            className="w-10 h-10 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto object-contain"
                        />
                        <p className={`text-lg opacity-80 ${theme.text}`}>Sunrise</p>
                        <p className={`text-xl font-bold mt-1 ${theme.text}`}>
                            {sunrise}
                        </p>
                    </div>

                    {/* Sunset */}
                    <div className="flex flex-col items-center">
                        <img
                            src={sunsetIcon}
                            alt="Sunset"
                            className="w-10 h-10 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto object-contain"
                        />
                        <p className={`text-lg opacity-80 ${theme.text}`}>Sunset</p>
                        <p className={`text-xl font-bold mt-1 ${theme.text}`}>
                            {sunset}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

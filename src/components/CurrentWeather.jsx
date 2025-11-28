// src/components/CurrentWeather.jsx
import React, { useEffect, useState } from "react";
import WeatherIcon from "./WeatherIcon";


export default function CurrentWeather({
                                           weather,
                                           unit,
                                           onUnitChange,
                                           theme,
                                           prevTheme,
                                       }) {


    const [lastCity, setLastCity] = useState(null);
    const [relativeUpdated, setRelativeUpdated] = useState("");



    const loc = weather?.location ?? {};
    const w = weather?.current ?? {};

    const lastUpdated = w.last_updated ?? "";


    const formatRelativeTime = (lastUpdatedString) => {
        if (!lastUpdatedString) return "";

        const updatedDate = new Date(lastUpdatedString.replace(" ", "T"));
        const now = new Date();

        const diffMs = now - updatedDate;
        const diffMin = Math.floor(diffMs / 1000 / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHr / 24);

        if (diffMin < 1) return "just now";
        if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
        if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;

        if (diffDay === 1) {
            return `yesterday at ${updatedDate.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
            })}`;
        }

        return `${updatedDate.toLocaleDateString([], {
            month: "short",
            day: "numeric",
        })} at ${updatedDate.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        })}`;
    };


    useEffect(() => {
        if (!lastUpdated) return;

        setRelativeUpdated(formatRelativeTime(lastUpdated));

        const interval = setInterval(() => {
            setRelativeUpdated(formatRelativeTime(lastUpdated));
        }, 60000);

        return () => clearInterval(interval);
    }, [lastUpdated]);


    useEffect(() => {
        if (!weather?.location?.name || !weather?.location?.country) return;

        const city = weather.location.name;
        const country = weather.location.country.toLowerCase();

        // City changed → Set default unit once
        if (city !== lastCity) {
            setLastCity(city);

            const defaultUnit = country.includes("united states") ? "F" : "C";
            onUnitChange(defaultUnit);
        }

        // DO NOT auto-switch after this point
    }, [weather, lastCity, onUnitChange]);



    if (!weather) return null;



    const convertTemp = (c) =>
        unit === "C" ? Math.round(c) : Math.round((c * 9) / 5 + 32);

    const temp = convertTemp(w.temp_c);
    const feels = convertTemp(w.feelslike_c);

    const windSpeed = unit === "C"
        ? `${Math.round(w.wind_kph)} kph`
        : `${Math.round(w.wind_kph / 1.609)} mph`;

    const windLabel = `${windSpeed} • ${w.wind_degree}° ${w.wind_dir || ""}`.trim();

    const visibility = unit === "C"
        ? `${w.vis_km ?? "-"} km`
        : `${w.vis_miles ?? "-"} miles`;

    const pressure = `${w.pressure_mb} hPa / ${w.pressure_in} inHg`;
    const cloudCover = `${w.cloud}%`;

    const uv = w.uv;
    const getUvLabel = (v) =>
        v == null ? "-" :
            v < 3 ? "Low" :
                v < 6 ? "Moderate" :
                    v < 8 ? "High" :
                        v < 11 ? "Very High" :
                            "Extreme";

    const uvLabel = getUvLabel(uv);

    const aqiIndex = w.air_quality?.["us-epa-index"];
    const getAqiLabel = (x) =>
        ({
            1: "Good",
            2: "Moderate",
            3: "Unhealthy for Sensitive Groups",
            4: "Unhealthy",
            5: "Very Unhealthy",
            6: "Hazardous",
        }[x] ?? null);

    const aqiLabel = getAqiLabel(aqiIndex);

    const localTime = loc.localtime;
    const timezone = loc.tz_id;

    // Convert IANA timezone (America/New_York) -> EST/EDT
    const getTimezoneAbbrev = (tz, dateStr) => {
        try {
            const date = new Date(dateStr.replace(" ", "T"));
            const formatter = new Intl.DateTimeFormat("en-US", {
                timeZone: tz,
                timeZoneName: "short",
            });

            const parts = formatter.formatToParts(date);
            const tzPart = parts.find(p => p.type === "timeZoneName");
            return tzPart?.value || "";
        } catch {
            return "";
        }
    };

// Add ordinal suffix (1st, 2nd, 3rd, 4th...)
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return `${day}th`;
        const last = day % 10;
        return `${day}${last === 1 ? "st" : last === 2 ? "nd" : last === 3 ? "rd" : "th"}`;
    };


    const formatLocalTimeDisplay = (localTime, tz) => {
        if (!localTime || !tz) return "";

        const date = new Date(localTime.replace(" ", "T"));
        const abbrev = getTimezoneAbbrev(tz, localTime);

        const month = date.toLocaleString("en-US", { month: "long" });
        const day = getOrdinalSuffix(date.getDate());
        const year = date.getFullYear();

        const time = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });

        return `${month} ${day}, ${year} | ${time} ${abbrev}`;
    };


    return (
        <div className="relative rounded-2xl shadow-lg mb-8 overflow-hidden">

            {/* Previous theme for fade */}
            <div
                className={`absolute inset-0 ${prevTheme?.card || theme.card} transition-opacity duration-700`}
                style={{ opacity: 0 }}
            />

            {/* Current theme */}
            <div className={`relative z-10 ${theme.card} p-6 transition-colors duration-300`}>

                {/* Header */}
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <h2 className={`text-xl font-semibold ${theme.text}`}>
                            Current Weather
                        </h2>

                        {lastUpdated && (
                            <div className={`text-xs sm:text-sm flex items-center gap-2 ${theme.text}`}>

  <span className="opacity-80">
    Last updated: <span className="font-semibold">{relativeUpdated}</span>
  </span>

                                {/* Tooltip wrapper */}
                                <div className="relative inline-block group">

                                    {/* Icon */}
                                    <button className={`${theme.text} cursor-pointer`}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="17"
                                            height="17"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="opacity-80 group-hover:opacity-100 transition"
                                        >
                                            <circle cx="12" cy="12" r="10"/>
                                            <line x1="12" y1="8" x2="12" y2="12"/>
                                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                                        </svg>
                                    </button>

                                    {/* Tooltip */}
                                    <div
                                        className="
        absolute right-full left-1/2 -translate-x-1/2 mt-2
        w-74 sm:w-72
        bg-black text-white
        text-[11px] sm:text-xs leading-snug
        px-3 py-2 rounded-lg shadow-lg
        whitespace-normal
        opacity-0 group-hover:opacity-100
        pointer-events-none
        transition-opacity duration-500 ease-out
        z-50
      "
                                    >
                                        WeatherAPI data refreshes every <span className='font-semibold'>30–60 minutes</span>,
                                        depending on the area. So the timestamp may show <span className='italic'>“X
                                        minutes ago”</span> or <span className='italic'>“X hours ago”</span> instead
                                        of live data.
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>

                    {/* Unit toggle */}
                    <button
                        onClick={() => onUnitChange(unit === "F" ? "C" : "F")}
                        className="
                            px-3 py-1 rounded-full text-sm font-semibold
                            bg-slate-300 dark:bg-slate-700
                            text-slate-800 dark:text-slate-200
                            hover:bg-slate-400 dark:hover:bg-slate-600
                            transition
                        "
                    >
                        {unit === "F" ? "Convert to °C" : "Convert to °F"}
                    </button>
                </div>

                {/* Main layout */}
                <div className="flex flex-wrap mt-6 items-start justify-between gap-12">

                    {/* LEFT */}
                    <div>
                        <h3 className={`text-3xl font-semibold ${theme.text}`}>
                            {loc.name}
                        </h3>

                        <p className={`text-md opacity-80 ${theme.text}`}>
                            {loc.region && `${loc.region}, `}{loc.country}
                        </p>

                        {localTime && timezone && (
                            <p className={`text-xs mt-1 opacity-75 ${theme.text}`}>
                                Local time:{" "}
                                <span className="font-medium">
            {formatLocalTimeDisplay(localTime, timezone)}
        </span>
                            </p>
                        )}

                        <div className="flex items-center mt-4">
                            <WeatherIcon code={w.condition.code} isDay={w.is_day === 1} />
                            <span className={`text-7xl font-light ml-3 leading-none ${theme.text}`}>
                                {temp}
                                <span className="text-4xl">{`°${unit}`}</span>
                            </span>
                        </div>

                        <h4 className={`text-2xl mt-2 capitalize ${theme.text}`}>
                            {w.condition.text}
                        </h4>
                    </div>

                    {/* RIGHT */}
                    <div className={`grid grid-cols-[auto,1fr] gap-y-3 gap-x-6 w-full md:w-auto text-md ${theme.text}`}>

                        <span className="opacity-70">Feels like:</span>
                        <span className="font-semibold text-right whitespace-nowrap">{feels}°{unit}</span>

                        <span className="opacity-70">Humidity:</span>
                        <span className="font-semibold text-right whitespace-nowrap">{w.humidity}%</span>

                        <span className="opacity-70">Wind:</span>
                        <span className="font-semibold text-right whitespace-nowrap">{windLabel}</span>

                        <span className="opacity-70">Visibility:</span>
                        <span className="font-semibold text-right whitespace-nowrap">{visibility}</span>

                        <span className="opacity-70">Pressure:</span>
                        <span className="font-semibold text-right whitespace-nowrap">{pressure}</span>

                        <span className="opacity-70">Cloud cover:</span>
                        <span className="font-semibold text-right whitespace-nowrap">{cloudCover}</span>

                        <span className="opacity-70">UV Index:</span>
                        <span className="font-semibold text-right whitespace-nowrap">
                            {uv != null ? uv : "-"}
                            {uvLabel && <span className="text-xs ml-1 opacity-80">({uvLabel})</span>}
                        </span>

                        {aqiLabel && (
                            <>
                                <span className="opacity-70">Air Quality:</span>
                                <span className="font-semibold text-right whitespace-nowrap">
                                    AQI {aqiIndex}
                                    <span className="text-xs ml-1 opacity-80">({aqiLabel})</span>
                                </span>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

// src/components/CurrentWeather.jsx
import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
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

    // Tooltip (portal) state: keep mounted while fading out
    const TIP_ANIM_MS = 150;
    const [showDataTip, setShowDataTip] = useState(false); // mounted/unmounted
    const [tipAnim, setTipAnim] = useState("idle"); // "in" | "out" | "idle"
    const tipTimerRef = useRef(null);

    const loc = weather?.location ?? {};
    const w = weather?.current ?? {};
    const lastUpdated = w.last_updated ?? "";

    // ✅ Tooltip portal positioning
    const iconBtnRef = useRef(null);
    const [tipPos, setTipPos] = useState({
        top: 0,
        left: 0,
        width: 0,
        arrowLeft: 0,
    });

    const formatRelativeTime = (lastUpdatedString) => {
        if (!lastUpdatedString) return "";

        const updatedDate = new Date(lastUpdatedString.replace(" ", "T"));
        const now = new Date();

        const diffMs = now - updatedDate;
        const diffMin = Math.floor(diffMs / 1000 / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHr / 24);

        if (diffMin < 1) return "just now";
        if (diffMin < 60)
            return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
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

        if (city !== lastCity) {
            setLastCity(city);
            const defaultUnit = country.includes("united states") ? "F" : "C";
            onUnitChange(defaultUnit);
        }
    }, [weather, lastCity, onUnitChange]);

    // ✅ Compute tooltip position (always opens DOWN)
    const computeTipPos = () => {
        const el = iconBtnRef.current;
        if (!el) return;

        const r = el.getBoundingClientRect();

        // tooltip width clamped to viewport
        const desiredWidth = Math.min(320, window.innerWidth - 16); // 8px padding each side
        let left = r.left + r.width / 2 - desiredWidth / 2;

        // clamp within viewport
        const minLeft = 8;
        const maxLeft = window.innerWidth - desiredWidth - 8;
        left = Math.max(minLeft, Math.min(left, maxLeft));

        const top = r.bottom + 8; // 8px below icon

        // arrow position inside tooltip (clamped so it doesn't go outside bubble)
        const iconCenterX = r.left + r.width / 2;
        let arrowLeft = iconCenterX - left;
        const ARROW_HALF = 6; // half of w-3 (12px)
        arrowLeft = Math.max(ARROW_HALF + 2, Math.min(arrowLeft, desiredWidth - (ARROW_HALF + 2)));

        setTipPos({ top, left, width: desiredWidth, arrowLeft });
    };

    const openTip = () => {
        if (tipTimerRef.current) {
            window.clearTimeout(tipTimerRef.current);
            tipTimerRef.current = null;
        }
        setShowDataTip(true);

        requestAnimationFrame(() => {
            computeTipPos();
            setTipAnim("in");
        });
    };

    const closeTip = () => {
        setTipAnim("out");
        if (tipTimerRef.current) window.clearTimeout(tipTimerRef.current);

        tipTimerRef.current = window.setTimeout(() => {
            setShowDataTip(false);
            setTipAnim("idle");
            tipTimerRef.current = null;
        }, TIP_ANIM_MS);
    };

    const toggleTip = () => {
        // If it's fading out and user taps again, reopen immediately
        if (!showDataTip || tipAnim === "out") openTip();
        else closeTip();
    };

    // ✅ Close on outside click/tap + resize — ONLY when open
    // 🚫 Do NOT close on scroll (requested)
    // ✅ Close on outside click/tap + scroll + resize — ONLY when open
    useEffect(() => {
        if (!showDataTip) return;

        computeTipPos();

        const onDocPointerDown = (e) => {
            // if tapping the icon itself, let its handler toggle
            if (iconBtnRef.current && iconBtnRef.current.contains(e.target)) return;

            closeTip(); // fade out
        };

        const onResize = () => closeTip();

        // ✅ Throttled scroll close (fade out) to avoid rendering jitter
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                closeTip();
                ticking = false;
            });
        };

        document.addEventListener("pointerdown", onDocPointerDown, { passive: true });
        window.addEventListener("resize", onResize);

        // capture: true catches scroll from nested containers too
        window.addEventListener("scroll", onScroll, { passive: true, capture: true });

        return () => {
            document.removeEventListener("pointerdown", onDocPointerDown);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", onScroll, { capture: true });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showDataTip]);


    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (tipTimerRef.current) {
                window.clearTimeout(tipTimerRef.current);
                tipTimerRef.current = null;
            }
        };
    }, []);

    if (!weather) return null;

    const pressure = `${w.pressure_mb} hPa / ${w.pressure_in} inHg`;
    const cloudCover = `${w.cloud}%`;

    const uv = w.uv;
    const getUvLabel = (v) =>
        v == null
            ? "-"
            : v < 3
                ? "Low"
                : v < 6
                    ? "Moderate"
                    : v < 8
                        ? "High"
                        : v < 11
                            ? "Very High"
                            : "Extreme";

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

    const getTimezoneAbbrev = (tz, dateStr) => {
        try {
            const date = new Date(dateStr.replace(" ", "T"));
            const formatter = new Intl.DateTimeFormat("en-US", {
                timeZone: tz,
                timeZoneName: "short",
            });

            const parts = formatter.formatToParts(date);
            const tzPart = parts.find((p) => p.type === "timeZoneName");
            return tzPart?.value || "";
        } catch {
            return "";
        }
    };

    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return `${day}th`;
        const last = day % 10;
        return `${day}${
            last === 1 ? "st" : last === 2 ? "nd" : last === 3 ? "rd" : "th"
        }`;
    };

    const formatLocalTimeDisplay = (localTimeStr, tz) => {
        if (!localTimeStr || !tz) return "";

        const date = new Date(localTimeStr.replace(" ", "T"));
        const abbrev = getTimezoneAbbrev(tz, localTimeStr);

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
                className={`absolute inset-0 ${
                    prevTheme?.card || theme.card
                } transition-opacity duration-700`}
                style={{ opacity: 0 }}
            />

            {/* Current theme */}
            <div
                className={`relative z-10 ${theme.card} p-6 max-[280px]:p-3 transition-colors duration-300`}
            >
                {/* Header */}
                <div className="flex justify-between items-center gap-4 max-[280px]:flex-col max-[280px]:items-center max-[280px]:gap-2">
                    <div>
                        <h2
                            className={`text-xl font-semibold ${theme.text} max-[280px]:text-base max-[280px]:text-center`}
                        >
                            Current Weather
                        </h2>

                        {lastUpdated && (
                            <div
                                className={`text-xs sm:text-sm flex items-center gap-2 ${theme.text} max-[280px]:justify-center max-[280px]:text-[11px]`}
                            >
                <span className="opacity-80">
                  Last updated:{" "}
                    <span className="font-semibold">{relativeUpdated}</span>
                </span>

                                {/* ✅ Info icon (ONLY this toggles tooltip) */}
                                <div className="relative inline-flex items-center">
                                    <button
                                        ref={iconBtnRef}
                                        type="button"
                                        onPointerDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleTip();
                                        }}
                                        className="
                      w-6 h-6 inline-flex items-center justify-center
                      rounded-full
                      opacity-80 hover:opacity-100
                      focus:outline-none focus:ring-2 focus:ring-white/30
                      transition
                    "
                                        aria-label="About update frequency"
                                        aria-expanded={showDataTip}
                                    >
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
                                            className="block"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                    </button>

                                    {/* ✅ PORTAL TOOLTIP: not clipped by overflow-hidden */}
                                    {showDataTip &&
                                        createPortal(
                                            <div
                                                style={{
                                                    position: "fixed",
                                                    top: tipPos.top,
                                                    left: tipPos.left,
                                                    width: tipPos.width,
                                                }}
                                                className={`
                          z-[9999]
                          bg-black text-white
                          rounded-lg shadow-lg
                          leading-snug whitespace-normal
                          px-3 py-2
                          text-[11px] sm:text-xs
                          max-[280px]:text-[10px]
                          tooltip-bubble
                          ${tipAnim === "in" ? "tooltip-show" : ""}
                          ${tipAnim === "out" ? "tooltip-hide" : ""}
                        `}
                                                role="tooltip"
                                            >
                                                {/* arrow */}
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: -6,
                                                        left: tipPos.arrowLeft,
                                                        transform: "translateX(-50%) rotate(45deg)",
                                                    }}
                                                    className="w-3 h-3 bg-black tooltip-arrow"
                                                />

                                                WeatherAPI data refreshes every{" "}
                                                <span className="font-semibold">30–60 minutes</span>,
                                                depending on the area. So the timestamp may show{" "}
                                                <span className="italic">“X minutes ago”</span> or{" "}
                                                <span className="italic">“X hours ago”</span> instead of
                                                live data.
                                            </div>,
                                            document.body
                                        )}
                                </div>
                            </div>
                        )}

                        {/* Convert button BELOW on <=280 */}
                        <div className="hidden max-[280px]:flex max-[280px]:justify-center max-[280px]:mt-2">
                            <button
                                onClick={() => onUnitChange(unit === "F" ? "C" : "F")}
                                className="
                  px-3 py-1 rounded-full text-xs font-semibold
                  bg-slate-300 dark:bg-slate-700
                  text-slate-800 dark:text-slate-200
                  hover:bg-slate-400 dark:hover:bg-slate-600
                  transition
                "
                            >
                                {unit === "F" ? "Convert to °C" : "Convert to °F"}
                            </button>
                        </div>
                    </div>

                    {/* Convert button right on >280 */}
                    <button
                        onClick={() => onUnitChange(unit === "F" ? "C" : "F")}
                        className="
              px-3 py-1 rounded-full text-sm font-semibold
              bg-slate-300 dark:bg-slate-700
              text-slate-800 dark:text-slate-200
              hover:bg-slate-400 dark:hover:bg-slate-600
              transition
              max-[280px]:hidden
            "
                    >
                        {unit === "F" ? "Convert to °C" : "Convert to °F"}
                    </button>
                </div>

                {/* Main layout */}
                <div className="flex flex-wrap mt-6 items-start justify-between gap-12 max-[280px]:mt-4 max-[280px]:gap-4 max-[280px]:flex-col max-[280px]:items-center">
                    {/* LEFT */}
                    <div className={`${theme.text} max-[280px]:text-center max-[280px]:w-full`}>
                        <h3 className="text-3xl font-semibold max-[280px]:text-[22px]">
                            {loc.name}
                        </h3>

                        <p className="text-md opacity-80 max-[280px]:text-xs">
                            {loc.region && `${loc.region}, `}
                            {loc.country}
                        </p>

                        {localTime && timezone && (
                            <p className="text-xs mt-1 opacity-75 max-[280px]:text-[11px] max-[280px]:mt-2.5">
                                <span className="block">Local date and time:</span>
                                <span className="block font-medium">
                  {formatLocalTimeDisplay(localTime, timezone)}
                </span>
                            </p>
                        )}

                        <div className="flex items-center mt-4 h-[84px] sm:h-[100px] max-[280px]:mt-3 max-[280px]:h-[56px] max-[280px]:justify-center">
                            <div className="w-[84px] sm:w-[100px] flex justify-center items-center max-[280px]:w-[56px]">
                                <WeatherIcon code={w.condition.code} isDay={w.is_day === 1} />
                            </div>

                            <div className="ml-3 temp-align min-w-[9ch]">
                                <div className="fade-stack tabular-nums">
                  <span className={`fade-text ${unit === "F" ? "visible" : ""}`}>
                    <span className="text-7xl font-light leading-none inline-flex items-baseline max-[280px]:text-5xl">
                      {Math.round(w.temp_f)}
                        <span className="text-4xl ml-1 temp-unit max-[280px]:text-2xl">
                        °F
                      </span>
                    </span>
                  </span>

                                    <span className={`fade-text ${unit === "C" ? "visible" : ""}`}>
                    <span className="text-7xl font-light leading-none inline-flex items-baseline max-[280px]:text-5xl">
                      {Math.round(w.temp_c)}
                        <span className="text-4xl ml-1 temp-unit max-[280px]:text-2xl">
                        °C
                      </span>
                    </span>
                  </span>
                                </div>
                            </div>
                        </div>

                        <h4 className="text-2xl mt-2 capitalize max-[280px]:text-base max-[280px]:mt-1">
                            {w.condition.text}
                        </h4>
                    </div>

                    {/* RIGHT */}
                    <div
                        className={`
              grid items-center leading-4
              grid-cols-[auto,minmax(120px,1fr)]
              sm:grid-cols-[auto,minmax(200px,1fr)]
              gap-y-5 gap-x-6
              w-full md:w-auto text-sm sm:text-md ${theme.text}

              max-[280px]:grid-cols-[auto,1fr]
              max-[280px]:gap-y-3 max-[280px]:gap-x-3
              max-[280px]:text-xs
            `}
                    >
                        <span className="opacity-70 max-[280px]:text-[11px]">Feels like:</span>
                        <div className="fade-stack stats right tabular-nums font-semibold text-right whitespace-nowrap justify-self-end">
              <span className={`fade-text ${unit === "F" ? "visible" : ""} max-[280px]:text-[11px]`}>
                {Math.round(w.feelslike_f)}
                  <span className="stat-unit">°F</span>
              </span>

                            <span className={`fade-text ${unit === "C" ? "visible" : ""} max-[280px]:text-[11px]`}>
                {Math.round(w.feelslike_c)}
                                <span className="stat-unit">°C</span>
              </span>
                        </div>

                        <span className="opacity-70 max-[280px]:text-[11px]">Humidity:</span>
                        <span className="font-semibold whitespace-nowrap justify-self-end text-right max-[280px]:text-[11px]">
              {w.humidity}%
            </span>

                        <span className="opacity-70 max-[280px]:text-[11px]">Wind:</span>
                        <div className="fade-stack stats right tabular-nums font-semibold text-right justify-self-end whitespace-nowrap">
              <span className={`fade-text ${unit === "F" ? "visible" : ""} max-[280px]:text-[11px]`}>
                {`${Math.round(w.wind_mph)} mph • ${w.wind_degree}° ${w.wind_dir || ""}`}
              </span>

                            <span className={`fade-text ${unit === "C" ? "visible" : ""} max-[280px]:text-[11px]`}>
                {`${Math.round(w.wind_kph)} kph • ${w.wind_degree}° ${w.wind_dir || ""}`}
              </span>
                        </div>

                        <span className="opacity-70 max-[280px]:text-[11px]">Visibility:</span>
                        <div className="fade-stack stats right tabular-nums font-semibold text-right justify-self-end whitespace-nowrap">
              <span className={`fade-text ${unit === "F" ? "visible" : ""} max-[280px]:text-[11px]`}>
  {(() => {
      const v = w.vis_miles;
      if (v == null) return "-";
      const n = Number(v);
      const label = n === 1 ? "mile" : "miles";
      return `${v} ${label}`;
  })()}
</span>


                            <span className={`fade-text ${unit === "C" ? "visible" : ""} max-[280px]:text-[11px]`}>
                {`${w.vis_km ?? "-"} km`}
              </span>
                        </div>

                        <span className="opacity-70 max-[280px]:text-[11px]">Pressure:</span>
                        <span className="font-semibold whitespace-nowrap justify-self-end text-right max-[280px]:text-[11px]">
              {pressure}
            </span>

                        <span className="opacity-70 max-[280px]:text-[11px]">Cloud cover:</span>
                        <span className="font-semibold whitespace-nowrap justify-self-end text-right">
              {cloudCover}
            </span>

                        <span className="opacity-70 max-[280px]:text-[11px]">UV Index:</span>
                        <span className="font-semibold whitespace-nowrap justify-self-end text-right max-[280px]:text-[11px]">
              {uv != null ? uv : "-"}
                            {uvLabel && (
                                <span className="text-xs ml-1 opacity-80 max-[280px]:text-[11px]">
                  ({uvLabel})
                </span>
                            )}
            </span>

                        {aqiLabel && (
                            <>
                                <span className="opacity-70 max-[280px]:text-[11px]">Air Quality:</span>
                                <span className="font-semibold whitespace-nowrap justify-self-end text-right">
                  AQI {aqiIndex}
                                    <span className="text-xs ml-1 opacity-80 max-[280px]:text-[11px]">
                    ({aqiLabel})
                  </span>
                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

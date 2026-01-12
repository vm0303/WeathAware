// src/components/Search.jsx
import React, { useState, useEffect, useRef } from "react";
import { searchCities } from "../utils/weatherAPI";
import { useClickOutside } from "../hooks/clickOutside";
import Suggestion from "./Suggestions";
import searchGlass from "../assets/searchGlass.svg";
import location_Globe from "../assets/locationGlobe.svg";
import { toast } from "react-toastify";

export default function Search({
                                   onSelectCity,
                                   recentSearches = [],
                                   onClearRecentSearches = () => {},
                                   onActiveChange = () => {}, // ✅ NEW: lets Home move bar up/down
                               }) {
    const [term, setTerm] = useState("");
    const [results, setResults] = useState([]);

    const [showBox, setShowBox] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const [isFocused, setIsFocused] = useState(false);
    const [mode, setMode] = useState("recents"); // "recents" | "suggestions"

    // ✅ geo loading state
    const [geoLoading, setGeoLoading] = useState(false);
    const geoToastIdRef = useRef(null);

    const containerRef = useRef(null);
    const inputRef = useRef(null);

    // Track most recent fetch to avoid stale results
    const fetchIdRef = useRef(0);
    const debounceRef = useRef(null);

    // ✅ NEW: delay dropdown open on focus (mobile keyboard animation)
    const focusOpenTimerRef = useRef(null);

    // ---------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------
    const openBox = () => {
        setIsClosing(false);
        setShowBox(true);
    };

    const fadeOutAndCloseBox = () => {
        if (!showBox) return;
        setIsClosing(true);
        setTimeout(() => {
            setShowBox(false);
            setIsClosing(false);
        }, 350);
    };

    const fadeSwapMode = (nextMode, nextResults = null) => {
        if (!showBox) {
            if (nextResults) setResults(nextResults);
            setMode(nextMode);
            openBox();
            return;
        }

        setIsClosing(true);
        setTimeout(() => {
            if (nextResults) setResults(nextResults);
            setMode(nextMode);
            setIsClosing(false);
            setShowBox(true);
        }, 350);
    };

    // ✅ NEW: force keyboard close (Samsung Internet + mobile browsers)
    const closeKeyboard = () => {
        inputRef.current?.blur?.();

        // extra safety: sometimes blur doesn't take on first call
        requestAnimationFrame(() => {
            if (document.activeElement === inputRef.current) {
                inputRef.current?.blur?.();
            }
        });
    };

    // click outside closes everything
    useClickOutside(containerRef, () => {
        if (focusOpenTimerRef.current) clearTimeout(focusOpenTimerRef.current);
        fadeOutAndCloseBox();
        setIsFocused(false);
        onActiveChange(false);
        closeKeyboard();
    });

    // cleanup
    useEffect(() => {
        return () => {
            if (focusOpenTimerRef.current) clearTimeout(focusOpenTimerRef.current);
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    // =========================================================
    // 1) Handle typing with DEBOUNCE + CANCEL stale fetch
    // =========================================================
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        // ---------- CASE: term length < 2 ----------
        if (term.length < 2) {
            if (term.length === 1) {
                if (mode === "suggestions" && showBox) fadeOutAndCloseBox();
                return;
            }

            setResults([]);

            if (term === "" && isFocused) {
                // if focused + empty, show recents (but do NOT force-open if user hasn't focused)
                if (!showBox) {
                    setMode("recents");
                    // don't open here; focus handler controls opening with delay
                    return;
                }
                if (mode === "suggestions") {
                    fadeSwapMode("recents");
                    return;
                }
                return;
            }

            fadeOutAndCloseBox();
            return;
        }

        // ---------- CASE: term length >= 2 ----------
        if (!isFocused) {
            fadeOutAndCloseBox();
            return;
        }

        debounceRef.current = setTimeout(async () => {
            const currentFetchId = ++fetchIdRef.current;

            try {
                const cities = await searchCities(term);
                if (currentFetchId !== fetchIdRef.current) return;

                if (!cities || cities.length === 0) {
                    setResults([]);
                    fadeOutAndCloseBox();
                    return;
                }

                const newResults = cities.slice(0, 6);
                fadeSwapMode("suggestions", newResults);
            } catch {
                if (currentFetchId !== fetchIdRef.current) return;
                setResults([]);
                fadeOutAndCloseBox();
            }
        }, 300);

        return () => clearTimeout(debounceRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term, isFocused]);

    // =========================================================
    // 2) Geo (improved)
    // =========================================================
    const GEO_OPTIONS_FAST = {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 10 * 60 * 1000,
    };

    const GEO_OPTIONS_ACCURATE = {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
    };

    const clearGeoToast = () => {
        if (geoToastIdRef.current) {
            toast.dismiss(geoToastIdRef.current);
            geoToastIdRef.current = null;
        }
    };

    const handleGeo = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation not supported.");
            return;
        }
        if (geoLoading) return;

        setGeoLoading(true);
        geoToastIdRef.current = toast.info("Getting your location…", {
            autoClose: false,
            closeOnClick: false,
            draggable: false,
        });

        console.time("geo");

        const onSuccess = (pos) => {
            console.timeEnd("geo");
            clearGeoToast();
            setGeoLoading(false);

            // ✅ close keyboard + dropdown BEFORE loading starts
            closeKeyboard();
            onActiveChange(false);
            fadeOutAndCloseBox();

            const q = `${pos.coords.latitude},${pos.coords.longitude}`;
            onSelectCity(q);
        };

        const onError = (err) => {
            console.timeEnd("geo");

            // Fast attempt failed -> try accurate fallback
            if (!err || err.code === 3 || err.code === 2) {
                navigator.geolocation.getCurrentPosition(
                    onSuccess,
                    (err2) => {
                        clearGeoToast();
                        setGeoLoading(false);

                        const code = err2?.code;
                        toast.error(
                            code === 1
                                ? "Location permission denied."
                                : code === 2
                                    ? "Location unavailable. Try again."
                                    : "Location timed out. Try again."
                        );
                        console.error("geo error", err2);
                    },
                    GEO_OPTIONS_ACCURATE
                );
                return;
            }

            clearGeoToast();
            setGeoLoading(false);

            toast.error(
                err.code === 1
                    ? "Location permission denied."
                    : err.code === 2
                        ? "Location unavailable. Try again."
                        : "Location timed out. Try again."
            );
            console.error("geo error", err);
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError, GEO_OPTIONS_FAST);
    };

    // =========================================================
    // 3) Search icon click
    // =========================================================
    const handleSearchClick = () => {
        closeKeyboard();
        onActiveChange(false);
        fadeOutAndCloseBox();
        onSelectCity(term);
    };

    // =========================================================
    // 4) Focus & blur (with delay on dropdown open)
    // =========================================================
    const handleFocus = () => {
        setIsFocused(true);
        onActiveChange(true);

        // ✅ delay dropdown open so keyboard animation settles on mobile
        if (focusOpenTimerRef.current) clearTimeout(focusOpenTimerRef.current);

        focusOpenTimerRef.current = setTimeout(() => {
            // only open if still focused
            if (!inputRef.current) return;
            if (document.activeElement !== inputRef.current) return;

            if (!term) {
                setMode("recents");
                openBox();
            }
        }, 200);
    };

    const handleBlur = () => {
        setIsFocused(false);

        // cancel delayed open
        if (focusOpenTimerRef.current) clearTimeout(focusOpenTimerRef.current);
    };

    // =========================================================
    // 5) Select from suggestions or recents
    // =========================================================
    const handleSelectCoordinates = (city) => {
        closeKeyboard();
        onActiveChange(false);
        fadeOutAndCloseBox();
        onSelectCity(`${city.lat},${city.lon}`);
    };

    return (
        <div
            ref={containerRef}
            className="
        relative
        bg-white/90 dark:bg-slate-800/60
        dark:border dark:border-white/10
        shadow-lg
        rounded-full
        h-14 flex items-center px-4 mb-8

        /* 413–432 (mimic 360) */
        min-[413px]:max-[432px]:h-12
        min-[413px]:max-[432px]:px-4
        min-[413px]:max-[432px]:mb-7

        /* 401–412 (mimic 360) */
        min-[401px]:max-[412px]:h-12
        min-[401px]:max-[412px]:px-4
        min-[401px]:max-[412px]:mb-7

        /* 391–400 (mimic 360) */
        min-[391px]:max-[400px]:h-12
        min-[391px]:max-[400px]:px-4
        min-[391px]:max-[400px]:mb-7

        /* 385–390 (mimic 360) */
        min-[385px]:max-[390px]:h-12
        min-[385px]:max-[390px]:px-4
        min-[385px]:max-[390px]:mb-7

        /* 377–384 (mimic 360) */
        min-[377px]:max-[384px]:h-12
        min-[377px]:max-[384px]:px-4
        min-[377px]:max-[384px]:mb-7

        /* 361–376 (mimic 360) */
        min-[361px]:max-[376px]:h-12
        min-[361px]:max-[376px]:px-4
        min-[361px]:max-[376px]:mb-7

        /* 347–360 */
        min-[347px]:max-[360px]:h-12
        min-[347px]:max-[360px]:px-4
        min-[347px]:max-[360px]:mb-7

        /* 321–346 */
        min-[321px]:max-[346px]:h-12
        min-[321px]:max-[346px]:px-4
        min-[321px]:max-[346px]:mb-7

        /* 281–320 (LESS padding, BIGGER text) */
        min-[281px]:max-[320px]:h-12
        min-[281px]:max-[320px]:px-3
        min-[281px]:max-[320px]:mb-7

        /* 240–280 */
        min-[240px]:max-[280px]:h-12
        min-[240px]:max-[280px]:px-3
        min-[240px]:max-[280px]:mb-6
      "
        >
            <button
                onClick={handleSearchClick}
                className="flex items-center justify-center shrink-0 rounded-full"
                aria-label="Search"
            >
                <img
                    src={searchGlass}
                    alt="Search"
                    className="
            w-7 h-7 object-contain opacity-70 dark:opacity-90 dark:invert dark:brightness-200

            /* 413–432 (mimic 360) */
            min-[413px]:max-[432px]:w-6
            min-[413px]:max-[432px]:h-6

            /* 401–412 (mimic 360) */
            min-[401px]:max-[412px]:w-6
            min-[401px]:max-[412px]:h-6

            /* 391–400 (mimic 360) */
            min-[391px]:max-[400px]:w-6
            min-[391px]:max-[400px]:h-6

            /* 385–390 (mimic 360) */
            min-[385px]:max-[390px]:w-6
            min-[385px]:max-[390px]:h-6

            /* 377–384 (mimic 360) */
            min-[377px]:max-[384px]:w-6
            min-[377px]:max-[384px]:h-6

            /* 361–376 (mimic 360) */
            min-[361px]:max-[376px]:w-6
            min-[361px]:max-[376px]:h-6

            /* 347–360 */
            min-[347px]:max-[360px]:w-6
            min-[347px]:max-[360px]:h-6

            /* 321–346 */
            min-[321px]:max-[346px]:w-6
            min-[321px]:max-[346px]:h-6

            /* 281–320 */
            min-[281px]:max-[320px]:w-6
            min-[281px]:max-[320px]:h-6

            /* 240–280 */
            min-[240px]:max-[280px]:w-6
            min-[240px]:max-[280px]:h-6
          "
                />
            </button>

            <input
                ref={inputRef}
                type="text"
                className="
          flex-1 bg-transparent border-none focus:outline-none
          ml-3 text-lg
          text-slate-800 dark:text-slate-200
          placeholder-slate-700 dark:placeholder-slate-200
          min-w-0

          /* 413–432 (mimic 360) */
          min-[413px]:max-[432px]:ml-3
          min-[413px]:max-[432px]:text-base

          /* 401–412 (mimic 360) */
          min-[401px]:max-[412px]:ml-3
          min-[401px]:max-[412px]:text-base

          /* 391–400 (mimic 360) */
          min-[391px]:max-[400px]:ml-3
          min-[391px]:max-[400px]:text-base

          /* 385–390 (mimic 360) */
          min-[385px]:max-[390px]:ml-3
          min-[385px]:max-[390px]:text-base

          /* 377–384 (mimic 360) */
          min-[377px]:max-[384px]:ml-3
          min-[377px]:max-[384px]:text-base

          /* 361–376 (mimic 360) */
          min-[361px]:max-[376px]:ml-3
          min-[361px]:max-[376px]:text-base

          /* 347–360 */
          min-[347px]:max-[360px]:ml-3
          min-[347px]:max-[360px]:text-base

          /* 321–346 */
          min-[321px]:max-[346px]:ml-3
          min-[321px]:max-[346px]:text-base

          /* 281–320 (BIGGER than before) */
          min-[281px]:max-[320px]:ml-3
          min-[281px]:max-[320px]:text-base

          /* 240–280 */
          min-[240px]:max-[280px]:ml-3
          min-[240px]:max-[280px]:text-sm
        "
                placeholder="Search for a location"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            <button
                onClick={handleGeo}
                disabled={geoLoading}
                className="
          ml-3 flex items-center justify-center
          w-8 h-8 rounded-full
          transition duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          shrink-0

          /* 413–432 (mimic 360) */
          min-[413px]:max-[432px]:w-8
          min-[413px]:max-[432px]:h-8
          min-[413px]:max-[432px]:ml-3

          /* 401–412 (mimic 360) */
          min-[401px]:max-[412px]:w-8
          min-[401px]:max-[412px]:h-8
          min-[401px]:max-[412px]:ml-3

          /* 391–400 (mimic 360) */
          min-[391px]:max-[400px]:w-8
          min-[391px]:max-[400px]:h-8
          min-[391px]:max-[400px]:ml-3

          /* 385–390 (mimic 360) */
          min-[385px]:max-[390px]:w-8
          min-[385px]:max-[390px]:h-8
          min-[385px]:max-[390px]:ml-3

          /* 377–384 (mimic 360) */
          min-[377px]:max-[384px]:w-8
          min-[377px]:max-[384px]:h-8
          min-[377px]:max-[384px]:ml-3

          /* 361–376 (mimic 360) */
          min-[361px]:max-[376px]:w-8
          min-[361px]:max-[376px]:h-8
          min-[361px]:max-[376px]:ml-3

          /* 347–360 */
          min-[347px]:max-[360px]:w-8
          min-[347px]:max-[360px]:h-8
          min-[347px]:max-[360px]:ml-3

          /* 321–346 */
          min-[321px]:max-[346px]:w-8
          min-[321px]:max-[346px]:h-8
          min-[321px]:max-[346px]:ml-3

          /* 281–320 */
          min-[281px]:max-[320px]:w-8
          min-[281px]:max-[320px]:h-8
          min-[281px]:max-[320px]:ml-3

          /* 240–280 */
          min-[240px]:max-[280px]:w-8
          min-[240px]:max-[280px]:h-8
          min-[240px]:max-[280px]:ml-3
        "
                title={geoLoading ? "Getting your location…" : "Use my location"}
                aria-label={geoLoading ? "Getting your location…" : "Use my location"}
            >
                <img
                    src={location_Globe}
                    alt="Use my location"
                    className={`
            w-7 h-7 object-contain dark:invert dark:brightness-200
            ${geoLoading ? "opacity-60" : ""}

            /* 413–432 (mimic 360) */
            min-[413px]:max-[432px]:w-6 min-[413px]:max-[432px]:h-6

            /* 401–412 (mimic 360) */
            min-[401px]:max-[412px]:w-6 min-[401px]:max-[412px]:h-6

            /* 391–400 (mimic 360) */
            min-[391px]:max-[400px]:w-6 min-[391px]:max-[400px]:h-6

            /* 385–390 (mimic 360) */
            min-[385px]:max-[390px]:w-6 min-[385px]:max-[390px]:h-6

            /* 377–384 (mimic 360) */
            min-[377px]:max-[384px]:w-6 min-[377px]:max-[384px]:h-6

            /* 361–376 (mimic 360) */
            min-[361px]:max-[376px]:w-6 min-[361px]:max-[376px]:h-6

            /* 347–360 */
            min-[347px]:max-[360px]:w-6 min-[347px]:max-[360px]:h-6

            /* 321–346 */
            min-[321px]:max-[346px]:w-6 min-[321px]:max-[346px]:h-6

            /* 281–320 */
            min-[281px]:max-[320px]:w-6 min-[281px]:max-[320px]:h-6

            /* 240–280 */
            min-[240px]:max-[280px]:w-6 min-[240px]:max-[280px]:h-6
          `}
                />
            </button>

            {showBox && (
                <div
                    className={`
            absolute left-0 w-full
            bg-white dark:bg-slate-900
            shadow-lg overflow-hidden z-20
            max-h-[40vh] overflow-y-auto
            suggestions-box
            ${isClosing ? "hide" : "show"}
            

            top-16 rounded-lg

            /* 413–432 (mimic 360) */
            min-[413px]:max-[432px]:top-14

            /* 401–412 (mimic 360) */
            min-[401px]:max-[412px]:top-14

            /* 391–400 (mimic 360) */
            min-[391px]:max-[400px]:top-14

            /* 385–390 (mimic 360) */
            min-[385px]:max-[390px]:top-14

            /* 377–384 (mimic 360) */
            min-[377px]:max-[384px]:top-14

            /* 361–376 (mimic 360) */
            min-[361px]:max-[376px]:top-14

            /* 347–360 */
            min-[347px]:max-[360px]:top-14

            /* 321–346 */
            min-[321px]:max-[346px]:top-14

            /* 281–320 */
            min-[281px]:max-[320px]:top-14

            /* 240–280 */
            min-[240px]:max-[280px]:top-14
          `}
                >
                    {mode === "recents" && (
                        <>
                            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 min-[240px]:max-[280px]:text-[11px]">
                Recent searches
              </span>

                                <button
                                    type="button"
                                    onPointerDown={(e) => {
                                        e.stopPropagation();
                                        if (recentSearches.length === 0) return;
                                        onClearRecentSearches();
                                        toast.info("Recent searches cleared!", { autoClose: 5000 });
                                    }}
                                    className="
                    px-3 py-1 rounded-full text-sm font-semibold
                    bg-slate-300 dark:bg-slate-700
                    text-slate-800 dark:text-slate-200
                    hover:bg-slate-400 dark:hover:bg-slate-600
                    transition
                    disabled:opacity-40 disabled:cursor-not-allowed

                    /* 281–320 */
                    min-[281px]:max-[320px]:text-xs

                    /* 240–280 */
                    min-[240px]:max-[280px]:text-[11px]
                  "
                                    disabled={recentSearches.length === 0}
                                >
                                    Clear recent
                                </button>
                            </div>

                            {recentSearches.length === 0 ? (
                                <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 min-[240px]:max-[280px]:text-xs min-[281px]:max-[320px]:text-xs">
                                    No recent searches yet.
                                </div>
                            ) : (
                                recentSearches.map((city, i) => (
                                    <Suggestion
                                        key={`${city.lat}-${city.lon}-${i}`}
                                        item={city}
                                        onSelect={() => handleSelectCoordinates(city)}
                                    />
                                ))
                            )}
                        </>
                    )}

                    {mode === "suggestions" && results.length > 0 && (
                        <>
                            {results.map((city, i) => (
                                <Suggestion
                                    key={`${city.lat}-${city.lon}-${i}`}
                                    item={city}
                                    onSelect={() => handleSelectCoordinates(city)}
                                />
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );

}

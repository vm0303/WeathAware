import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import github from "../assets/github.svg";
import { weatherSpinnerMap, defaultIcons } from "../utils/weatherSpinnerMap";

// ⭐ Import ALL meteocon SVG files (same as LoadingScreen)
function importAll(r) {
    let icons = {};
    r.keys().forEach((key) => {
        icons[key.replace("./", "")] = r(key);
    });
    return icons;
}

const METEOCONS = importAll(
    require.context("../assets/meteocons", false, /\.svg$/)
);

export default function Header({ theme }) {
    const [randomIcon, setRandomIcon] = useState(null);

    useEffect(() => {
        const keys = Object.keys(weatherSpinnerMap);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const iconList = weatherSpinnerMap[randomKey] || defaultIcons;
        const randomFilename = iconList[Math.floor(Math.random() * iconList.length)];
        setRandomIcon(METEOCONS[randomFilename]);
    }, []);

    return (
        <header
            className="
        flex justify-between items-center h-28 px-2 animate-fadeIn
        max-[320px]:h-20 max-[320px]:px-1
        max-[280px]:h-16
      "
        >
            <div className="flex items-center gap-3 max-[320px]:gap-2">
                {randomIcon && (
                    <img
                        src={randomIcon}
                        alt="Weather Icon"
                        className="w-14 h-14 weather-icon max-[320px]:w-9 max-[320px]:h-9"
                    />
                )}

                <h1
                    className={`
            font-semibold ${theme} text-3xl
            max-[320px]:text-[17px]
            max-[280px]:text-[15px]
          `}
                >
                    WeathAware
                </h1>
            </div>

            <div className="flex items-center gap-4 max-[320px]:gap-2">
                <ThemeToggle />
                <a
                    href="https://github.com/vm0303"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                >
                    <img
                        src={github}
                        alt="GitHub"
                        className="w-8 h-8 transition dark:invert max-[320px]:w-6 max-[320px]:h-6"
                    />
                </a>
            </div>
        </header>
    );
}

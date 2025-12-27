import React, {useEffect, useState} from "react";
import ThemeToggle from "./ThemeToggle";
import github from "../assets/github.svg";
import {weatherSpinnerMap, defaultIcons} from "../utils/weatherSpinnerMap";

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

export default function Header({theme}) {
    const [randomIcon, setRandomIcon] = useState(null);

    useEffect(() => {
        // Pick a random category
        const keys = Object.keys(weatherSpinnerMap);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];

        // Pick a random icon from inside that category
        const iconList = weatherSpinnerMap[randomKey] || defaultIcons;
        const randomFilename =
            iconList[Math.floor(Math.random() * iconList.length)];

        // Lookup the actual imported SVG from METEOCONS
        setRandomIcon(METEOCONS[randomFilename]);
    }, []);

    return (
        <header className="flex justify-between items-center h-28 px-2 animate-fadeIn
                     min-[240px]:h-16 min-[240px]:px-1">
            <div className="flex items-center gap-3 min-[240px]:gap-2">
                {randomIcon && (
                    <img
                        src={randomIcon}
                        alt="Weather Icon"
                        className="w-14 h-14 weather-icon min-[240px]:w-9 min-[240px]:h-9"
                    />
                )}

                <h1 className={`font-semibold ${theme} text-3xl min-[240px]:text-sm`}>
                    WeathAware
                </h1>
            </div>

            <div className="flex items-center gap-4 min-[240px]:gap-2">
                {/* shrink toggle via CSS (next section) */}
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
                        className="w-8 h-8 transition dark:invert min-[240px]:w-6 min-[240px]:h-6"
                    />
                </a>
            </div>
        </header>
    );

}

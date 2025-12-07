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
        <header className="flex justify-between items-center h-28 px-2 animate-fadeIn">
            <div className="flex items-center gap-3">
                {randomIcon && (
                    <img
                        src={randomIcon}
                        alt="Weather Icon"
                        className="w-14 h-14 weather-icon"
                    />
                )}

                <h1 className={`text-3xl font-semibold ${theme}`}>
                    WeathAware
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle/>

                <a
                    href="https://github.com/vm0303"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={github}
                        alt="GitHub"
                        className="w-8 h-8 transition dark:invert"
                    />
                </a>
            </div>
        </header>
    );
}

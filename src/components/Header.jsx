import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import github from "../assets/github.svg";
import { weatherSpinnerMap, defaultIcons } from "../utils/weatherSpinnerMap";

// ⭐ Import ALL meteocon SVG files
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
        flex justify-between items-center animate-fadeIn
        h-28 px-2
        supports-[padding:env(safe-area-inset-left)]:px-[env(safe-area-inset-left)]
        supports-[padding:env(safe-area-inset-right)]:px-[env(safe-area-inset-right)]

        /* 347–360 */
        min-[347px]:max-[360px]:h-24
        min-[347px]:max-[360px]:px-0

        /* 321–346 */
        min-[321px]:max-[346px]:h-[90px]
        min-[321px]:max-[346px]:px-0

        /* 281–320 */
        min-[281px]:max-[320px]:h-20
        min-[281px]:max-[320px]:px-0

        /* 240–280 */
        min-[240px]:max-[280px]:h-16
        min-[240px]:max-[280px]:px-0
      "
        >
            {/* LEFT */}
            <div
                className="
          flex items-center gap-3

          /* 347–360 */
          min-[347px]:max-[360px]:gap-3

          /* 321–346 */
          min-[321px]:max-[346px]:gap-2

          /* 281–320 */
          min-[281px]:max-[320px]:gap-2

          /* 240–280 */
          min-[240px]:max-[280px]:gap-2
        "
            >
                {randomIcon && (
                    <img
                        src={randomIcon}
                        alt="Weather Icon"
                        className="
              w-14 h-14 weather-icon shrink-0

              /* 347–360 */
              min-[347px]:max-[360px]:w-12
              min-[347px]:max-[360px]:h-12

              /* 321–346 */
              min-[321px]:max-[346px]:w-10
              min-[321px]:max-[346px]:h-10

              /* 281–320 */
              min-[281px]:max-[320px]:w-9
              min-[281px]:max-[320px]:h-9

              /* 240–280 */
              min-[240px]:max-[280px]:w-8
              min-[240px]:max-[280px]:h-8
            "
                    />
                )}

                <h1
                    className={`
            font-semibold ${theme} text-3xl leading-tight whitespace-nowrap

            /* 347–360 */
            min-[347px]:max-[360px]:text-[22px]

            /* 321–346 */
            min-[321px]:max-[346px]:text-[20px]

            /* 281–320 */
            min-[281px]:max-[320px]:text-[17px]

            /* 240–280 */
            min-[240px]:max-[280px]:text-[15px]
          `}
                >
                    WeathAware
                </h1>
            </div>

            {/* RIGHT */}
            <div
                className="
          flex items-center gap-4 shrink-0

          /* 347–360 */
          min-[347px]:max-[360px]:gap-3

          /* 321–346 */
          min-[321px]:max-[346px]:gap-2

          /* 281–320 */
          min-[281px]:max-[320px]:gap-2

          /* 240–280 */
          min-[240px]:max-[280px]:gap-2
        "
            >
                <ThemeToggle />

                <a
                    href="https://github.com/vm0303"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex items-center justify-center"
                >
                    <img
                        src={github}
                        alt="GitHub"
                        className="
              w-8 h-8 transition dark:invert

              /* 347–360 */
              min-[347px]:max-[360px]:w-7
              min-[347px]:max-[360px]:h-7

              /* 321–346 */
              min-[321px]:max-[346px]:w-7
              min-[321px]:max-[346px]:h-7

              /* 281–320 */
              min-[281px]:max-[320px]:w-6
              min-[281px]:max-[320px]:h-6

              /* 240–280 */
              min-[240px]:max-[280px]:w-6
              min-[240px]:max-[280px]:h-6
            "
                    />
                </a>
            </div>
        </header>
    );
}

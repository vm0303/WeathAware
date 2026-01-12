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

        /* 433–440 */
        min-[433px]:max-[440px]:h-24
        min-[433px]:max-[440px]:px-0

        /* 413–432  */
        min-[413px]:max-[432px]:h-24
        min-[413px]:max-[432px]:px-0

        /* 401–412  */
        min-[401px]:max-[412px]:h-24
        min-[401px]:max-[412px]:px-0

        /* 391–400  */
        min-[391px]:max-[400px]:h-24
        min-[391px]:max-[400px]:px-0

        /* 385–390  */
        min-[385px]:max-[390px]:h-24
        min-[385px]:max-[390px]:px-0

        /* 377–384  */
        min-[377px]:max-[384px]:h-24
        min-[377px]:max-[384px]:px-0

        /* 361–376*/
        min-[361px]:max-[376px]:h-24
        min-[361px]:max-[376px]:px-0

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

          /* 433–440 */
          min-[433px]:max-[440px]:gap-3

          /* 413–432  */
          min-[413px]:max-[432px]:gap-3

          /* 401–412  */
          min-[401px]:max-[412px]:gap-3

          /* 391–400  */
          min-[391px]:max-[400px]:gap-2

          /* 385–390  */
          min-[385px]:max-[390px]:gap-3

          /* 377–384  */
          min-[377px]:max-[384px]:gap-3

          /* 361–376  */
          min-[361px]:max-[376px]:gap-3

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

              /* 433–440 */
              min-[433px]:max-[440px]:w-16
              min-[433px]:max-[440px]:h-16


              /* 413–432  */
              min-[413px]:max-[432px]:w-16
              min-[413px]:max-[432px]:h-16

              /* 401–412  */
              min-[401px]:max-[412px]:w-15
              min-[401px]:max-[412px]:h-15

              /* 391–400  */
              min-[391px]:max-[400px]:w-14
              min-[391px]:max-[400px]:h-14

              /* 385–390  */
              min-[385px]:max-[390px]:w-12
              min-[385px]:max-[390px]:h-12

              /* 377–384  */
              min-[377px]:max-[384px]:w-12
              min-[377px]:max-[384px]:h-12

              /* 361–376  */
              min-[361px]:max-[376px]:w-12
              min-[361px]:max-[376px]:h-12

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

            /* 433–440 */
            min-[433px]:max-[440px]:text-[27px]

            /* 413–432  */
            min-[413px]:max-[432px]:text-[26px]

            /* 401–412  */
            min-[401px]:max-[412px]:text-[25.5px]

            /* 391–400  */
            min-[391px]:max-[400px]:text-[25px]

            /* 385–390  */
            min-[385px]:max-[390px]:text-[24px]

            /* 377–384  */
            min-[377px]:max-[384px]:text-[23.5px]

            /* 361–376  */
            min-[361px]:max-[376px]:text-[23px]

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

          /* 433–440  */
          min-[433px]:max-[440px]:gap-3

          /* 413–432  */
          min-[413px]:max-[432px]:gap-3

          /* 401–412  */
          min-[401px]:max-[412px]:gap-3

          /* 391–400  */
          min-[391px]:max-[400px]:gap-3

          /* 385–390  */
          min-[385px]:max-[390px]:gap-3

          /* 377–384  */
          min-[377px]:max-[384px]:gap-3

          /* 361–376  */
          min-[361px]:max-[376px]:gap-3

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

              min-[433px]:max-[440px]:w-10
              min-[433px]:max-[440px]:h-10

              /* 413–432  */
              min-[413px]:max-[432px]:w-10
              min-[413px]:max-[432px]:h-10

              /* 401–412  */
              min-[401px]:max-[412px]:w-9
              min-[401px]:max-[412px]:h-9

              /* 391–400  */
              min-[391px]:max-[400px]:w-9
              min-[391px]:max-[400px]:h-9

              /* 385–390  */
              min-[385px]:max-[390px]:w-7
              min-[385px]:max-[390px]:h-7

              /* 376–384  */
              min-[376px]:max-[384px]:w-7
              min-[376px]:max-[384px]:h-7

              /* 361–375  */
              min-[361px]:max-[375px]:w-7
              min-[361px]:max-[375px]:h-7

              /* 347–360 */
              min-[347px]:max-[375px]:w-7
              min-[347px]:max-[375px]:h-7

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

import React, {useMemo} from "react";
import {weatherSpinnerMap, defaultIcons} from "../utils/weatherSpinnerMap";
import {shineColors} from "../utils/shineColors";

// Import ALL Meteocon SVGs
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

export default function LoadingScreen({weather}) {
    // Condition text
    const condition = weather?.current?.condition?.text?.toLowerCase() || "";

    const category = useMemo(() => {
        if (condition.includes("blizzard")) return "blizzard";
        if (condition.includes("cloudy")) return "cloudy";
        if (condition.includes("drizzle")) return "drizzle";
        if (condition.includes("fog")) return "fog";
        if (condition.includes("freezingfog")) return "freezingFog";
        if (condition.includes("heavy rain")) return "heavyRain";
        if (condition.includes("heavy sleet")) return "heavySleet";
        if (condition.includes("heavy snow")) return "heavySnow";
        if (condition.includes("thunder")) return "thunder";
        if (condition.includes("light rain")) return "lightRain";
        if (condition.includes("light sleet")) return "lightSleet";
        if (condition.includes("mist")) return "mist";
        if (condition.includes("moderate rain")) return "moderateRain";
        if (condition.includes("moderate snow")) return "moderateSnow";
        if (condition.includes("overcast")) return "overcast";
        if (condition.includes("patchy rain")) return "patchyRain";
        if (condition.includes("patchy sleet")) return "patchySleet";
        if (condition.includes("patchy snow")) return "patchySnow";
        if (condition.includes("sunny")) return "sunny";
        if (condition.includes("clear")) return "clear";
        return null;
    }, [condition]);

    // Random icon
    const iconFile = useMemo(() => {
        const arr = weatherSpinnerMap[category] || defaultIcons;
        return arr[Math.floor(Math.random() * arr.length)];
    }, [category]);

    const iconSrc = METEOCONS[iconFile];

    const shineText = useMemo(() => {

        const colorPick = () => shineColors[Math.floor(Math.random() * shineColors.length)];
        return [colorPick()];
    }, []);
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-50">

            {/* ICON WITH SHINE */}
            <div
                className="relative w-48 h-48 md:w-40 md:h-40 sm:w-32 sm:h-32 xs:w-24 xs:h-24 flex items-center justify-center">
                <img src={iconSrc} alt="loading" className="w-full h-full icon-glow-shine"/>
            </div>

            {/* SHINY LOADING TEXT */}
            <p
                className="loading-shine text-3xl mt-4 tracking-wider"
                style={{
                    "--c1": shineText[0]

                }}
            >
                Loading...
            </p>
        </div>
    );
}

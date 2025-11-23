import React, { useEffect, useState } from "react";
import SunIcon from "../assets/sun.svg";   // update path if needed
import MoonIcon from "../assets/moon.svg"; // update path if needed

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    // Load saved theme
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
            setDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggle = () => {
        const newDark = !dark;
        setDark(newDark);

        if (newDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <button
            onClick={toggle}
            className="
                relative w-16 h-8 flex items-center
                rounded-full px-1
                transition-all duration-300
                bg-gray-300 dark:bg-gray-700
                shadow-inner
            "
        >
            {/* Sun Icon */}
            <img
                src={SunIcon}
                alt="Light mode"
                className={`
                    absolute left-2 w-5 h-5 transition-opacity
                    ${dark ? "opacity-0" : "opacity-100"}
                `}
            />

            {/* Moon Icon */}
            <img
                src={MoonIcon}
                alt="Dark mode"
                className={`
                    absolute right-2 w-5 h-5 transition-opacity
                    ${dark ? "opacity-100" : "opacity-0"}
                `}
            />

            {/* Slider knob */}
            <div
                className={`
                    absolute bg-white rounded-full shadow-md
                    w-6 h-6 transition-transform duration-300
                    ${dark ? "translate-x-8" : "translate-x-0"}
                `}
            />
        </button>
    );
}

import React from "react";
import ThemeToggle from "./ThemeToggle";
import github from "../assets/github.svg";

export default function Header({ theme }) {
    return (
        <header className="flex justify-between items-center h-28 px-2">
            <h1 className={`text-3xl font-semibold ${theme}`}>
                WeathAware
            </h1>

            <div className="flex items-center gap-4">
                <ThemeToggle />

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

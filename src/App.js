import React, { useEffect } from "react";
import Home from "./pages/Home";

export default function App() {
    // Ensure dark mode persists
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
            document.documentElement.classList.add("dark");
        }
    }, []);

    return (
        <div className="min-h-screen font-[Poppins,sans-serif] transition-colors">
            <Home />
        </div>
    );
}

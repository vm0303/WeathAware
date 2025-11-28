import React, { useState, useEffect, useRef } from "react";
import { searchCities } from "../utils/weatherAPI";
import { useClickOutside } from "../hooks/clickOutside";
import Suggestion from "./Suggestions";
import  searchGlass from "../assets/searchGlass.svg";
import location_Globe from "../assets/locationGlobe.svg";

export default function Search({ onSelectCity }) {
    const [term, setTerm] = useState("");
    const [results, setResults] = useState([]);
    const [show, setShow] = useState(false);

    const containerRef = useRef();
    useClickOutside(containerRef, () => setShow(false));

    // handle input
    useEffect(() => {
        if (!term) return;

        const fetch = async () => {
            const cities = await searchCities(term);
            setResults(cities.slice(0, 6));
            setShow(true);
        };

        const timeout = setTimeout(fetch, 300);
        return () => clearTimeout(timeout);
    }, [term]);

    const handleGeo = () => {
        if (!navigator.geolocation) return alert("Geolocation not supported.");

        navigator.geolocation.getCurrentPosition((pos) => {
            const q = `${pos.coords.latitude},${pos.coords.longitude}`;
            onSelectCity(q);
        });
    };

    return (
        <div className="relative bg-white/70 dark:bg-slate-800/50 shadow rounded-full h-14 flex items-center px-4 mb-8">

            <button
                onClick={() => {
                    if (term.trim().length > 0) {
                        onSelectCity(term);   // ⬅️ trigger search manually
                    }
                }}
                className="flex items-center justify-center"
            >

            <img
                src={searchGlass}
                alt="Search"
                className="
            w-7 h-7 object-contain
        opacity-70 dark:opacity-90
        dark:invert dark:brightness-200
        "
            />
            </button>

            <input
                type="text"
                className="flex-1 bg-transparent border-none focus:outline-none ml-3 text-lg text-slate-800 dark:text-slate-200 placeholder-slate-700 dark:placeholder-slate-200"
                placeholder="Search for a location"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />

            <button
                onClick={handleGeo}
                className="ml-3 flex items-center justify-center
               w-8 h-8 rounded-full
               opacity-100 hover:opacity-100
               transition duration-200"

            >
                <img
                    src={location_Globe}
                    alt="Use my location"
                    title="Click here to find the current weather and 3 day forcast in your location."
                    className="w-7 h-7 object-contain dark:invert dark:brightness-200
    "
                />
            </button>


            {show && results.length > 0 && (
                <div
                    ref={containerRef}
                    className="absolute left-0 top-16 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden z-20"
                >
                    {results.map((city, i) => (
                        <Suggestion
                            key={i}
                            item={city}
                            onSelect={() => {
                                onSelectCity(`${city.lat},${city.lon}`);
                                setShow(false);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

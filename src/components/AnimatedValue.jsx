import React, {useState, useEffect} from "react";

export default function AnimatedValue({value, unit, className = ""}) {
    const [display, setDisplay] = useState(value);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        setFade(true);

        const timeout = setTimeout(() => {
            setDisplay(value);
            setFade(false);
        }, 300); // shorter fade prevents overlap

        return () => clearTimeout(timeout);
    }, [unit]);  // 🚀 fade ONLY when unit changes

    return (
        <span
            className={`${className} transition-opacity duration-300 ${
                fade ? "opacity-0" : "opacity-100"
            }`}
        >
            {display}
        </span>
    );
}

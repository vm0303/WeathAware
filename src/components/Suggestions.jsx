import React from "react";

export default function Suggestion({ item, onSelect }) {
    return (
        <button
            onClick={onSelect}
            className="text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 w-full"
        >
            {item.name}, {item.region}, {item.country}
        </button>
    );
}

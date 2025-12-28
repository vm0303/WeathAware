import React from "react";

export default function Suggestion({ item, onSelect }) {
    return (
        <button
            type="button"
            onPointerDown={(e) => {
                e.preventDefault();   // prevents focus bounce / blur timing issues
                e.stopPropagation();  // prevents outside click handler

                onSelect();           // ✅ select immediately (more reliable on mobile)
            }}
            className="text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 w-full max-[280px]:text-xs"
        >
            {item.name}, {item.region}, {item.country}
        </button>
    );
}

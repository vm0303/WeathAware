import React from "react";

export default function Suggestion({ item, onSelect }) {
    return (
        <button
            type="button"
            onPointerDown={(e) => {
                e.preventDefault(); // prevents focus bounce / blur timing issues
                e.stopPropagation(); // prevents outside click handler
                onSelect(); // ✅ select immediately (more reliable on mobile)
            }}
            className="
        text-left w-full
        px-4 py-2
        text-slate-700 dark:text-slate-200
        hover:bg-slate-100 dark:hover:bg-slate-700
        transition

        /* 347–360 */
        min-[347px]:max-[360px]:px-4
        min-[347px]:max-[360px]:py-2.5
        min-[347px]:max-[360px]:text-sm

        /* 321–346 */
        min-[321px]:max-[346px]:px-4
        min-[321px]:max-[346px]:py-2.5
        min-[321px]:max-[346px]:text-sm

        /* 281–320 */
        min-[281px]:max-[320px]:px-3
        min-[281px]:max-[320px]:py-2
        min-[281px]:max-[320px]:text-xs

        /* 240–280 */
        min-[240px]:max-[280px]:px-3
        min-[240px]:max-[280px]:py-2
        min-[240px]:max-[280px]:text-xs
      "
        >
            {item.name}, {item.region}, {item.country}
        </button>
    );
}

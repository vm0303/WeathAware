import React from "react";

export default function SearchBar({
                                      query,
                                      onChange,
                                      onSubmit,
                                      suggestions,
                                      onSelectSuggestion,
                                      loadingSuggestions,
                                  }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="w-full max-w-xl mb-10 relative">
            <div className="flex bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-full shadow-lg overflow-hidden">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search city..."
                    className="flex-1 px-5 py-3 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
                />
                <button
                    onClick={onSubmit}
                    className="px-6 py-3 font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                    Search
                </button>
            </div>

            {/* Suggestions dropdown */}
            {query.length >= 2 && suggestions.length > 0 && (
                <div className="absolute z-40 mt-2 w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
                    {loadingSuggestions && (
                        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                            Searching…
                        </div>
                    )}
                    {suggestions.map((s) => (
                        <button
                            key={`${s.name}-${s.lat}-${s.lon}`}
                            onClick={() => onSelectSuggestion(s)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                            {s.name}
                            {s.region ? `, ${s.region}` : ""} — {s.country}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

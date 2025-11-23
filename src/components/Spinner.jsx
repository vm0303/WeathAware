import React from "react";

export default function Spinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-md z-50">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
        </div>
    );
}

import React from "react";

export default function Footer(theme) {
    return (
        <footer className="py-6 text-center">
            <p className={`text-lg ${theme.text} min-[240px]:text-sm`}>
                Created by Vishal Madhav</p>
        </footer>
    );
}

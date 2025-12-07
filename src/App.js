import React, {useEffect} from "react";
import Home from "./pages/Home";
import {ToastContainer, Slide} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <Home/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
        </div>
    );
}

import {useEffect} from "react";

export const useClickOutside = (ref, onClose) => {
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClose();
            }
        };

        // Unified pointer event: covers mouse, touch, trackpad tap, stylus
        document.addEventListener("pointerdown", handler);

        return () => {
            document.removeEventListener("pointerdown", handler);
        };
    }, [ref, onClose]);
};

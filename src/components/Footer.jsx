// src/components/Footer.jsx
import React from "react";

export default function Footer({ theme }) {
    return (
        <footer
            className="
        text-center
        py-6
        relative
        z-0
        animate-fadeIn-opacity

        /* 347–360 */
        min-[347px]:max-[360px]:py-6

        /* 321–346 */
        min-[321px]:max-[346px]:py-5

        /* 281–320 */
        min-[281px]:max-[320px]:py-5

        /* 240–280 */
        min-[240px]:max-[280px]:py-4
      "
        >
            <p
                className={`
          font-medium ${theme.text}

          /* base */
          text-lg

          /* 347–360 */
          min-[347px]:max-[360px]:text-[16px]

          /* 321–346 */
          min-[321px]:max-[346px]:text-[15px]

          /* 281–320 */
          min-[281px]:max-[320px]:text-[14px]

          /* 240–280 */
          min-[240px]:max-[280px]:text-[13px]
        `}
            >
                Created by Vishal Madhav
            </p>
        </footer>
    );
}

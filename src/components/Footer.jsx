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

        /* 413–432 */
        min-[413px]:max-[432px]:py-7

        /* 401–412 */
        min-[401px]:max-[412px]:py-7

        /* 391–400 */
        min-[391px]:max-[400px]:py-6.5

        /* 385–390 */
        min-[385px]:max-[390px]:py-6.5

        /* 377–384 */
        min-[377px]:max-[384px]:py-6

        /* 361–376 */
        min-[361px]:max-[376px]:py-6

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

          /* 413–432 */
          min-[413px]:max-[432px]:text-[18px]

          /* 401–412 */
          min-[401px]:max-[412px]:text-[18px]

          /* 391–400 */
          min-[391px]:max-[400px]:text-[17px]

          /* 385–390 */
          min-[385px]:max-[390px]:text-[17px]

          /* 361–384 */
          min-[361px]:max-[384px]:text-[16px]

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

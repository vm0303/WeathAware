# WeathAware 🌤️

WeathAware is a beautifully crafted, interactive weather dashboard built with React (CRA) that transforms raw weather data into an engaging and intuitive experience. It allows users to instantly understand current conditions, explore hourly trends, and plan ahead with multi-day forecasts — all while the UI dynamically adapts to closely reflect real-world weather conditions.

This project was built with a strong focus on design, usability, and performance, blending clean visuals, smooth animations, and thoughtful interactions into a polished, real-world application.

> **Demo:** [WeathAware](weathaware-alpha.vercel.app)

---

## Why this project

WeathAware was created to showcase not just functional weather data, but how front-end development can elevate everyday information into an enjoyable and meaningful user experience. It demonstrates strong attention to both technical implementation and user-centered design.

This project highlights:
- A **component-driven architecture** that keeps the codebase clean, scalable, and maintainable
- **Real-time API integration** with solid error handling and user feedback
- **Weather-aware UI theming** that visually reacts to changing conditions
- A carefully designed **dark mode experience** based on both time and user preference
- **Mobile-first interactions**, ensuring smooth usability across all devices

It reflects how modern front-end development is about more than just functionality. It’s about clarity, responsiveness, and visual storytelling.


---

## Features

- **City search with autocomplete** powered by WeatherAPI
- **Recent searches** stored locally for faster access
- **Use my location** for instant, location-based weather lookup
- **Current conditions overview** (temperature, condition, last updated time)
- **Hourly forecast** to visualize changes throughout the day
- **Multi-day forecast** for better planning
- **Sunrise and sunset display** for environmental awareness
- **Dynamic weather-based themes** that visually mirror conditions
- **Automatic dark mode** based on time of day with manual override and persistence
- **Friendly toast notifications** for errors, invalid input, or API issues
- **Smooth UI animations** using Framer Motion for a modern, fluid feel

---

## Tech Stack

- **React (CRA)** + React 19
- **Tailwind CSS** – fast, responsive, and clean styling
- **Axios** – efficient API communication
- **Framer Motion** – modern UI animations
- **React Toastify** – intuitive notifications
- **WeatherAPI.com** – reliable real-time weather data

---

## What I Learned

Building WeathAware was a great opportunity to strengthen both my technical skills and my understanding of user-focused design. Through this project, I gained hands-on experience with:

- Designing a **scalable React component architecture** that keeps UI logic clean and reusable
- Working with **real-world APIs**, including handling loading states, errors, and edge cases gracefully
- Managing **application state** in a way that keeps the UI responsive and predictable
- Creating **dynamic theming systems** that react to external data (weather conditions + time of day)
- Implementing **geolocation features** in a user-friendly and privacy-conscious way
- Improving **UX through feedback**, animations, and transitions that make interactions feel natural
- Using **environment variables** to protect sensitive data like API keys
- Writing **production-ready UI code** with maintainability and clarity in mind

Most importantly, this project taught me how small details, such as smooth animations, meaningful error messages, 
and adaptive design, can significantly elevate the quality and professionalism of an application. It reinforced my belief that great front-end development lives at the intersection of engineering and thoughtful user experience.
---

## Getting Started with Your React App (CRA)


This project was bootstrapped using **Create React App**, which provides a solid foundation for building modern React applications with zero configuration.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

---

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about running tests for more information.

---

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about deployment for more information.

---

### `npm run eject`

> **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time.  
This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) directly into your project so you have full control over them.  
All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them.

You don’t have to ever use `eject`. The curated feature set is suitable for small and medium deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

---

## Learn More

You can learn more in the [Create React App documentation](https://create-react-app.dev/).

To learn React, check out the [React documentation](https://react.dev/).

---

## Deployment

You can deploy your app to platforms such as **Vercel**, **Netlify**, or **GitHub Pages**.

When deploying:
- Set your environment variables (like `REACT_APP_WEATHERAPI_KEY`) in the platform’s dashboard.
- Redeploy the app after adding environment variables.

---

## Troubleshooting

### `npm run build` fails to minify

This usually happens when one of your dependencies uses modern JavaScript features that your environment does not support.  
You can find more details in the CRA documentation about advanced configuration and compatibility.


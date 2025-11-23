import React from "react";
import { motion } from "framer-motion";
import WeatherIcon from "./WeatherIcon";
import Forecast from "./Forecast";

export default function WeatherCard({ weatherData }) {
    const { current, location, forecast } = weatherData;
    const isDay = current.is_day === 1;

    return (
        <motion.div
            key={location.name + current.last_updated_epoch}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="
        w-full
        bg-white/20 dark:bg-black/25
        backdrop-blur-2xl
        rounded-3xl
        shadow-2xl
        p-10
        text-center
      "
        >
            {/* City */}
            <h1 className="text-3xl font-semibold dark:text-gray-50">
                {location.name}
            </h1>

            {/* Icon */}
            <div className="flex justify-center my-6">
                <WeatherIcon code={current.condition.code} isDay={isDay} />
            </div>

            {/* Temp / condition */}
            <p className="text-5xl font-bold dark:text-gray-50">
                {current.temp_c}°C
            </p>
            <p className="mt-1 text-lg text-gray-700 dark:text-gray-300">
                {current.condition.text}
            </p>

            {/* Details row */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-sm md:text-base">
                <div>
                    <p className="text-gray-500 dark:text-gray-400">Feels like</p>
                    <p className="font-semibold dark:text-gray-100">
                        {current.feelslike_c}°C
                    </p>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400">Wind</p>
                    <p className="font-semibold dark:text-gray-100">
                        {current.wind_kph} kph {current.wind_dir}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400">Humidity</p>
                    <p className="font-semibold dark:text-gray-100">
                        {current.humidity}%
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-white/30 dark:bg-white/10 my-8" />

            {/* Forecast row */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {forecast.forecastday.map((day) => (
                    <Forecast key={day.date} day={day} />
                ))}
            </div>
        </motion.div>
    );
}

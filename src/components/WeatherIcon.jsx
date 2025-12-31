import {motion, useReducedMotion} from "framer-motion";

// Import Meteocons SVGs
import sun from "../assets/meteocons/sun.svg";
import moon from "../assets/meteocons/moon.svg";
import partlyCloudyDay from "../assets/meteocons/partlyCloudyDay.svg";
import partlyCloudyNight from "../assets/meteocons/partlyCloudyNight.svg";
import cloudy from "../assets/meteocons/cloudy.svg";
import overcast from "../assets/meteocons/overcast.svg";
import mist from "../assets/meteocons/mist.svg";
import heavyRain from "../assets/meteocons/heavyRain.svg";
import drizzle from "../assets/meteocons/drizzle.svg";
import sleet from "../assets/meteocons/sleet.svg";
import patchyRainDay from "../assets/meteocons/patchyRainDay.svg";
import patchyRainNight from "../assets/meteocons/patchyRainNight.svg";
import patchySnowDay from "../assets/meteocons/patchySnowDay.svg";
import patchySnowNight from "../assets/meteocons/patchySnowNight.svg";
import patchySleetDay from "../assets/meteocons/patchySleetDay.svg";
import patchySleetNight from "../assets/meteocons/patchySleetNight.svg";
import thunderDay from "../assets/meteocons/thunderDay.svg";
import thunderNight from "../assets/meteocons/thunderNight.svg";
import windSnow from "../assets/meteocons/windSnow.svg";
import blizzard from "../assets/meteocons/blizzard.svg";
import fogDay from "../assets/meteocons/fogDay.svg";
import fogNight from "../assets/meteocons/fogNight.svg";
import freezingFog from "../assets/meteocons/freezingFog.svg";
import heavyDrizzle from "../assets/meteocons/heavyDrizzle.svg";
import lightRain from "../assets/meteocons/lightRain.svg";
import moderateRain from "../assets/meteocons/moderateRain.svg";
import heavyRainAtTimesDay from "../assets/meteocons/heavyRainAtTimesDay.svg";
import heavyRainAtTimesNight from "../assets/meteocons/heavyRainAtTimesNight.svg";
import heavySleetDay from "../assets/meteocons/heavySleetDay.svg";
import heavySleetNight from "../assets/meteocons/heavySleetNight.svg";
import moderateRainAtTimesDay from "../assets/meteocons/moderateRainAtTimesDay.svg";
import moderateRainAtTimesNight from "../assets/meteocons/moderateRainAtTimesNight.svg";
import moderateSnowAtTimesDay from "../assets/meteocons/moderateSnowAtTimesDay.svg";
import moderateSnowAtTimesNight from "../assets/meteocons/moderateSnowAtTimesNight.svg";
import moderateSnow from "../assets/meteocons/moderateSnow.svg";
import heavySnowDay from "../assets/meteocons/heavySnowDay.svg";
import heavySnowNight from "../assets/meteocons/heavySnowNight.svg";
import overcastDaySleet from "../assets/meteocons/overcastDaySleet.svg";
import overcastNightSleet from "../assets/meteocons/overcastNightSleet.svg";
import lightSleetDay from "../assets/meteocons/lightSleetDay.svg";
import lightSleetNight from "../assets/meteocons/lightSleetNight.svg";
import heavySleet from "../assets/meteocons/heavySleet.svg";
import patchyLightRainWithThunderDay from "../assets/meteocons/patchyLightRainWithThunderDay.svg";
import patchyLightRainWithThunderNight from "../assets/meteocons/patchyLightRainWithThunderNight.svg";
import thunderstormsDayExtremeRain from "../assets/meteocons/thunderstormsDayExtremeRain.svg"
import thunderstormsNightExtremeRain from "../assets/meteocons/thunderstormsNightExtremeRain.svg"
import patchyLightSnowWithThunderDay from "../assets/meteocons/patchyLightSnowWithThunderDay.svg";
import patchyLightSnowWithThunderNight from "../assets/meteocons/patchyLightSnowWithThunderNight.svg";
import heavySnowThunderDay from "../assets/meteocons/heavySnowThunderDay.svg";
import heavySnowThunderNight from "../assets/meteocons/heavySnowThunderNight.svg";

//Map all WeatherAPI codes

export const weatherMap = {
    1000: {day: sun, night: moon, type: "clear"},
    1003: {day: partlyCloudyDay, night: partlyCloudyNight, type: "cloud"},
    1006: {day: cloudy, night: cloudy, type: "cloud"},
    1009: {day: overcast, night: overcast, type: "cloud"},
    1030: {day: mist, night: mist, type: "mist"},
    1063: {day: patchyRainDay, night: patchyRainNight, type: "patchyRain"},
    1066: {day: patchySnowDay, night: patchySnowNight, type: "patchySnow"},
    1069: {day: patchySleetDay, night: patchySleetNight, type: "sleet"},
    1072: {day: patchyRainDay, night: patchyRainNight, type: "freezingDrizzle"},
    1087: {day: thunderDay, night: thunderNight, type: "thunder"},
    1114: {day: windSnow, night: windSnow, type: "windSnow"},
    1117: {day: blizzard, night: blizzard, type: "blizzard"},
    1135: {day: fogDay, night: fogNight, type: "fog"},
    1147: {day: freezingFog, night: freezingFog, type: "freezingFog"},
    1150: {day: drizzle, night: drizzle, type: "patchyLightDrizzle"},
    1153: {day: drizzle, night: drizzle, type: "drizzle"},
    1168: {day: drizzle, night: drizzle, type: "patchyFreezingDrizzle"},
    1171: {day: heavyDrizzle, night: heavyDrizzle, type: "heavyDrizzle"},
    1180: {day: patchyRainDay, night: patchyRainNight, type: "patchyRain"},
    1183: {day: lightRain, night: lightRain, type: "lightRain"},
    1186: {day: moderateRainAtTimesDay, night: moderateRainAtTimesNight, type: "moderateRain"},
    1189: {day: moderateRain, night: moderateRain, type: "moderateRain"},
    1192: {day: heavyRainAtTimesDay, night: heavyRainAtTimesNight, type: "rain"},
    1195: {day: heavyRain, night: heavyRain, type: "rain"},
    1198: {day: lightRain, night: lightRain, type: "lightRain"},
    1201: {day: heavyRain, night: heavyRain, type: "rain"},
    1204: {day: sleet, night: sleet, type: "sleet"},
    1207: {day: heavySleetDay, night: heavySleetNight, type: "sleet"},
    1210: {day: patchySnowDay, night: patchySnowNight, type: "snow"},
    1213: {day: patchySnowDay, night: patchySnowNight, type: "snow"},
    1216: {day: moderateSnowAtTimesDay, night: moderateSnowAtTimesNight, type: "snow"},
    1219: {day: moderateSnow, night: moderateSnow, type: "snow"},
    1222: {day: heavySnowDay, night: heavySnowNight, type: "snow"},
    1225: {day: blizzard, night: blizzard, type: "blizzard"},
    1237: {day: overcastDaySleet, night: overcastNightSleet, type: "sleet"},
    1240: {day: lightRain, night: lightRain, type: "lightRain"},
    1243: {day: heavyRainAtTimesDay, night: heavyRainAtTimesNight, type: "rain"},
    1246: {day: heavyRain, night: heavyRain, type: "rain"},
    1249: {day: lightSleetDay, night: lightSleetNight, type: "sleet"},
    1252: {day: heavySleet, night: heavySleet, type: "sleet"},
    1255: {day: patchySnowDay, night: patchySnowNight, type: "snow"},
    1258: {day: heavySnowDay, night: heavySnowNight, type: "snow"},
    1261: {day: patchySleetDay, night: patchySleetNight, type: "ice"},
    1264: {day: heavySleetDay, night: heavySleetNight, type: "ice"},
    1273: {day: patchyLightRainWithThunderDay, night: patchyLightRainWithThunderNight, type: "thunder"},
    1276: {day: thunderstormsDayExtremeRain, night: thunderstormsNightExtremeRain, type: "thunder"},
    1279: {day: patchyLightSnowWithThunderDay, night: patchyLightSnowWithThunderNight, type: "thunder"},
    1282: {day: heavySnowThunderDay, night: heavySnowThunderNight, type: "thunder"},
};

export default function WeatherIcon({ code, isDay, size = 56, className = "" }) {
    const entry = weatherMap[code] || weatherMap[1003];
    const icon = isDay ? entry.day : entry.night;
    const type = entry.type;

    const prefersReducedMotion = useReducedMotion();

    const variants = { /* ...keep your current variants... */ };
    const animate = prefersReducedMotion ? undefined : (variants[type] || { scale: [1, 1.02, 1] });

    return (
        <motion.img
            src={icon}
            alt="weather icon"
            style={{ width: size, height: size, display: "block" }}
            className={`mx-auto object-contain weather-icon ${className}`}
            animate={animate}
            transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}

// Maps WeatherAPI condition codes → icon categories
export const weatherSpinnerMap = {
        blizzard: ["blizzard.svg"],

        cloudy: ["cloudy.svg"],

        drizzle: ["drizzle.svg"],

        fog: [
            "fogDay.svg",
            "fogNight.svg"
        ],

        freezingFog: ["freezingFog.svg"],

        heavyDrizzle: ["heavyDrizzle.svg"],

        heavyRain: [
            "heavyRain.svg",
            "heavyRainAtTimesDay.svg",
            "heavyRainAtTimesNight.svg"
        ],

        heavySleet: [
            "heavySleet.svg",
            "heavySleetDay.svg",
            "heavySleetNight.svg"
        ],

        heavySnow: [
            "heavySnowDay.svg",
            "heavySnowNight.svg"
        ],

        heavySnowThunder: [
            "heavySnowThunderDay.svg",
            "heavySnowThunderNight.svg"
        ],

        lightRain: ["lightRain.svg"],

        lightSleet: [
            "lightSleetDay.svg",
            "lightSleetNight.svg"
        ],

        mist: ["mist.svg"],

        moderateRain: [
            "moderateRain.svg",
            "moderateRainAtTimesDay.svg",
            "moderateRainAtTimesNight.svg"
        ],

        moderateSnow: [
            "moderateSnow.svg",
            "moderateSnowAtTimesDay.svg",
            "moderateSnowAtTimesNight.svg"
        ],

        clear: ["moon.svg"],

        overcast: ["overcast.svg"],

        overcastSleet: [
            "overcastDaySleet.svg",
            "overcastNightSleet.svg"
        ],

        partlyCloudy: [
            "partlyCloudyDay.svg",
            "partlyCloudyNight.svg"
        ],

        patchyLightRainWithThunder: [
            "patchyLightRainWithThunderDay.svg",
            "patchyLightRainWithThunderNight.svg"
        ],

        patchyLightSnowWithThunder: [
            "patchyLightSnowWithThunderDay.svg",
            "patchyLightSnowWithThunderNight.svg"
        ],

        patchyRain: [
            "patchyRainDay.svg",
            "patchyRainNight.svg"
        ],

        patchySleet: [
            "patchySleetDay.svg",
            "patchySleetNight.svg"
        ],

        patchySnow: [
            "patchySnowDay.svg",
            "patchySnowNight.svg"
        ],

        sleet: ["sleet.svg"],

        sunny: ["sun.svg"],

        thunder: [
            "thunderDay.svg",
            "thunderNight.svg"
        ],

        thunderstormsExtremeRain: [
            "thunderstormsDayExtremeRain.svg",
            "thunderstormsNightExtremeRain.svg"
        ],

        windSnow: ["windSnow.svg"]
    };


// fallback if nothing matches
export const defaultIcons = ["sun.svg", "cloudy.svg", "moderateRain.svg"];

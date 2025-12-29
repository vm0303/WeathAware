// src/utils/weatherThemes.js

// -------------------------------------------
// YOUR FULL GIANT THEMES OBJECT
// -------------------------------------------
export const weatherThemes = {
    sunny: {
        light: {
            bg: "bg-gradient-to-br from-[#fff7c3] via-[#ffe080] to-[#ffd54f]",
            text: "text-black",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#fde68a]  to-[#f59e0b]",
            text: "text-black",
            card: "bg-white/30 backdrop-blur-sm border border-white/15",
        },
    },

    clear: {
        light: {
            bg: "bg-gradient-to-b from-[#38bdf8] via-[#7dd3fc] to-[#bae6fd]",
            text: "text-black",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-br from-[#020617] via-[#020617] to-[#0b1120]",
            text: "text-slate-50",
            card: "bg-white/5 backdrop-blur-sm border border-white/5",
        },
    },

    "partly-cloudy": {
        light: {
            bg: "bg-gradient-to-br from-[#fdf6e3] via-[#b6d3f5] to-[#8bb7e8]",
            text: "text-slate-800",
            card: "bg-white/40 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-tl from-[#1a1f2e] via-[#2b3346] to-[#3f4b62]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },
    // ---------------- CLOUD / OVERCAST ----------------
    cloudy: {
        light: {
            bg: "bg-gradient-to-b from-[#f4f5f7] via-[#dde3ec] to-[#c2ccd8]",
            text: "text-slate-900",
            card: "bg-white/60 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#111827] via-[#1f2933] to-[#374151]",
            text: "text-slate-200",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    overcast: {
        light: {
            bg: "bg-gradient-to-b from-[#e5e5e5] via-[#d4d4d4] to-[#b0b0b0]",
            text: "text-slate-950",
            card: "bg-white/30 backdrop-blur-sm border border-white/15",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#111827] via-[#1f2933] to-[#2f3642]",
            text: "text-slate-200",
            card: "bg-slate-900/60 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- MIST / FOG ----------------
    mist: {
        light: {
            bg: "bg-gradient-to-b from-[#f5f5f5] via-[#e5e7eb] to-[#d4d4d8]",
            text: "text-slate-800",
            card: "bg-white/40 backdrop-blur-sm border border-white/15",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#111827] via-[#1a202c] to-[#252f3a]",
            text: "text-slate-200",
            card: "bg-slate-900/45 backdrop-blur-sm border border-white/5",
        },
    },

    fog: {
        light: {
            bg: "bg-gradient-to-b from-[#f3f4f6] via-[#e5e7eb] to-[#d1d5db]",
            text: "text-slate-800",
            card: "bg-white/40 backdrop-blur-sm border border-white/15",
        },
        dark: {
            bg: "bg-gradient-to-br from-[#1e2530] via-[#2a313a] to-[#383f47]",
            text: "text-slate-200",
            card: "bg-slate-900/45 backdrop-blur-sm border border-white/5",
        },
    },

    "freezing-fog": {
        light: {
            bg: "bg-gradient-to-b from-[#eef2f6] via-[#d9dee4] to-[#c1c9d2]",
            text: "text-slate-800",
            card: "bg-white/40 backdrop-blur-sm border border-white/15",
        },
        dark: {
            bg: "bg-gradient-to-br from-[#18212c] via-[#25303c] to-[#36414d]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- PATCHY POSSIBLE (RAIN/SNOW/SLEET/FREEZING DRIZZLE) ----------------
    "patchy-rain-possible": {
        light: {
            bg: "bg-gradient-to-tr from-[#edf1f7] via-[#cbd5e1] to-[#9fb3c8]",
            text: "text-slate-800",
            card: "bg-white/45 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-tr from-[#1f2937] via-[#334155] to-[#4b5563]",
            text: "text-slate-200",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    "patchy-snow-possible": {
        light: {
            bg: "bg-gradient-to-b from-[#f3f6fb] via-[#dde7f2] to-[#c7d2de]",
            text: "text-slate-800",
            card: "bg-white/55 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#111827] via-[#1f2937] to-[#334155]",
            text: "text-slate-200",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    "patchy-sleet-possible": {
        light: {
            bg: "bg-gradient-to-br from-[#e1e7f0] via-[#c5cfe0] to-[#a0aec0]",
            text: "text-slate-800",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#0f172a] via-[#1f2937] to-[#4b5563]",
            text: "text-slate-200",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    "patchy-freezing-drizzle-possible": {
        light: {
            bg: "bg-gradient-to-b from-[#e4e9ef] via-[#d1d7de] to-[#b5bcc5]",
            text: "text-slate-800",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#1e293b] via-[#2c3546] to-[#434d5b]",
            text: "text-slate-200",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- THUNDERY OUTBREAKS POSSIBLE ----------------
    "thundery-outbreaks-possible": {
        light: {
            bg: "bg-gradient-to-b from-[#d7dce2] via-[#6b7280] to-[#4b5563]",
            text: "text-slate-900",
            card: "bg-white/40 backdrop-blur-sm border border-white/15",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#030712] via-[#0b1120] to-[#1f2937]",
            text: "text-blue-100",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- BLOWING SNOW & BLIZZARD ----------------
    "blowing-snow": {
        light: {
            bg: "bg-gradient-to-br from-[#f9fafb] via-[#e5edf5] to-[#d3e1ee]",
            text: "text-slate-800",
            card: "bg-white/55 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-tl from-[#020617] via-[#0f172a] to-[#1f2937]",
            text: "text-slate-200",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    blizzard: {
        light: {
            bg: "bg-gradient-to-t from-[#ffffff] via-[#e7eff7] to-[#cbd5e1]",
            text: "text-slate-800",
            card: "bg-white/65 backdrop-blur-sm border border-white/25",
        },
        dark: {
            bg: "bg-gradient-to-br from-[#020617] via-[#111827] to-[#1f2937]",
            text: "text-slate-200",
            card: "bg-slate-900/60 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- DRIZZLE ----------------
    "patchy-light-drizzle": {
        light: {
            bg: "bg-gradient-to-b from-[#e6ecf3] via-[#d1d8e0] to-[#b4bcc6]",
            text: "text-slate-800",
            card: "bg-white/45 backdrop-blur-sm border border-white/15",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#1f2937] via-[#303a4a] to-[#465063]",
            text: "text-slate-200",
            card: "bg-slate-900/45 backdrop-blur-sm border border-white/5",
        },
    },

    "light-drizzle": {
        light: {
            bg: "bg-gradient-to-b from-[#e8edf3] via-[#d4dae2] to-[#bcc3cd]",
            text: "text-slate-800",
            card: "bg-white/45 backdrop-blur-sm border border-white/15",
        },
        dark: {
            bg: "bg-gradient-to-bl from-[#1c2533] via-[#263040] to-[#3f4857]",
            text: "text-slate-200",
            card: "bg-slate-900/45 backdrop-blur-sm border border-white/5",
        },
    },

    "freezing-drizzle": {
        light: {
            bg: "bg-gradient-to-tr from-[#e1e7ee] via-[#c6d0da] to-[#a9b3bf]",
            text: "text-slate-800",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-t from-[#182334] via-[#233043] to-[#3a4656]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "heavy-freezing-drizzle": {
        light: {
            bg: "bg-gradient-to-tl from-[#d7dfe8] via-[#bbc5d1] to-[#929cad]",
            text: "text-slate-800",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-br from-[#0f172a] via-[#1b2434] to-[#333e4f]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- RAIN (LIGHT / MODERATE / HEAVY) ----------------
    "patchy-light-rain": {
        light: {
            bg: "bg-gradient-to-b from-[#e2e8f0] via-[#cdd5de] to-[#aeb6bf]",
            text: "text-slate-800",
            card: "bg-white/45 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#1f2937] via-[#303a4a] to-[#485360]",
            text: "text-slate-200",
            card: "bg-slate-900/45 backdrop-blur-sm border border-white/5",
        },
    },

    "light-rain": {
        light: {
            bg: "bg-gradient-to-b from-[#dde5ee] via-[#c3cdd8] to-[#a1acb9]",
            text: "text-slate-800",
            card: "bg-white/45 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#1a2433] via-[#263344] to-[#44505e]",
            text: "text-slate-200",
            card: "bg-slate-900/45 backdrop-blur-sm border border-white/5",
        },
    },

    "moderate-rain-at-times": {
        light: {
            bg: "bg-gradient-to-b from-[#d6deea] via-[#b7c1cd] to-[#8f9aa8]",
            text: "text-slate-800",
            card: "bg-white/45 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#161f2e] via-[#243244] to-[#3a4656]",
            text: "text-slate-100",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "moderate-rain": {
        light: {
            bg: "bg-gradient-to-b from-[#cfd8e4] via-[#aeb8c7] to-[#8792a2]",
            text: "text-slate-900",
            card: "bg-white/45 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#141d2a] via-[#223144] to-[#374253]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "heavy-rain-at-times": {
        light: {
            bg: "bg-gradient-to-b from-[#c5ceda] via-[#a4aebc] to-[#7a8593]",
            text: "text-slate-900",
            card: "bg-white/40 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#101825] via-[#1d2838] to-[#323d4d]",
            text: "text-slate-100",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "heavy-rain": {
        light: {
            bg: "bg-gradient-to-b from-[#bcc5d2] via-[#949eac] to-[#6b7584]",
            text: "text-slate-900",
            card: "bg-white/40 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#0b1220] via-[#171f2c] to-[#2a3442]",
            text: "text-slate-100",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- FREEZING RAIN ----------------
    "light-freezing-rain": {
        light: {
            bg: "bg-gradient-to-b from-[#e3e9f1] via-[#c8d1dc] to-[#a8b2be]",
            text: "text-slate-800",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#182232] via-[#253141] to-[#3a4554]",
            text: "text-slate-100",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "moderate-or-heavy-freezing-rain": {
        light: {
            bg: "bg-gradient-to-b from-[#d4dde7] via-[#b2bcc8] to-[#8a94a3]",
            text: "text-slate-900",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#101722] via-[#1b2534] to-[#303a49]",
            text: "text-slate-100",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- SLEET ----------------
    "light-sleet": {
        light: {
            bg: "bg-gradient-to-b from-[#e0e6ef] via-[#c5ced8] to-[#a0a9b6]",
            text: "text-slate-800",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#181f2d] via-[#252f3c] to-[#3b4552]",
            text: "text-slate-100",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    "moderate-or-heavy-sleet": {
        light: {
            bg: "bg-gradient-to-b from-[#dfe6ef] via-[#c0c9d4] to-[#8c96a3]",
            text: "text-slate-900",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#161e2a] via-[#24303d] to-[#3e4854]",
            text: "text-slate-100",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- SNOW FAMILY ----------------
    "patchy-light-snow": {
        light: {
            bg: "bg-gradient-to-b from-[#f5f7fa] via-[#e4e9ef] to-[#cfd6dd]",
            text: "text-slate-800",
            card: "bg-white/55 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#1a1f2a] via-[#262f3a] to-[#3a4350]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "light-snow": {
        light: {
            bg: "bg-gradient-to-b from-[#f7f9fb] via-[#e6edf3] to-[#d1d9e0]",
            text: "text-slate-800",
            card: "bg-white/55 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#181e27] via-[#232b36] to-[#353e4a]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "patchy-moderate-snow": {
        light: {
            bg: "bg-gradient-to-b from-[#f3f6fa] via-[#dce4ec] to-[#c4ced7]",
            text: "text-slate-800",
            card: "bg-white/55 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#161c25] via-[#222b36] to-[#343e4a]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "moderate-snow": {
        light: {
            bg: "bg-gradient-to-b from-[#eef3f7] via-[#d7e0e8] to-[#bcc6d0]",
            text: "text-slate-800",
            card: "bg-white/55 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#141a23] via-[#1f2833] to-[#313b47]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "patchy-heavy-snow": {
        light: {
            bg: "bg-gradient-to-b from-[#f4f6f9] via-[#d8e0e8] to-[#bfc8d2]",
            text: "text-slate-800",
            card: "bg-white/60 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#0f141d] via-[#19212c] to-[#2d3642]",
            text: "text-slate-200",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    "heavy-snow": {
        light: {
            bg: "bg-gradient-to-b from-white via-[#e6edf3] to-[#cfd8e0]",
            text: "text-slate-800",
            card: "bg-white/65 backdrop-blur-sm border border-white/25",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#0b1018] via-[#161e28] to-[#2a3440]",
            text: "text-slate-200",
            card: "bg-slate-900/60 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- ICE PELLETS ----------------
    "ice-pellets": {
        light: {
            bg: "bg-gradient-to-b from-[#dfe6ef] via-[#c3ccd7] to-[#a1abb7]",
            text: "text-slate-900",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#131a24] via-[#212a36] to-[#37404c]",
            text: "text-slate-200",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- RAIN SHOWERS ----------------
    "light-rain-shower": {
        light: {
            bg: "bg-gradient-to-b from-[#e6ecf3] via-[#c5ced8] to-[#9faab7]",
            text: "text-slate-900",
            card: "bg-white/45 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#141c27] via-[#212b38] to-[#394554]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "moderate-or-heavy-rain-shower": {
        light: {
            bg: "bg-gradient-to-b from-[#d6dee8] via-[#aab4c1] to-[#7b8593]",
            text: "text-slate-900",
            card: "bg-white/45 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#0f141d] via-[#1e2733] to-[#323c49]",
            text: "text-slate-200",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    "torrential-rain-shower": {
        light: {
            bg: "bg-gradient-to-b from-[#c7d1db] via-[#9aa5b3] to-[#6c7684]",
            text: "text-slate-900",
            card: "bg-white/40 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#0a0f17] via-[#17212d] to-[#2c3643]",
            text: "text-slate-200",
            card: "bg-slate-900/60 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- SLEET SHOWERS ----------------
    "light-sleet-showers": {
        light: {
            bg: "bg-gradient-to-b from-[#e2e8f0] via-[#c4ced9] to-[#9fabb8]",
            text: "text-slate-800",
            card: "bg-white/45 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#141d28] via-[#22303d] to-[#36414f]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "moderate-or-heavy-sleet-showers": {
        light: {
            bg: "bg-gradient-to-b from-[#d5dce6] via-[#b3bcc8] to-[#8b95a3]",
            text: "text-slate-900",
            card: "bg-white/45 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#0f161f] via-[#1d2734] to-[#303a48]",
            text: "text-slate-200",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- SNOW SHOWERS ----------------
    "light-snow-showers": {
        light: {
            bg: "bg-gradient-to-b from-[#f4f6fa] via-[#dce4ec] to-[#c4ced7]",
            text: "text-slate-800",
            card: "bg-white/55 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#161c24] via-[#212a35] to-[#343e4a]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "moderate-or-heavy-snow-showers": {
        light: {
            bg: "bg-gradient-to-b from-[#f7f9fb] via-[#e1e8ef] to-[#c9d2db]",
            text: "text-slate-800",
            card: "bg-white/60 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#0f141c] via-[#1b232d] to-[#2e3743]",
            text: "text-slate-200",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- ICE PELLET SHOWERS ----------------
    "light-ice-pellet-showers": {
        light: {
            bg: "bg-gradient-to-b from-[#dde4ed] via-[#c0c9d4] to-[#9aa4b1]",
            text: "text-slate-900",
            card: "bg-white/45 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#131a23] via-[#23303d] to-[#36414f]",
            text: "text-slate-200",
            card: "bg-slate-900/50 backdrop-blur-sm border border-white/5",
        },
    },

    "moderate-or-heavy-ice-pellet-showers": {
        light: {
            bg: "bg-gradient-to-b from-[#d3dbe5] via-[#b2bcc8] to-[#8c96a5]",
            text: "text-slate-900",
            card: "bg-white/45 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#0e131b] via-[#1a232d] to-[#2d3743]",
            text: "text-slate-200",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- THUNDER WITH RAIN / SNOW ----------------
    "patchy-light-rain-with-thunder": {
        light: {
            bg: "bg-gradient-to-b from-[#dbe0e8] via-[#aeb8c7] to-[#76808e]",
            text: "text-slate-900",
            card: "bg-white/45 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#060a12] via-[#131b26] to-[#212b38]",
            text: "text-blue-100",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    "moderate-or-heavy-rain-with-thunder": {
        light: {
            bg: "bg-gradient-to-b from-[#cdd4de] via-[#969fb0] to-[#666f7e]",
            text: "text-slate-900",
            card: "bg-white/40 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#02040a] via-[#0f1724] to-[#1f2937]",
            text: "text-blue-100",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    "patchy-light-snow-with-thunder": {
        light: {
            bg: "bg-gradient-to-b from-[#eef2f7] via-[#d4dde8] to-[#bfc8d2]",
            text: "text-slate-800",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#0c121b] via-[#18212b] to-[#2c3642]",
            text: "text-blue-100",
            card: "bg-slate-900/55 backdrop-blur-sm border border-white/5",
        },
    },

    "moderate-or-heavy-snow-with-thunder": {
        light: {
            bg: "bg-gradient-to-b from-[#e6edf5] via-[#c7d2df] to-[#aab5c2]",
            text: "text-slate-900",
            card: "bg-white/50 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-b from-[#070b12] via-[#121a24] to-[#202a38]",
            text: "text-blue-100",
            card: "bg-slate-900/60 backdrop-blur-sm border border-white/5",
        },
    },

    // ---------------- FALLBACK ----------------
    default: {
        light: {
            bg: "bg-gradient-to-br from-[#bae6fd] via-[#7dd3fc] to-[#60a5fa]",
            text: "text-slate-800",
            card: "bg-white/40 backdrop-blur-sm border border-white/20",
        },
        dark: {
            bg: "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]",
            text: "text-slate-100",
            card: "bg-slate-900/40 backdrop-blur-sm border border-white/5",
        },
    },

};

// -------------------------------------------
// Normalize WeatherAPI condition text → slug
// Example: "Patchy rain possible" → "patchy-rain-possible"
// -------------------------------------------
export function normalizeSlug(text) {
    return text
        .toLowerCase()
        .replace(/,/g, "")
        .replace(/ /g, "-");
}

// -------------------------------------------
// Return correct theme based on weather + dark mode
// -------------------------------------------
export function getWeatherTheme(weather, darkMode) {
    if (!weather?.current?.condition?.text) {
        return weatherThemes.default[darkMode ? "dark" : "light"];
    }

    const slug = normalizeSlug(weather.current.condition.text);
    const theme = weatherThemes[slug] || weatherThemes.default;

    return theme[darkMode ? "dark" : "light"];
}

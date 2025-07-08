/** @types {import ('tailwind.css).Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    main: "#008B8B",
                    border: "B1D8D8",
                    surface: "EEFBF8",
                    pressed: "004545",
                    hover: "2A9E9E",
                    focus: "008B8B",
                },
                neutral: {
                    10: "#FFFFFF",
                    20: "#F5F5F5",
                    30: "#EDEDED",
                    40: "#E0E0E0",
                    50: "#C2C2C2",
                    60: "#9E9E9E",
                    70: "#757575",
                    80: "#616161",
                    90: "#404040",
                    100: "#0A0A0A"
                }
            },
            fontFamily: {
               pregular: ["PlusJakartaSans-Regular", "sans-serif"],
               pbold: ["PlusJakartaSans-Bold", "sans-serif"],
               pbolditalic: ["PlusJakartaSans-BoldItalic", "sans-serif"],
               pextrabold: ["PlusJakartaSans-ExtraBold", "sans-serif"],
               pextrabolditalic: ["PlusJakartaSans-ExtraBoldItalic", "sans-serif"],
               pextralight: ["PlusJakartaSans-ExtraLight", "sans-serif"],
               pextralightitalic: ["PlusJakartaSans-ExtraLightItalic", "sans-serif"],
               pitalic: ["PlusJakartaSans-Italic","sans-serif"],
               plight: ["PlusJakartaSans-Light", "sans-serif"],
               plightitalic: ["PlusJakartaSans-LightItalic", "sans-serif"],
               pmedium: ["PlusJakartaSans-Medium", "sans-serif"],
               pmediumitalic: ["PlusJakartaSans-MediumItalic", "sans-serif"],
               psemibold: ["PlusJakartaSans-SemiBold", "sans-serif"],
               psemibolditalic: ["PlusJakartaSans-SemiBoldItalic", "sans-serif"],
              },
        },
    },
    plugin: [],
}
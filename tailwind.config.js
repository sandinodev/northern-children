const defaultTheme = require("tailwindcss/defaultTheme");
const baseConfig = require("./tailwind.config.base.js");

module.exports = {
  presets: [baseConfig.preset],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: {
        DEFAULT: "#ffffff",
        greenish: "#f9faf7",
      },
      black: "#262626",
      blue: "var(--color-blue)",
      green: "var(--color-green)",
      red: "var(--color-red)",
      turquoise: "var(--color-turquoise)",
      yellow: "var(--color-yellow)",
      violet: "var(--color-violet)",
    },
    extend: {
      maxWidth: {
        container: "var(--max-w-container)",
      },
      zIndex: {
        "-1": -1,
        1: 1,
        footer: 20,
        donate: 900,
        menu: 999,
        header: 1000,
        intro: 9999,
      },
    },
    fontFamily: {
      alpina: ["Alpina", ...defaultTheme.fontFamily.sans],
      athletics: ["Athletics", ...defaultTheme.fontFamily.sans],
      era: {
        DEFAULT: ["ModernEra", ...defaultTheme.fontFamily.sans],
        mono: ["ModernEraMono", ...defaultTheme.fontFamily.mono],
      },
    },
    fontSize: {
      xs: [
        "var(--font-xs-size)",
        {
          lineHeight: "var(--font-xs-line)",
          letterSpacing: "var(--font-xs-letter)",
        },
      ],
      base: [
        "var(--font-base-size)",
        {
          lineHeight: "var(--font-base-line)",
          letterSpacing: "var(--font-base-letter)",
        },
      ],
      md: [
        "var(--font-md-size)",
        {
          lineHeight: "var(--font-md-line)",
          letterSpacing: "var(--font-md-letter)",
        },
      ],
      lg: {
        DEFAULT: [
          "var(--font-lg-size)",
          {
            lineHeight: "var(--font-lg-line)",
            letterSpacing: "var(--font-lg-letter)",
          },
        ],
        alpina: [
          "var(--font-lg-size)",
          {
            lineHeight: "var(--font-lg-line-alpina)",
            letterSpacing: "var(--font-lg-letter)",
          },
        ],
      },
      xl: [
        "var(--font-xl-size)",
        {
          lineHeight: "var(--font-xl-line)",
          letterSpacing: "var(--font-xl-letter)",
        },
      ],
      "2xl": [
        "var(--font-2xl-size)",
        {
          lineHeight: "var(--font-2xl-line)",
          letterSpacing: "var(--font-2xl-letter)",
        },
      ],
      max: [
        "var(--font-max-size)",
        {
          lineHeight: "var(--font-max-line)",
          letterSpacing: "var(--font-max-letter)",
        },
      ],
    },
  },
};

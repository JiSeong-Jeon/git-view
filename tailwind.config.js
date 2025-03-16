/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        header: {
          DEFAULT: "#ff7850", // 기본 헤더 색상
          light: "#ff9b7d", // 더 밝은 버전
          dark: "#e55a32", // 더 어두운 버전
        },
        primary: {
          50: "#fff5f2",
          100: "#ffe8e0",
          200: "#ffd0c2",
          300: "#ffb399",
          400: "#ff9470",
          500: "#ff7850", // 헤더 색상과 동일
          600: "#f86642",
          700: "#e85236",
          800: "#d4442d",
          900: "#b33a28",
          950: "#641c12",
        },
      },
    },
  },
  plugins: [],
};

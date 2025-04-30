/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                sm420: "420px",
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar-hide')
    ],
};

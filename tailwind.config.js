/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a', // Neutral 950
                primary: '#3EE710', // Exact Neon Green from logo
                text: '#FFFFFF', // Pure White
                surface: '#171717', // Neutral 900
            },
            fontFamily: {
                sans: ['Teko', 'sans-serif'],
                serif: ['Space Grotesk', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
        },
    },
    plugins: [],
}

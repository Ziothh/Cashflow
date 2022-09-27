/* eslint "@typescript-eslint/no-var-requires": "off" */
const {slate} = require("tailwindcss/colors")
// import {slate} from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                neutral: slate
            }
        },
        // colors: {
        // }
    },
    plugins: [
        require('@tailwindcss/forms')({
            
        }),
    ],
}
module.exports = config

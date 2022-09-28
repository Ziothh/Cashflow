// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

exports.default = plugin(({
    addBase,
    addComponents,
    addUtilities,
    addVariant,
    theme,
    config,
}) => {
    addComponents({
        ".btn": {
        }
    })
})
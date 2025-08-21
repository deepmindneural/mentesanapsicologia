module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      // Disable Lightning CSS in production/Docker
      lightningcss: false,
    },
    autoprefixer: {},
  },
}
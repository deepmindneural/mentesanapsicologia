module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      // Disable LightningCSS in Docker/production
      lightningcss: process.env.DISABLE_LIGHTNINGCSS !== 'true',
    },
    autoprefixer: {},
  },
}
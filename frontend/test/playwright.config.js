// playwright.config.js
// para ejecutar pruebas npx playwright test

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    headless: false, // Para ver la prueba en acción
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    baseURL:'http://localhost:3000',
  },
});
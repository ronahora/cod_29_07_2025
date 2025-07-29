const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      username: "standard_user",
      password: "secret_sauce"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: true,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: true,
      json: false,
      timestamp: "mmddyyyy_HHMMss"
    }
  },
});



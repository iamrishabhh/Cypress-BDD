const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;


module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
  },
  scrollBehavior: 'top',
  viewportHeight: 900,
  viewportWidth: 1200,
  video: true,
  videoCompression: false,
  videosFolder: 'cypress/videos'
  
});
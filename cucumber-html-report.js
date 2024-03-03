//*** Let name it cucumber-html-report.js **

const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "cypress/cucumber-json-report",  // ** Path of .json file **//
    reportPath: "./reports/cucumber-htmlreport.html",
    metadata: {
        browser: {
            name: "chrome",
            version: "121",
        },
        device: "Rishabh-PC",
        platform: {
            name: "Windows",
            version: "11",
        },
    },
});
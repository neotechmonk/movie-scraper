module.exports = require("./all-cinemas").default.bind(null, {
  states: ["ACT", "VIC", "SA", "WA", "NT", "NSW", "QLD"],
  puppeteer: require("puppeteer"),
  cinemasfromState: require("./cinemas-from-state").default
});

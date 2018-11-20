module.exports = require("./all-cinemas").default.bind(null, {
  puppeteer: require("puppeteer"),
  cinemasfromState: require("./cinemas-from-state").default
});

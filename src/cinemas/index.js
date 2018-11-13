module.exports = require("./allCinemas").bind(null, {
  puppeteer: require("puppeteer"),
  cinemasfromState: require("./cinemas-from-state")
});

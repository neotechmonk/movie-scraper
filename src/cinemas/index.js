module.exports = require("./all-cinemas").bind(null, {
  puppeteer: require("puppeteer"),
  cinemasfromState: require("./cinemas-from-state")
});

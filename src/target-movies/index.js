module.exports = require("./unbound").bind(null, {
  puppeteer: require("puppeteer"),
  cinemasFn: require("../cinemas"),
  dailyScraperFn: require("../scrape-daily"),
  R: require("ramda")
});

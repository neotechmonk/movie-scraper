module.exports = require("./unbound").bind(null, {
  puppeteer: require("puppeteer"),
  dailyScraperFn: require("../scrape-daily"),
  R: require("ramda")
});

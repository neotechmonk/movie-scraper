module.exports = require("./unbound").bind(null, {
  puppeteer: require("puppeteer"),
  cinemasFn: require("../cinemas"),
  targetMoviesFn : require("../target-movies"),
  dailyScraperFn: require("../scrape-daily"),
  R: require("ramda")
});

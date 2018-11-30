module.exports = require("./unbound").bind(null, {
  targetMoviesFn:require("../target-movies"),
  cinemasFn:  require("../cinemas"), //TODO replace with a function that retrieves data from DB? 
  batchScrapeFn: require("../scrape-batch"),
  normaliserFn: require("../normalise-results"),
  saveDataFn: require("../database-crud"),
  R:  require("ramda")
});

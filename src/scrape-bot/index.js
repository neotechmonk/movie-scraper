module.exports = require("./unbound").bind(null, {
  batchScrapeFn: require("../scrape-batch"),
  normaliserFn: require("../normalise-results"),
  saveDataFn: require("../save-sessions-in-database")
});

module.exports = require("./unbound").bind(null, {
  moviesFn: require("../movies"),
  sessionsFn: require("../sessions"),
  urlFn: require("../url"),
  R: require("ramda")
});

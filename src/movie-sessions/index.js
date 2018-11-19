module.exports = require("./unbound").bind(null, {
  getSessionFn: require("./movie-session"),
  helper: require("../helpers/helpers")
});

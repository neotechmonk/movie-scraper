module.exports = require("./unbound").bind(null, {
  mongoose: require("mongoose"),
  url: require("../helpers/helpers").setting("DB_URI_DEV")
});

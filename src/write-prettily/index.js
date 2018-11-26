module.exports = require("./unbound").bind(null, {
  R: require("ramda"),
  fs: require("fs")
});

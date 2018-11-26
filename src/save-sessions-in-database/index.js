module.exports = require("./unbound").bind(null, {
  dbConnection: require("../database")
});

module.exports = require("./unbound").bind(
  null,
  {
    mongoose: require("mongoose"),
    dbConnection: require("../database")
  },
  {
    Movie: require("./model.Movie"),
    Cinema: require("./model.Cinema"),
    Session: require("./model.Session")
  }
);

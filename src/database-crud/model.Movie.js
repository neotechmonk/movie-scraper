const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

//Movie
const movie = new Schema({
  movieID: Number,
  movieTitle: String,
  created: {
    type: Date,
    default: Date.now,
    select: false
  },
  updated: {
    type: Date,
    default: Date.now,
    select: false
  },
  cinemas: [require("./model.Cinema").schema]
});
// // Define  indexes

module.exports = mongoose.model("Movie", movie);

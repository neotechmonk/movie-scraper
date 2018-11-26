const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Movie
const movie = new mongoose.Schema({
  movieID: Number,
  movieTitle: String,
  cinemas: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Cinema"
    }
  ],
  created: {
    type: Date,
    default: Date.now,
    select: false
  },
  updated: {
    type: Date,
    default: Date.now,
    select: false
  }
});
// // Define  indexes

module.exports = mongoose.model("Movie", movie);

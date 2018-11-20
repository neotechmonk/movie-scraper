const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Movie
const movieSession = new mongoose.Schema({
  movieID: Number,
  movieTitle: String,
  cinemaID: Number,
  cinemaState: String,
  cinemaName: String,
  sessionID: Number,
  sessionDateTime: Date,
  sessionSeatsLeft: Number,
  sessionSeatsStockTaken: {
    type: Date,
    default: Date.now,
    select: false
  },
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
// Export the model
module.exports = mongoose.model("MovieSession", movieSession);

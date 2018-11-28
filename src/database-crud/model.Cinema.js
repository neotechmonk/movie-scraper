const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Movie
const cinema = new mongoose.Schema({
  cinemaID: Number,
  cinemaState: String,
  cinemaName: String,
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
  sessions: [require("./model.Session").schema]
});
// // Define  indexes

module.exports = mongoose.model("Cinema", cinema);

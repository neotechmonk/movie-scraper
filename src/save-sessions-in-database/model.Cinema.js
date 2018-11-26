const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Movie
const cinema = new mongoose.Schema({
  cinemaID: Number,
  cinemaState: String,
  cinemaName: String,
  sessions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Session"
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

module.exports = mongoose.model("Cinema", cinema);

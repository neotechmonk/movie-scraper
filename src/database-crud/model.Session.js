const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Movie
const session = new mongoose.Schema({
  sessionID: Number,
  sessionDateTime: Date,
  seatsLeft: Number,
  sessionSeatsAuditedOn: {
    type: Date,
    default: Date.now,
    select: false
  },
  sessionBookingURL: String,
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
module.exports = mongoose.model("Session", session);

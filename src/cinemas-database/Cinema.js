const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let cinemaSchema = new Schema({
  ID: { type: Number, required: true },
  state: { type: String, required: true },
  name: { type: String, required: true },
  URL: { type: String, required: false },
  address: String,
  parkingIntruction: String,
  added: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }

});
// // Define  indexes
cinemaSchema.methods.alreadyExists= function(cb) {
  this.model('Cinema').findOne({
      name: this.name
  }, function(err, val) {
      cb(!!val);
  });
};
module.exports = mongoose.model("Cinema", cinemaSchema);

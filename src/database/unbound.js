module.exports = ({ mongoose: mongoose }, url) => {
  mongoose.Promise = global.Promise;
  return mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
};

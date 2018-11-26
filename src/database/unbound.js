module.exports = async ({ mongoose }, url) => {
  //connect of state === disconnected
  if (mongoose.connection.readyState == !1) {
    mongoose.Promise = global.Promise;
    await mongoose.connect(
      url,
      { useNewUrlParser: true }
    );
  }

  console.log(
    mongoose.connection.readyState === 1
      ? "DB : connected"
      : "DB : not connected"
  );

  return mongoose.connection;
};

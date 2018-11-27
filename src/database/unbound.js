module.exports = async ({ mongoose, url }) => {
  //connect of state === disconnected
  if (mongoose.connection.readyState == !1) {
    mongoose.Promise = global.Promise;
    let errorMessage = "";
    try {
      await mongoose.connect(
        url,
        { useNewUrlParser: true }
      );
    } catch (error) {
      errorMessage = error.message;
    } finally {
      console.log(
        mongoose.connection.readyState === 1
          ? `DB : connected @ ${mongoose.connection.host}:${
              mongoose.connection.port
            } - DB :  ${mongoose.connection.name} `
          : `DB : not connected : ${errorMessage}`
      );
    }
  }

  return mongoose.connection;
};

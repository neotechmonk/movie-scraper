(async () => {
  const dbconnect = require("./unbound");
  const mongoose = require("mongoose");

  await dbconnect(
    { mongoose: mongoose },
    require("../helpers/helpers").setting("DB_URI_DEV")
  );
  console.log(
    mongoose.connection.readyState === 1 ? "DB : connected" : "DB : not connected"
  );
  /*
  readyStates are 
        0: disconnected
        1: connected
        2: connecting
        3: disconnecting
 */
})();

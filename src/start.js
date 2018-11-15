// import environmental variables from our variables.env file
import {
  isDevelopmentMode as isDev,
  getEnvironmentSetting as setting
} from "./helpers/helpers";
const dbConnect = require("./database");

//Connect to DB based on DEV vs PRO runing mode
const dbConneciton = isDev()
  ? dbConnect(setting("DB_URI_DEV"))
  : dbConnect(setting("DB_URI_PROD"));

import * as helpers from "./helpers";

console.log(
  (key => {
    return `Setting for ${key} : ${helpers.getEnvironmentSetting(key)}`;
  })("PORT")
);

console.log(`DEV Mode ?, ${helpers.isDevelopmentMode()}`);

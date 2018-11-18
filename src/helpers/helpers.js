//@Theepan Thevathasan
//Helper functions

require("dotenv").config();

export function isDevelopmentMode() {
  return getAppMode() === "DEV";
}
function getAppMode() {
  const appMode = process.env.NODE_ENV.toLowerCase();
  switch (true) {
    case !appMode:
      console.log(
        "!!!!! Application mode not defined in .env file / web server"
      );
      return "Undefined";
      break;

    case appMode.toLowerCase().includes("prod"):
      return "PROD";
    case appMode.toLowerCase().includes("dev"):
      return "DEV";
  }
}
function getEnvironmentSetting(key) {
  return process.env[key] || "";
}

export function DOMSelectorBuilder({ template, parameters }) {
  parameters.forEach(element => {
    template = template.replace(element.key, element.value);
  });

  return template;
}

const evaluateDOM = ({ page }) => page.evaluate((sel, ses));

const getDOMElementAttribute = ({ document }, selector, attribute) =>
  document.querySelector(selector).getAttribute(attribute);

export {
  getDOMElementAttribute as attribute,
  getEnvironmentSetting as setting
};

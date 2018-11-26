module.exports = require("./unbound").bind(null, {
  puppeteer: require("puppeteer"),
   R: require("ramda")
});

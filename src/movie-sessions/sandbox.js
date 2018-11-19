(async () => {
  const page = await require("puppeteer")
    .launch({ headless: true })
    .then(browser => browser.newPage());

  const helpers = require("../helpers/helpers");

  await page.setRequestInterception(true);
  page.on("request", req => {
    if (
      req.resourceType() === "image" ||
      req.resourceType() === "stylesheet" ||
      req.resourceType() === "font"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const url =
    "https://www.eventcinemas.com.au/Sessions#movies=12326&date=2018-11-20&cinemas=68,64,58,65";
  await page.goto(url);
  const res = await require("./unbound")({ helper: helpers }, page, 3);
  console.log(res);
  await page.close();
})();

(async () => {
  const page = await require("puppeteer")
    .launch({ headless: false })
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
    "https://www.eventcinemas.com.au/Sessions#movies=13122&date=2018-11-27&cinemas=66";
  await page.goto(url);
  const res = await require("./unbound")({ helper:helpers }, { page: page }, 13122);
  console.log(res);
  //  await page.close();
})();

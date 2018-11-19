(async () => {
  const page = await require("puppeteer")
    .launch({ headless: true })
    .then(browser => browser.newPage());

  const helpers = require("../helpers/helpers");
  const getSessionFn = require("./movie-session");
  const url =
    "https://www.eventcinemas.com.au/Sessions#movies=12326&date=2018-11-20&cinemas=68,64,58,65";
  await page.goto(url);
  const res = await require("./unbound")(
    { helper: helpers, getSessionFn: getSessionFn },
    page,
    3
  );
  console.log(res);
  await page.close();
})();

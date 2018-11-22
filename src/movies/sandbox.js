(async () => {
  const page = await require("puppeteer")
    .launch({ headless: true })
    .then(browser => browser.newPage());

  
  await page.setRequestInterception(true);
  page.on("request", req => {
    if (
      req.resourceType() === "image" ||
      //  req.resourceType() === "stylesheet" ||  // stylesheet is needed to if class=evohide (hidden movies) is to be used to filter
      req.resourceType() === "font"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const url =
    "https://www.eventcinemas.com.au/Sessions#date=2018-11-22&cinemas=68,64,58,65&movies=12258,12334,12266,12436,12326,12336";
  await page.goto(url);
  const res = await require("./unbound")({ page });
  console.log(res);
  await page.close();
})();

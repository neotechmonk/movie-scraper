import { default as batchScrape } from "./unbound";

import { default as cinemas } from "../cinemas";
const movies = require("../movies");
const sessions = require("../sessions");
const helper = require("../helpers/helpers");
const url = require("../url");
const puppeteer = require("puppeteer");


(async () => {
  const page = await puppeteer
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
  //
  // Get all cinemas
  const STATES = ["ACT", "VIC", "SA", "WA", "NT", "NSW", "QLD"];
  //const _cinemas = await cinemas(STATES);

  const res = await batchScrape(
    { page: page, moviesFn: movies, sessionsFn: sessions, urlFn: url },
    new Date(2018, 10, 24),10,
    [12334, 12266, 12436],
    5
  );

  //console.log(`Result is ${JSON.stringify(res, null, 2)}`);
   
  // require("../write-prettily")({ fs: require("fs") }, "output", "jsonFile.json", res)

    await page.close();
})();

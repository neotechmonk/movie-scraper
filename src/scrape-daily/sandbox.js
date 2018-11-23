import { default as scrape } from "./unbound";

import { default as cinemas } from "../cinemas";
const movies = require("../movies");
const sessions = require("../movie-sessions");
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

  const res = await scrape(
    { page: page, moviesFn: movies, sessionsFn: sessions, urlFn: url },
    new Date(2018, 10, 24),
    [ "13", "73", "88", "54", "87" , "22", "71", "17", "72", "18", "90", "43", "42", "91", "68", "64", "58", "65", "53", "36", "67", "5", "15", "21", "62", "7", "85", "35", "19", "55", "82", "75", "10", "66", "63", "69", "9", "11", "24", "59", "29", "44", "61", "89", "30", "28", "56", "33", "92", "49", "48", "25", "93", "79", "39", "50", "38", "74", "31", "77", "86", "23", "34", "47", "83", "26", "78", "52", "37", "81", "40" ],
    [12334, 12266, 12436],
    5
  );

   console.log(`Result is ${JSON.stringify(res, null, 2)}`);
   
   require("../write-prettily")({ fs: require("fs") }, "output", "jsonFile.json", res)

    await page.close();
})();

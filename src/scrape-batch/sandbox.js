import { default as batchScrape } from "./unbound";

import { default as cinemas } from "../cinemas";

(async () => {
  const res = await batchScrape(
    {
      puppeteer: require("puppeteer"),
      cinemasFn: require("../cinemas"),
      dailyScraperFn: require("../scrape-daily"),
      R: require("ramda")
    },
    new Date(2018, 10, 24),
    10,
    [12334, 12266, 12436],
    5
  );

  console.log(`Result is ${JSON.stringify(res, null, 2)}`);

  // require("../write-prettily")({ fs: require("fs") }, "output", "jsonFile.json", res)

  
})();

import { default as batchScrape } from "./unbound";


(async () => {
  const res = await batchScrape(
    {
      puppeteer: require("puppeteer"),
      cinemasFn: require("../cinemas"),
      targetMoviesFn : require("../target-movies"),
      dailyScraperFn: require("../scrape-daily"),
      R: require("ramda")
    },
    new Date(2018, 10, 25),
    10,
    5
  );

  console.log(`Result is ${JSON.stringify(res, null, 2)}`);

  // require("../write-prettily")({ fs: require("fs") }, "output", "jsonFile.json", res)

  
})();

import { default as batchScrape } from "./index";

(async () => {
  const res = await batchScrape(new Date(2018, 11, 7), 10, 5, [12755], [58,53,62,85,19,66,69]);

  console.log(`Result is ${JSON.stringify(res, null, 2)}`);

  // require("../write-prettily")({ fs: require("fs") }, "output", "jsonFile.json", res)
})();

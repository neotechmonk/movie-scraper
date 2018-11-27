import { default as batchScrape } from "./index";

(async () => {
  const res = await batchScrape(new Date(2018, 10, 25), 10, 5);

  console.log(`Result is ${JSON.stringify(res, null, 2)}`);

  // require("../write-prettily")({ fs: require("fs") }, "output", "jsonFile.json", res)
})();

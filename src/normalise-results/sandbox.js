import { default as normalise } from "./index";
import { default as batchScraper } from "../scrape-batch";
(async () => {
  const denormalised = await batchScraper(new Date(2018, 10, 26), 10, 5);

  const normalised = normalise( denormalised);
  require("../write-prettily")("output\\", "jsonFile.json", normalised);
  //console.log(`Result is ${JSON.stringify(normalised, null, 2)}`);
})();

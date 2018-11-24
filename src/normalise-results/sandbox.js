import { default as normalise } from "./unbound";
import { default as scraper } from "../scrape-batch";
(async () => {
  const denormalised = await scraper(
    new Date(2018, 10, 25),
    10,
    [12334, 12266, 12436],
    5
  );
  

   const normalised = normalise(denormalised);
   
  console.log(`Result is ${JSON.stringify(normalised, null, 2)}`);
})();

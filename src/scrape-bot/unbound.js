/*
Orchestrates scraping and saving of the data

Input :none
Output : event logging with parameters used

Flow
1. Setup parameters for scrape
2. Scrape
3. Normalise data
4. Sotre in Mongo


*/

module.exports = async ({ batchScrapeFn, normaliserFn, saveDataFn }) => {
  //Setup parameters
  const sessionStartDate = new Date(Date.now());
  const daysToScrape = 15;
  const maxCinemastoScrapePerCycle = 15;

  console.log(
    `*Starting to scrape Event Ciemas from  ${sessionStartDate} for ${daysToScrape} day/s`
  );
  // Scrape
  const denormalisedData = await batchScrapeFn(
    sessionStartDate,
    daysToScrape,
    maxCinemastoScrapePerCycle
  );

  //Normalise Data
  const normalisedData = normaliserFn(denormalisedData);

  console.log(
    `****Found ${normalisedData.length} movies with ${
      denormalisedData.length
    } sessions`
  );

  //Save data in the DB
  console.log(`****About to save in the Database`);
  try {
    saveDataFn(normalisedData).then(res => {
      console.log(`*********Successfully saved in  the database`);

      console.log(`*Quiting the function`);
    });
  } catch (e) {
    console.log(`*********Failed to save in the database`);
  }
};

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

module.exports = async ({
  targetMoviesFn,
  batchScrapeFn,
  normaliserFn,
  saveDataFn,
  R
}) => {
  //Setup parameters
  let sessionStartDate = new Date(Date.now());
  const daysToScrape = 15;
  const maxCinemastoScrapePerCycle = 15;
  let sessionEndDate = new Date(Date.now());
  sessionEndDate = sessionEndDate.setDate(
    sessionEndDate.getDate() + daysToScrape
  );

  console.log(
    `*Starting to scrape Event Ciemas from  ${sessionStartDate} for ${daysToScrape} day/s
    ${sessionEndDate}`
  );

  //Get Target movies and their cinemas

  //TODO only scrape movies whose firstrelease date >= last scrape date
  const targetMovies = await targetMoviesFn(
    "https://www.eventcinemas.com.au/EventsFestivals/Bollywood"
  );
  const cinemaList = R.uniq(
    R.flatten(targetMovies.map(({ cinemas }) => cinemas))
  );
  const movieList = R.uniq(targetMovies.map(({ movieID }) => Number(movieID)));

  console.log(`****Retrieved ${movieList.length} Target movies to scrape`);

  console.log(`****About to scrape movies - this will take time....`);
  // Scrape
  const denormalisedData = await batchScrapeFn(
    sessionStartDate,
    daysToScrape,
    maxCinemastoScrapePerCycle,
    movieList,
    cinemaList
  );

  //Normalise Data
  const normalisedData = normaliserFn(denormalisedData);

  console.log(
    `****Found ${normalisedData.length} movies with ${
      denormalisedData.length
    } sessions`
  );

  //TODO inject movie details from TargetMoviesFn

  //TODO inject cinema details from AllCinemasFn

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

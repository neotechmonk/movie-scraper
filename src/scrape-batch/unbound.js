/*
Orchestrates scraping using other modules for a period 
Output : 
[{
  movies:  {
    sessions{
      cinema-info
      session-info
    }
  }
}]
Input: @startDate, number of days to from @startDate,  movies, max cinemas per request
Dependencies : @movies, @movie-sessions, @cinemas,  @url, @ramda
Flow : 
  1. Get all cinemas
  2. Scrape
    2.1 get session for each day 
  3. Compose output
*/

module.exports = async (
  { puppeteer, cinemasFn,  dailyScraperFn, R},
  startDate,
  days,
  movieList,
  limit = 10
) => {
  // Puppeteer stuff
const page = await puppeteer
.launch({ headless: true })
.then(browser => browser.newPage());

let results = [];

// Get all cinemas
const cinemas = await cinemasFn( ["ACT", "VIC", "SA", "WA", "NT", "NSW", "QLD"]);

  days += 1;
  
  while (--days) {
    startDate.setDate(startDate.getDate() + 1);
    const res = await dailyScraperFn(page , startDate, (cinemas.map(({cinemaID}) => cinemaID )), movieList, limit);
    results = R.concat(results, res)
      }

  await page.close();

  return results;
};

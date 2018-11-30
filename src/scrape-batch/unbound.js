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
  { puppeteer, dailyScraperFn, R },
  startDate,
  days,
  cinemaLimit = 10,
  movieList,
  cinemaList
) => {
  // Puppeteer stuff
  const page = await puppeteer
    .launch({
      args: ["--no-sandbox"]
    })
    .then(browser => browser.newPage());

  await page.setRequestInterception(true);
  page.on("request", req => {
    if (
      req.resourceType() === "image" ||
      //req.resourceType() === "stylesheet" ||  // stylesheet is needed to if class=evohide (hidden movies) is to be used to filter
      req.resourceType() === "font"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  let results = [];

  days += 1;

  while (--days) {
    startDate.setDate(startDate.getDate() + 1);
    const res = await dailyScraperFn(
      page,
      startDate,
      cinemaList,
      movieList,
      cinemaLimit
    );
    results = R.concat(results, res);
  }

  await page.close();

  return results;
};

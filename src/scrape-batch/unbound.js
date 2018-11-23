/*
Orchestrates scraping using other modules for a given dat
Output : 
[{
  movies:  {
    sessions{
      cinema-info
      session-info
    }
  }
}]
Input: date, movies, max cinemas per request
Dependencies : @movies, @movie-sessions, @cinemas,  @url, @ramda
Flow : 
  1. Get all cinemas
  2. Scrape
    2.1 create URL
    2.2 get movies
    2.3 get session for each movie
  3. Compose output
*/


const scraper = require("../scrape-daily")
module.exports = async (
  { page, dailyScraperFn, R = require("ramda") },
  startDate,
  days,
  movieList,
  limit = 10
) => {
  let results = []; //place holder to

  let index = 0;
  days += 1;
  while (--days) {
    startDate.setDate(startDate.getDate() + 1);
    scraper({page: null}, )
    console.log(startDate);
  }
  return results;
};

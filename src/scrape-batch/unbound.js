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

const scraper = require("../scrape-daily");
module.exports = async (
  { page, dailyScraperFn, R = require("ramda") },
  startDate,
  days,
  movieList,
  limit = 10
) => {
  
  let results = [];
const cinemaList=  [ "13", "73", "88", "54", "87" , "22", "71", "17", "72", "18", "90", "43", "42", "91", "68", "64", "58", "65", "53", "36", "67", "5", "15", "21", "62", "7", "85", "35", "19", "55", "82", "75", "10", "66", "63", "69", "9", "11", "24", "59", "29", "44", "61", "89", "30", "28", "56", "33", "92", "49", "48", "25", "93", "79", "39", "50", "38", "74", "31", "77", "86", "23", "34", "47", "83", "26", "78", "52", "37", "81", "40" ]
  let index = 0;
  days += 1;
  while (--days) {
    startDate.setDate(startDate.getDate() + 1);
    const res = await dailyScraperFn(page , startDate, cinemaList, movieList, limit);
    results = R.concat(results, res)
    console.log(results.length);
    console.log(startDate);
  }
  return results;
};

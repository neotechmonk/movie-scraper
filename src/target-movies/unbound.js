/*
Gets all 
Output : 
[{
  movies:  {
    movieID,
    movieCode, //Will have Lang Id if movie is multiling E.g.2-0-TAMIL
    movieTitle,
    cinemasRunningIn : [],
    releaseDate,
    firstSessionDate,
    language //inferred from attributes from the cinema
    }
  }
}]
Input: @url
Dependencies : @puppetteer, @ramda
Flow : 
  1. Get all cinemas
  2. Scrape
    2.1 get session for each day 
  3. Compose output
*/

module.exports = async ({ puppeteer, R }, url) => {
  const SELECTOR =
    "body > div.body-content > div > div > div.movie-data > div.movie-list > div > div.movie-container-item.split-content";
  const LANGUAGES = [
    "tamil",
    "hindi",
    "punjabi",
    "malayalam",
    "telugu",
    "marati",
    "sinhala"
  ];
  // Puppeteer stuff
  const page = await puppeteer
    .launch({ headless: true })
    .then(browser => browser.newPage());

  await page.setRequestInterception(true);
  page.on("request", req => {
    if (
      req.resourceType() === "image" ||
      //  req.resourceType() === "stylesheet" ||  // stylesheet is needed to if class=evohide (hidden movies) is to be used to filter
      req.resourceType() === "font"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(url);

  const movies = await page.$$eval(
  SELECTOR,
    nodes =>
      nodes.map(element => {
        return {
          movieID: element.getAttribute("data-id"),
          movieCode: element.getAttribute("data-moviecode"),
          movieTitle: element.getAttribute("data-name"), //TODO convert to Date object
          cinemas: element.getAttribute("data-cinemas").replace(/\"/g, "").split(",").map(Number), // convert ["66, 55"] =>  [66, 55]
          releaseDate: element.getAttribute("data-release"),
          firstSessionDate: element.getAttribute("data-firstsession"),
          language: JSON.parse(element.getAttribute("data-attributes")).filter(
            x => ["tamil","hindi","punjabi","malayalam","telugu","marati","sinhala"].includes(x.toLowerCase()) // refactor by passing languages as an argument 
          )
        };
      } )    
  );

   return movies;
};

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
  const LANGUAGES = ["tamil", "hindi"];
  // Puppeteer stuff
  const page = await puppeteer
    .launch({ headless: false, args: ["--no-sandbox"] })
    .then(browser => browser.newPage());

  await page.setRequestInterception(true);
  page.on("request", req => {
    if (
      // req.resourceType() === "image" ||
      //req.resourceType() === "stylesheet" || // stylesheet is needed to if class=evohide (hidden movies) is to be used to filter
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
      nodes.map(el => {
        console.log("++++++++++++");
        console.log(this.LANGUAGES);
        console.log("-------------");
        const movie = {
          movieID: el.getAttribute("data-id"),
          movieCode: el.getAttribute("data-moviecode"),
          movieTitle: el.getAttribute("data-name"),
          movieSynopsis: el.querySelector(
            "div.movie-list-detail.dynamic>div.synopsis"
          ).innerText,
          posterURL: el
            .querySelector(
              "div.movie-thumb-wrapper.fixed > a > div.movie-thumb > img"
            )
            .getAttribute("data-src"),
          cinemas: el
            .getAttribute("data-cinemas")
            .replace(/\"/g, "")
            .split(",")
            .map(Number), // convert ["66, 55"] =>  [66, 55]
          releaseDate: el.getAttribute("data-release"),
          firstSessionDate: el.getAttribute("data-firstsession"),
          language: JSON.parse(el.getAttribute("data-attributes")).filter(
            x =>
              [
                "hindi",
                "bengali",
                "marathi",
                "marati",
                "telugu",
                "tamil",
                "gujarati",
                "urdu",
                "kannada",
                "odia",
                "malayalam",
                "punjabi",
                "assamese",
                "maithili",
                "bhili",
                "santali",
                "kashmiri",
                "gondi",
                "nepali",
                "sindhi",
                "dogri",
                "konkani",
                "kurukh",
                "khandeshi",
                "tulu",
                "meitei",
                "bodo",
                "khasi",
                "ho",
                "mundari",
                "garo",
                "tripuri",
                "manipuri",
                "bhilodi",
                "sinhala"
              ].includes(x.toLowerCase()) // refactor by passing languages as an argument
          )
        };
        return movie;
      }),
    LANGUAGES
  );
  page.close();
  console.log('before exit ');
  return movies;
};

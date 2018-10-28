const puppeteer = require("puppeteer");

/*Generic proforma function to scrape movies from 
 Custome implementations can be done and function  names could be passed when called
*/
export async function scrapeMoviesGeneric({ URL = null, elementPath = null }) {
  if (!elementPath || !URL) {
    throw new Error(
      `Arguments URL and elementPath must be passed into the function `
    );
  }

  console.log(
    `Looking up movies on   ${URL} \n at elemnent path : ${elementPath} \n`
  );

  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(URL);
    await page.waitForSelector(elementPath);

    const movies = await page.evaluate(elementPath => {
      return (movieTitles = Array.from(
        document.querySelectorAll(elementPath)
      ).map(movie => movie.innerText.trim()));
    }, elementPath);

    //console.log(`Titles found:  ${movies}`);
    return movies
  } catch (error) {
    throw new Error(`Erro occured in scraping for movie titles ${error}`);
  } finally {
    await browser.close();
  }
}

//Config for target sites to scrape info from

const targets = [
  {
    site: "Event",
    URL: "https://www.eventcinemas.com.au/EventsFestivals/Bollywood",
    function: "scrapeMoviesGeneric",
    element: "div.movie-container.list-view span.title"
  },

  {
    site: "Village",
    URL: "https://villagecinemas.com.au/events/indian-cinema",
    function: "scrapeMoviesGeneric",
    element: "ul.slider-list li.theme div.movie-name"
  }
];

//test method to coordinate scraping movie titles from multiple sources
scrallAllTargets();

async function scrallAllTargets() {
  const scraperPromises = [];

  for (const target of targets) {
    const scraperFunction = `${target["function"]}({ URL: "${
      target.URL
    }", elementPath: "${target.element}"})`;

    scraperPromises.push(eval(scraperFunction));
  }

  await Promise.all(scraperPromises).then (movieTitles => console.log(movieTitles));
}


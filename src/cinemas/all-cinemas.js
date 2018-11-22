export default async function allCinemas(
  { puppeteer, cinemasfromState },
  states
) {
    const cinemaDetails = [];
  const page = await puppeteer
    .launch({
      handleSIGINT: true /*devtools: false,headless: true*/
    })
    .then(browser => browser.newPage());

  //block images, CSS to speed up load time
  await page.setRequestInterception(true);

  page.on("request", req => {
    if (
      req.resourceType() === "image" ||
      req.resourceType() === "stylesheet" ||
      req.resourceType() === "font"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto("https://www.eventcinemas.com.au");
  await page.waitFor(500);

  //close the popup modal to select cinemas and movies
  for (const state of states) {
    const res = await cinemasfromState(page, state);
    cinemaDetails.push(...res);
  }
  await page.close();

  return Promise.resolve(cinemaDetails);
}

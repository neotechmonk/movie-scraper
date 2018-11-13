export default async function allCinemas({ puppeteer, cinemasfromState, states}) {
  
  const cinemaDetails = [];
  const MODAL_BUTTON_CLOSE_SELECTOR =
    "body > header > div.fave-wrapper.open > div.fave-modal > span.close";
  const page = await puppeteer
    .launch({
      handleSIGINT: true /*devtools: false,headless: true*/
    })
    .then(browser => browser.newPage());

  //await page.setViewport({ width: 1366, height: 735 }); //form factor - laptop/PC
  await page.goto("https://www.eventcinemas.com.au");
  await page.waitFor(1000);

  //close the popup modal to select cinemas and movies
  await page.$eval(MODAL_BUTTON_CLOSE_SELECTOR, elem => elem.click());
  for (const state of states) {
    const res = await cinemasfromState(page, state);
    res.forEach(cin => {
      //cin.cinemaState = state;
      cinemaDetails.push(cin);
    });
  }
  await page.close();

  return cinemaDetails;
}


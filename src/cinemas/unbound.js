async function allCinemas({ puppeteer, states }) {
  const cinemaDetails = [];
  const MODAL_BUTTON_CLOSE_SELECTOR =
    "body > header > div.fave-wrapper.open > div.fave-modal > span.close";
  const page = await puppeteer
    .launch({
      handleSIGINT: true /*devtools: false,headless: true*/
    })
    .then(browser => browser.newPage());

  await page.setViewport({ width: 1366, height: 735 }); //form factor - laptop/PC
  await page.goto("https://www.eventcinemas.com.au");
  await page.waitFor(1000);

  //close the popup modal to select cinemas and movies
  await page.$eval(MODAL_BUTTON_CLOSE_SELECTOR, elem => elem.click());
  for (const state of states) {
    const res = await getCinemasfromState(page, state);
    res.forEach(cin => {
      //cin.cinemaState = state;
      cinemaDetails.push(cin);
    });
  }
  await page.close();

  return cinemaDetails;
}

async function cinemasfromState(page, state) {
  const CINEMA_STATE_SELECTOR = `div.top-select div.slider span.state[data-state-selector=$[STATE]]`;
  const CINEMA_SELECTOR = `div[data-state=$[STATE]] div.top-select-option a.eccheckbox`;

  await page.click(CINEMA_STATE_SELECTOR.replace("$[STATE]", state));

  let res = await page.evaluate(
    (elementPath, state) => {
      let results = Array.from(document.querySelectorAll(elementPath)).map(
        function(cin, index) {
          let result = {
            cinemaState: this.state,
            cinemaId: cin.getAttribute("data-id"),
            cinemaName: cin.getAttribute("data-name"),
            cinemaURL: cin.getAttribute("data-url")
          };
          return result;
        },
        { state }
      );

      let deDupedRes = [
        ...results.reduce((a, c) => a.set(c.cinemaId, c), new Map()).values()
      ]; // ? hack why this doesnt work res.reduce((a, c) => Object.assign(a, { [c.cinemaURL]: c }),{});

      return deDupedRes;
      // TODO try cinemaId[... names.reduce((a,c)=>(a.set(c.name,c)),new Map).values()]
    },
    CINEMA_SELECTOR.replace("$[STATE]", state),
    state
  );

  return res;
}

/*
.filter(function(cin, index, cinemas) {
      return cinemas.indexOf(cin) === index;
    });
    */
export { allCinemas, cinemasfromState };

  const puppeteer = require("puppeteer");

(async () => {
  const STATES = ["ACT", "NSW", "QLD", "VIC", "SA", "WA", "NT"];
  const browser = await puppeteer.launch({
    handleSIGINT: true,
    devtools: false
  });

  //Traverse through every state individuallly - this overcomes Event Cinemas reponsiveness issues when all cinemas are select at once
  for (const state of STATES) {
          console.log(`Cinemas in ${state}`);
          const page = await browser.newPage();

          await page.goto(
            "https://www.eventcinemas.com.au/Sessions#movies=12814,13027,13120,12953,12949"
          );
        
    //Select the State from the slider
    const result1 = await page.$eval(
      `div.top-select div.slider span.state[data-state-selector=${state}]`,
      elem => elem.click()
    );
    await page.waitFor(1000);

    //Check all the Cinemas in the state
    const elementPath = `div[data-state=${state}] div.top-select-option a.eccheckbox`;
    const movies = await page.evaluate(elementPath => {
      return (movieTitles = Array.from(
        document.querySelectorAll(elementPath)
      ).map(cb => {
        cb.click();
        return `Cinema ID: ${cb.getAttribute(
          "data-id"
        )} Cinema location: ${cb.getAttribute("data-name")}`;
      }));
    }, elementPath);

    console.log(movies);

    //Click the Done button. This will update the Base URL based on the cinemas selected above and provide access to sessions in all cinemas in the state
    await page.$eval("div.bottom-select>a", elem => elem.click());
  page.close()}

})();

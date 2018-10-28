const puppeteer = require("puppeteer");
puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto("https://villagecinemas.com.au/events/indian-cinema");
  const title = await page.title();
  console.log(title);

  const movies = await page.evaluate(() =>
    Array.from(document.querySelectorAll("ul.slider-list li.theme div.movie-name")).map(
      movie => movie.innerText.trim()
    )
  );

  console.log(`movies ${movies}`);
  await browser.close();
});


//https://www.eventcinemas.com.au/EventsFestivals/Bollywood
//div.movie-list span.title
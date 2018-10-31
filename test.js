const puppeteer = require('puppeteer');

const html = `
<html>
    <head></head>
    <body>
        <div>
            <div class="item">item 1</div>
            <div class="item">item 2</div>
            <div class="item">item 3</div>
        </div>
    </body>
</html>`;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`data:text/html,${html}`);

    const last = await page.$('.item:last-child');
    const prev = await page.evaluateHandle(el => el.previousElementSibling, last);

    console.log(await (await last.getProperty('innerHTML')).jsonValue()); // item 3
    console.log(await (await prev.getProperty('innerHTML')).jsonValue()); // item 2

    await browser.close();
})();


/*search an element with XPath and before clicking
https://stackoverflow.com/questions/47407791/puppeteer-click-on-element-with-text
useful to click  through cinemas
*/
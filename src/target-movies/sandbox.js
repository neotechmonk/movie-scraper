
(async () => {
  const res =await require("./unbound")(
    {
      puppeteer: require("puppeteer"),
      R: require("ramda")
    },"https://www.eventcinemas.com.au/EventsFestivals/Bollywood"
  );

 console.log(`Result is ${JSON.stringify(res, null, 2)}`);

  // require("../write-prettily")({ fs: require("fs") }, "output", "jsonFile.json", res)
})();

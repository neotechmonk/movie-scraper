module.exports = async ({page}
   ) => {
  const SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li:not(.evohide)";
    //"#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX)"
    //:not(.evohide)
  const sessions = await page.$$eval(SELECTOR, nodes =>
    nodes.map(element => {
      return {
        movieID: element.getAttribute("data-id"),
        movieTitle: element.getAttribute("data-name")
      };
    })
  );

  //precatiounary, as there are sometimes duplicate hidden elements
  let deduped = [
    ...sessions.reduce((a, c) => a.set(c.movieID, c), new Map()).values()
  ];

  return deduped;
};

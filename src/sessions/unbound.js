module.exports = async ({ helper }, { page }, movieID) => {
  const SESSION_SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li[data-id=\"MOVIE_ID\"]:not(.evohide) > div.movie-list-detail.dynamic > div.cinemas > div> div.session-buttons >a"

  const sessionSelector = helper.selector({
    template: SESSION_SELECTOR,
    parameters: [{ key: "MOVIE_ID", value: movieID }]
  });
  
  const sessions = await page.$$eval(sessionSelector, nodes =>
    nodes.map(element => {
      return {
        cinemaID: element.getAttribute("data-cinemaid"),
        sessionID: element.getAttribute("data-sessionid"),
        sessionDateTime: element.getAttribute("data-time"), //TODO convert to Date object
        seatsLeft: element.getAttribute("data-seatsavailable"),
        sessionSeatsAuditedOn: Date.now(),
        sessionBookingURL: element.getAttribute("href")
      };
    })
  );

  //precatiounary, as there are sometimes duplicate hidden elements
  let deduped = [
    ...sessions.reduce((a, c) => a.set(c.sessionID, c), new Map()).values()
  ];

  return deduped;
};

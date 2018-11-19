module.exports = async ({ page, helper }, movieIndex, sessionIndex) => {
  const SESSION_SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div > div > a:nth-child(SESSION_INDEX)";

  const sessionSelector = helper.selector({
    template: SESSION_SELECTOR,
    parameters: [
      { key: "MOVIE_INDEX", value: movieIndex },
      { key: "SESSION_INDEX", value: sessionIndex }
    ]
  });

  return await page.evaluate((sel, ses) => {
    return {
      cinemaID: document.querySelector(sel).getAttribute("data-cinemaid"),
      sessionID: document.querySelector(sel).getAttribute("data-sessionid"),
      sessionDateTime: document.querySelector(sel).getAttribute("data-time"), //TODO convert to Date object
      seatsLeft: document
        .querySelector(sel)
        .getAttribute("data-seatsavailable"),
      sessionSeatsAuditedOn: Date.now()
    };
  }, sessionSelector);
};

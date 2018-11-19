module.exports = async ({ helper, getSessionFn }, page, movieIndex) => {
  const sessionResults = [];

  const SESSION_LENGTH_SELECTORCLASS =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div > div a.session-btn";

  //Get the number of sessions available for the current cinema
  const numSessions = await helper.elementCount(
    { page: page },
    helper.selector({
      template: SESSION_LENGTH_SELECTORCLASS,
      parameters: [{ key: "MOVIE_INDEX", value: movieIndex }]
    })
  );

  for (let sessionIndex = 1; sessionIndex <= numSessions; sessionIndex++) {
    try {
      sessionResults.push(
        await getSessionFn(
          { page: page, helper: helper },
          movieIndex,
          sessionIndex
        )
      );
    } catch (e) {
      break; // TODO : reduce the chances of traversing over null nodes by accurately ascertaining @numSessions
    }
  }
  console.log(sessionResults);
  return sessionResults;
};

/*
scrape-daily and scrape-batch return flattened objects. The module normalises 
Output : 
[ {
    movieID: "12266",
    movieTitle: "The Nutcracker and the Four Realms",
    cinemas : [
      {
        cinemaID: "17",
          sessions : [
              {
                sessionID: "9162411",
                sessionDateTime: "2018-11-25T15:40",
                seatsLeft: "175",
                sessionSeatsAuditedOn: 1543052314503,
                sessionBookingURL: "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162411&bookingSource=www|sessions"
              }
          ]
      }
    
    ]
  }]
Input: 
[ {
    movieID: "12266",
    movieTitle: "The Nutcracker and the Four Realms",
    cinemaID: "17",
    sessionID: "9162411",
    sessionDateTime: "2018-11-25T15:40",
    seatsLeft: "175",
    sessionSeatsAuditedOn: 1543052314503,
    sessionBookingURL: "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162411&bookingSource=www|sessions"
  }]
Dependencies : @
Flow : 
    1 create URL
    2 get movies
    3 get session for each movie
    4 Compose output
*/
module.exports = ({R}, flatSessions = []) => {
  const movie = R.pick(["movieID", "movieTitle"]);
  const cinemaAndSession = R.pick([
    "cinemaID",
    "sessionID",
    "sessionDateTime",
    "seatsLeft",
    "sessionSeatsAuditedOn",
    "sessionBookingURL"
  ]);
  const cinema = R.pick(["cinemaID"]);
  const session = R.pick([
    "sessionID",
    "sessionDateTime",
    "seatsLeft",
    "sessionSeatsAuditedOn",
    "sessionBookingURL"
  ]);

  const mergeCinemas = R.pipe(
    R.groupBy(R.prop("cinemaID")),
    R.map(
      R.reduce(
        (acc, cur) =>
        R.mergeWith(R.concat, R.merge(acc, cinema(cur)), {
            sessions: [session(cur)]
          }),
        { sessions: [] }
      )
    ),
    R.values
  );

  const process = R.pipe(
    R.groupBy(R.prop("movieID")),
    R.map(
      R.reduce(
        (acc, cur) =>
        R.mergeWith(R.concat, R.merge(acc, movie(cur)), {
            cinemas: [cinemaAndSession(cur)]
          }),
        { cinemas: [] }
      )
    ),
    R.map(R.over(R.lensProp("cinemas"), mergeCinemas)),
    R.values
  );

  return process(flatSessions);
};

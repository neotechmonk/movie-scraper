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
module.exports = ({R}, flatObjects = []) => {
  const movie = pick(["movieID", "movieTitle"]);
  const cinemaAndSession = pick([
    "cinemaID",
    "sessionID",
    "sessionDateTime",
    "seatsLeft",
    "sessionSeatsAuditedOn",
    "sessionBookingURL"
  ]);
  const cinema = pick(["cinemaID"]);
  const session = pick([
    "sessionID",
    "sessionDateTime",
    "seatsLeft",
    "sessionSeatsAuditedOn",
    "sessionBookingURL"
  ]);

  const mergeCinemas = pipe(
    groupBy(prop("cinemaID")),
    map(
      reduce(
        (acc, cur) =>
          mergeWith(concat, merge(acc, cinema(cur)), {
            sessions: [session(cur)]
          }),
        { sessions: [] }
      )
    ),
    values
  );

  const process = pipe(
    groupBy(prop("movieID")),
    map(
      reduce(
        (acc, cur) =>
          mergeWith(concat, merge(acc, movie(cur)), {
            cinemas: [cinemaAndSession(cur)]
          }),
        { cinemas: [] }
      )
    ),
    map(over(lensProp("cinemas"), mergeCinemas)),
    values
  );

  return process(flatObjects);
};

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

import tap from "lodash/fp/tap";
import flow from "lodash/fp/flow";
import groupBy from "lodash/fp/groupBy";

const map = require("lodash/fp/map").convert({ cap: false });

module.exports = (flatObjects = []) => {
  const results = [];

  const input = {
    movieID: "12266",
    movieTitle: "The Nutcracker and the Four Realms",
    cinemaID: "17",
    sessionID: "9162411",
    sessionDateTime: "2018-11-25T15:40",
    seatsLeft: "175",
    sessionSeatsAuditedOn: 1543052314503,
    sessionBookingURL:
      "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162411&bookingSource=www|sessions"
  };

  const result = flow(
    groupBy("movieID"),
    map((movies, movieID) => ({ movieID, movies })),
    tap(console.log)
  )(input);

  return results;
};

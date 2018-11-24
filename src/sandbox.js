
import {
  pick,
  map,
  groupBy,
  values,
  lensProp,
  over,
  reduce,
  merge,
  mergeWith,
  concat,
  pipe,
  prop
} from "ramda";


const input = [ {
  movieID: "12433",
  movieTitle: "Some movie",
  cinemaID: "18",
  sessionID: "9158646",
  sessionDateTime: "2018-11-26T12:15",
  seatsLeft: "184",
  sessionSeatsAuditedOn: 1543094391603,
  sessionBookingURL: "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158646&bookingSource=www|sessions"
},
{
  movieID: "12436",
  movieTitle: "Robin Hood",
  cinemaID: "18",
  sessionID: "9158654",
  sessionDateTime: "2018-11-26T14:30",
  seatsLeft: "184",
  sessionSeatsAuditedOn: 1543094391603,
  sessionBookingURL: "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158654&bookingSource=www|sessions"
},
{
  movieID: "12436",
  movieTitle: "Robin Hood",
  cinemaID: "18",
  sessionID: "9158661",
  sessionDateTime: "2018-11-26T16:45",
  seatsLeft: "184",
  sessionSeatsAuditedOn: 1543094391603,
  sessionBookingURL: "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158661&bookingSource=www|sessions"
},
{
  movieID: "12436",
  movieTitle: "Robin Hood",
  cinemaID: "18",
  sessionID: "9158669",
  sessionDateTime: "2018-11-26T19:00",
  seatsLeft: "184",
  sessionSeatsAuditedOn: 1543094391603,
  sessionBookingURL: "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158669&bookingSource=www|sessions"
}]

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

console.log(JSON.stringify(process(input), null, 2) )
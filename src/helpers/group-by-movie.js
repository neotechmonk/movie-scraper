//module.exports = () => {};
import { normalize, schema } from "normalizr";

const flatData = [
  {
    movieID: "121213",
    movieTitle: "Jn jak",
    cinemaID: "13",
    sessionID: "9154475",
    sessionDateTime: "2018-11-22T21:30",
    seatsLeft: "280",
    sessionSeatsAuditedOn: 1542749045321,
    sessionBookingURL:
      "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9154475&bookingSource=www|sessions"
  },
  {
    movieID: "12326",
    movieTitle: "A Star is Born",
    cinemaID: "13",
    sessionID: "9154475"
  },
  {
    movieID: "12326",
    movieTitle: "A Star is Born",
    cinemaID: "13",
    sessionID: "9154475",
    sessionDateTime: "2018-11-22T21:30",
    seatsLeft: "280",
    sessionSeatsAuditedOn: 1542749045321,
    sessionBookingURL:
      "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9154475&bookingSource=www|sessions"
  },
  {
    movieID: "12326",
    movieTitle: "A Star is Born",
    cinemaID: "13",
    sessionID: "9154475",
    sessionDateTime: "2018-11-22T21:30",
    seatsLeft: "280",
    sessionSeatsAuditedOn: 1542749045321,
    sessionBookingURL:
      "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9154475&bookingSource=www|sessions"
  },
  {
    movieID: "12326",
    movieTitle: "A Star is Born",
    cinemaID: "13",
    sessionID: "9154475",
    sessionDateTime: "2018-11-22T21:30",
    seatsLeft: "280",
    sessionSeatsAuditedOn: 1542749045321,
    sessionBookingURL:
      "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9154475&bookingSource=www|sessions"
  },
  {
    movieID: "12326",
    movieTitle: "A Star is Born",
    cinemaID: "13",
    sessionID: "9154475",
    sessionDateTime: "2018-11-22T21:30",
    seatsLeft: "280",
    sessionSeatsAuditedOn: 1542749045321,
    sessionBookingURL:
      "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9154475&bookingSource=www|sessions"
  },
  {
    movieID: "12326",
    movieTitle: "A Star is Born",
    cinemaID: "13",
    sessionID: "9154475",
    sessionDateTime: "2018-11-22T21:30",
    seatsLeft: "280",
    sessionSeatsAuditedOn: 1542749045321,
    sessionBookingURL:
      "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9154475&bookingSource=www|sessions"
  }
];

const session = new schema.Entity("session", {});
const cinema = new schema.Entity("cinema", { sessions: [session] });
const movie = new schema.Entity("movie", { cinemas: [cinema] });
const movieListSchema = [movie]
const normalisedData = normalize(flatData, movieListSchema);
console.log(normalisedData);

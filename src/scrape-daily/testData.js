const urlStub = jest.fn(() => {});
const moviesStub = jest.fn(() => moviesList);
const sessionsStub = jest.fn(() => sessionList);

const moviesList = [{ movieID: "12334", movieTitle: "Bohemian Rhapsody" }];
const cinemaList = [
  {
    cinemaState: "ACT",
    cinemaID: "13",
    cinemaName: "Manuka",
    cinemaURL: "/Cinema/Manuka"
  },
  {
    cinemaState: "VIC",
    cinemaID: "73",
    cinemaName: "Moonlight Cinema Melbourne",
    cinemaURL: "/Cinema/Moonlight-Cinema-Melbourne"
  },
  {
    cinemaState: "SA",
    cinemaID: "88",
    cinemaName: "Adelaide",
    cinemaURL: "/Cinema/Adelaide"
  },
  {
    cinemaState: "SA",
    cinemaID: "54",
    cinemaName: "Arndale",
    cinemaURL: "/Cinema/Arndale"
  },
  {
    cinemaState: "SA",
    cinemaID: "87",
    cinemaName: "Glenelg",
    cinemaURL: "/Cinema/Glenelg"
  },
  {
    cinemaState: "SA",
    cinemaID: "22",
    cinemaName: "Marion",
    cinemaURL: "/Cinema/Marion"
  },
  {
    cinemaState: "SA",
    cinemaID: "71",
    cinemaName: "Moonlight Cinema Adelaide",
    cinemaURL: "/Cinema/Moonlight-Cinema-Adelaide"
  },
  {
    cinemaState: "NSW",
    cinemaID: "58",
    cinemaName: "Burwood",
    cinemaURL: "/Cinema/Burwood"
  },
  {
    cinemaState: "QLD",
    cinemaID: "24",
    cinemaName: "Australia Fair Cinemas",
    cinemaURL: "/Cinema/Australia-Fair-Cinemas"
  },
  {
    cinemaState: "QLD",
    cinemaID: "59",
    cinemaName: "Brisbane City Myer Centre",
    cinemaURL: "/Cinema/Brisbane-City-Myer-Centre"
  }
];
const sessionList = [
  {
    cinemaID: "17",
    sessionID: "9153490",
    sessionDateTime: "2018-11-24T20:45",
    seatsLeft: "18",
    sessionSeatsAuditedOn: 1542957150855,
    sessionBookingURL:
      "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153490&bookingSource=www|sessions"
  },
  {
    cinemaID: "17",
    sessionID: "9162381",
    sessionDateTime: "2018-11-24T21:30",
    seatsLeft: "192",
    sessionSeatsAuditedOn: 1542957150855,
    sessionBookingURL:
      "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162381&bookingSource=www|sessions"
  }
];
const sessionResults = [
  {
    movieID: "12334",
    movieTitle: "Bohemian Rhapsody",
    cinemaID: "17",
    sessionID: "9153490",
    sessionDateTime: "2018-11-24T20:45",
    seatsLeft: "18",
    sessionSeatsAuditedOn: 1542957103499,
    sessionBookingURL:
      "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153490&bookingSource=www|sessions"
  },
  {
    movieID: "12334",
    movieTitle: "Bohemian Rhapsody",
    cinemaID: "17",
    sessionID: "9162381",
    sessionDateTime: "2018-11-24T21:30",
    seatsLeft: "192",
    sessionSeatsAuditedOn: 1542957103499,
    sessionBookingURL:
      "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162381&bookingSource=www|sessions"
  }
];

export {
  urlStub,
  moviesStub,
  sessionsStub,
  moviesList,
  cinemaList,
  sessionResults
};

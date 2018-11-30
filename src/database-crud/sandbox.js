(async () => {
  const data = [
    {
      cinemas: [
        {
          sessions: [
            {
              sessionID: "9154621",
              sessionDateTime: "2018-11-27T20:40",
              seatsLeft: "118",
              sessionSeatsAuditedOn: 1543223301129,
              sessionBookingURL:
                "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9154621&bookingSource=www|sessions"
            },
            {
              sessionID: "9154650",
              sessionDateTime: "2018-11-28T21:00",
              seatsLeft: "118",
              sessionSeatsAuditedOn: 1543223309021,
              sessionBookingURL:
                "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9154650&bookingSource=www|sessions"
            }
          ],
          cinemaID: "13"
        },
        {
          sessions: [
            {
              sessionID: "9168631",
              sessionDateTime: "2018-11-27T20:30",
              seatsLeft: "147",
              sessionSeatsAuditedOn: 1543223305009,
              sessionBookingURL:
                "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9168631&bookingSource=www|sessions"
            },
            {
              sessionID: "9168680",
              sessionDateTime: "2018-11-28T18:00",
              seatsLeft: "147",
              sessionSeatsAuditedOn: 1543223311264,
              sessionBookingURL:
                "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9168680&bookingSource=www|sessions"
            }
          ],
          cinemaID: "49"
        },
        {
          sessions: [
            {
              sessionID: "9164647",
              sessionDateTime: "2018-11-27T20:30",
              seatsLeft: "125",
              sessionSeatsAuditedOn: 1543223305009,
              sessionBookingURL:
                "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9164647&bookingSource=www|sessions"
            },
            {
              sessionID: "9164853",
              sessionDateTime: "2018-11-28T20:30",
              seatsLeft: "125",
              sessionSeatsAuditedOn: 1543223311264,
              sessionBookingURL:
                "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9164853&bookingSource=www|sessions"
            }
          ],
          cinemaID: "58"
        },
        {
          sessions: [
            {
              sessionID: "9155490",
              sessionDateTime: "2018-11-27T21:00",
              seatsLeft: "97",
              sessionSeatsAuditedOn: 1543223306350,
              sessionBookingURL:
                "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9155490&bookingSource=www|sessions"
            },
            {
              sessionID: "9155529",
              sessionDateTime: "2018-11-28T21:15",
              seatsLeft: "196",
              sessionSeatsAuditedOn: 1543223312470,
              sessionBookingURL:
                "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9155529&bookingSource=www|sessions"
            }
          ],
          cinemaID: "66"
        }
      ],
      movieID: "12236",
      movieTitle: "Taxiwaala",
      movieCode: "TAX",
      movieSynopsis: "Blah blah"
    }
  ];
  const res = require("./index")(data);

  console.log(await res);
})();

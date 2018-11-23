const urlStub = jest.fn(() => {});
const moviesStub = jest.fn(() => moviesList);
const sessionsStub = jest.fn(() => {});

const moviesList = [
  {
    movieID: "12258",
    movieTitle: "Fantastic Beasts: The Crimes of Grindelwald"
  },
  { movieID: "12334", movieTitle: "Bohemian Rhapsody" },
  { movieID: "12266", movieTitle: "The Nutcracker and the Four Realms" },
  { movieID: "12436", movieTitle: "Robin Hood" },
  { movieID: "12336", movieTitle: "Widows" },
  { movieID: "12326", movieTitle: "A Star is Born" }
];
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
    cinemaState: "WA",
    cinemaID: "17",
    cinemaName: "Innaloo",
    cinemaURL: "/Cinema/Innaloo"
  },
  {
    cinemaState: "WA",
    cinemaID: "72",
    cinemaName: "Moonlight Cinema Perth",
    cinemaURL: "/Cinema/Moonlight-Cinema-Perth"
  },
  {
    cinemaState: "WA",
    cinemaID: "18",
    cinemaName: "Morley",
    cinemaURL: "/Cinema/Morley"
  },
  {
    cinemaState: "WA",
    cinemaID: "90",
    cinemaName: "Whitford",
    cinemaURL: "/Cinema/Whitford"
  },
  {
    cinemaState: "NT",
    cinemaID: "43",
    cinemaName: "Casuarina",
    cinemaURL: "/Cinema/Casuarina"
  },
  {
    cinemaState: "NT",
    cinemaID: "42",
    cinemaName: "Darwin",
    cinemaURL: "/Cinema/Darwin"
  },
  {
    cinemaState: "NT",
    cinemaID: "91",
    cinemaName: "Palmerston",
    cinemaURL: "/Cinema/Palmerston"
  },
  {
    cinemaState: "NSW",
    cinemaID: "68",
    cinemaName: "Beverly Hills",
    cinemaURL: "/Cinema/Beverly-Hills"
  },
  {
    cinemaState: "NSW",
    cinemaID: "64",
    cinemaName: "Bondi Junction",
    cinemaURL: "/Cinema/Bondi-Junction"
  },
  {
    cinemaState: "NSW",
    cinemaID: "58",
    cinemaName: "Burwood",
    cinemaURL: "/Cinema/Burwood"
  },
  {
    cinemaState: "NSW",
    cinemaID: "65",
    cinemaName: "Campbelltown",
    cinemaURL: "/Cinema/Campbelltown"
  },
  {
    cinemaState: "NSW",
    cinemaID: "53",
    cinemaName: "Castle Hill",
    cinemaURL: "/Cinema/Castle-Hill"
  },
  {
    cinemaState: "NSW",
    cinemaID: "36",
    cinemaName: "Coffs Harbour",
    cinemaURL: "/Cinema/Coffs-Harbour"
  },
  {
    cinemaState: "NSW",
    cinemaID: "67",
    cinemaName: "Cronulla",
    cinemaURL: "/Cinema/Cronulla"
  },
  {
    cinemaState: "NSW",
    cinemaID: "5",
    cinemaName: "Drive In Blacktown",
    cinemaURL: "/Cinema/Drive-In-Blacktown"
  },
  {
    cinemaState: "NSW",
    cinemaID: "15",
    cinemaName: "George Street",
    cinemaURL: "/Cinema/George-Street"
  },
  {
    cinemaState: "NSW",
    cinemaID: "21",
    cinemaName: "Glendale",
    cinemaURL: "/Cinema/Glendale"
  },
  {
    cinemaState: "NSW",
    cinemaID: "62",
    cinemaName: "Hornsby",
    cinemaURL: "/Cinema/Hornsby"
  },
  {
    cinemaState: "NSW",
    cinemaID: "7",
    cinemaName: "Hurstville",
    cinemaURL: "/Cinema/Hurstville"
  },
  {
    cinemaState: "NSW",
    cinemaID: "85",
    cinemaName: "Kotara",
    cinemaURL: "/Cinema/Kotara"
  },
  {
    cinemaState: "NSW",
    cinemaID: "35",
    cinemaName: "Lismore",
    cinemaURL: "/Cinema/Lismore"
  },
  {
    cinemaState: "NSW",
    cinemaID: "19",
    cinemaName: "Liverpool",
    cinemaURL: "/Cinema/Liverpool"
  },
  {
    cinemaState: "NSW",
    cinemaID: "55",
    cinemaName: "Macquarie",
    cinemaURL: "/Cinema/Macquarie"
  },
  {
    cinemaState: "NSW",
    cinemaID: "82",
    cinemaName: "Miranda",
    cinemaURL: "/Cinema/Miranda"
  },
  {
    cinemaState: "NSW",
    cinemaID: "75",
    cinemaName: "Moonlight Cinema Sydney",
    cinemaURL: "/Cinema/Moonlight-Cinema-Sydney"
  },
  {
    cinemaState: "NSW",
    cinemaID: "10",
    cinemaName: "Newcastle",
    cinemaURL: "/Cinema/Newcastle"
  },
  {
    cinemaState: "NSW",
    cinemaID: "66",
    cinemaName: "Parramatta",
    cinemaURL: "/Cinema/Parramatta"
  },
  {
    cinemaState: "NSW",
    cinemaID: "63",
    cinemaName: "Shellharbour",
    cinemaURL: "/Cinema/Shellharbour"
  },
  {
    cinemaState: "NSW",
    cinemaID: "69",
    cinemaName: "Top Ryde City",
    cinemaURL: "/Cinema/Top-Ryde-City"
  },
  {
    cinemaState: "NSW",
    cinemaID: "9",
    cinemaName: "Tuggerah",
    cinemaURL: "/Cinema/Tuggerah"
  },
  {
    cinemaState: "NSW",
    cinemaID: "11",
    cinemaName: "Wollongong",
    cinemaURL: "/Cinema/Wollongong"
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
  },
  {
    cinemaState: "QLD",
    cinemaID: "29",
    cinemaName: "Browns Plains",
    cinemaURL: "/Cinema/Browns-Plains"
  },
  {
    cinemaState: "QLD",
    cinemaID: "44",
    cinemaName: "Cairns Central",
    cinemaURL: "/Cinema/Cairns-Central"
  },
  {
    cinemaState: "QLD",
    cinemaID: "61",
    cinemaName: "Cairns Earlville",
    cinemaURL: "/Cinema/Cairns-Earlville"
  },
  {
    cinemaState: "QLD",
    cinemaID: "89",
    cinemaName: "Cairns Smithfield",
    cinemaURL: "/Cinema/Cairns-Smithfield"
  },
  {
    cinemaState: "QLD",
    cinemaID: "30",
    cinemaName: "Capalaba",
    cinemaURL: "/Cinema/Capalaba"
  },
  {
    cinemaState: "QLD",
    cinemaID: "28",
    cinemaName: "Carindale",
    cinemaURL: "/Cinema/Carindale"
  },
  {
    cinemaState: "QLD",
    cinemaID: "56",
    cinemaName: "Chermside",
    cinemaURL: "/Cinema/Chermside"
  },
  {
    cinemaState: "QLD",
    cinemaID: "33",
    cinemaName: "Coolangatta",
    cinemaURL: "/Cinema/Coolangatta"
  },
  {
    cinemaState: "QLD",
    cinemaID: "92",
    cinemaName: "Coomera",
    cinemaURL: "/Cinema/Coomera"
  },
  {
    cinemaState: "QLD",
    cinemaID: "49",
    cinemaName: "Garden City Mt Gravatt",
    cinemaURL: "/Cinema/Garden-City-Mt-Gravatt"
  },
  {
    cinemaState: "QLD",
    cinemaID: "48",
    cinemaName: "Indooroopilly",
    cinemaURL: "/Cinema/Indooroopilly"
  },
  {
    cinemaState: "QLD",
    cinemaID: "25",
    cinemaName: "Ipswich",
    cinemaURL: "/Cinema/Ipswich"
  },
  {
    cinemaState: "QLD",
    cinemaID: "93",
    cinemaName: "Kawana",
    cinemaURL: "/Cinema/Kawana"
  },
  {
    cinemaState: "QLD",
    cinemaID: "79",
    cinemaName: "Loganholme",
    cinemaURL: "/Cinema/Loganholme"
  },
  {
    cinemaState: "QLD",
    cinemaID: "39",
    cinemaName: "Mackay City",
    cinemaURL: "/Cinema/Mackay-City"
  },
  {
    cinemaState: "QLD",
    cinemaID: "50",
    cinemaName: "Mackay Mount Pleasant",
    cinemaURL: "/Cinema/Mackay-Mount-Pleasant"
  },
  {
    cinemaState: "QLD",
    cinemaID: "38",
    cinemaName: "Maroochydore Sunshine Plaza",
    cinemaURL: "/Cinema/Maroochydore-Sunshine-Plaza"
  },
  {
    cinemaState: "QLD",
    cinemaID: "74",
    cinemaName: "Moonlight Cinema Brisbane",
    cinemaURL: "/Cinema/Moonlight-Cinema-Brisbane"
  },
  {
    cinemaState: "QLD",
    cinemaID: "31",
    cinemaName: "Morayfield",
    cinemaURL: "/Cinema/Morayfield"
  },
  {
    cinemaState: "QLD",
    cinemaID: "77",
    cinemaName: "Noosa",
    cinemaURL: "/Cinema/Noosa"
  },
  {
    cinemaState: "QLD",
    cinemaID: "86",
    cinemaName: "North Lakes",
    cinemaURL: "/Cinema/North-Lakes"
  },
  {
    cinemaState: "QLD",
    cinemaID: "23",
    cinemaName: "Pacific Fair",
    cinemaURL: "/Cinema/Pacific-Fair"
  },
  {
    cinemaState: "QLD",
    cinemaID: "34",
    cinemaName: "Robina",
    cinemaURL: "/Cinema/Robina"
  },
  {
    cinemaState: "QLD",
    cinemaID: "47",
    cinemaName: "Rockhampton North",
    cinemaURL: "/Cinema/Rockhampton-North"
  },
  {
    cinemaState: "QLD",
    cinemaID: "83",
    cinemaName: "Springfield",
    cinemaURL: "/Cinema/Springfield"
  },
  {
    cinemaState: "QLD",
    cinemaID: "26",
    cinemaName: "Strathpine",
    cinemaURL: "/Cinema/Strathpine"
  },
  {
    cinemaState: "QLD",
    cinemaID: "78",
    cinemaName: "Toombul",
    cinemaURL: "/Cinema/Toombul"
  },
  {
    cinemaState: "QLD",
    cinemaID: "52",
    cinemaName: "Toowoomba Grand Central",
    cinemaURL: "/Cinema/Toowoomba-Grand-Central"
  },
  {
    cinemaState: "QLD",
    cinemaID: "37",
    cinemaName: "Toowoomba Strand",
    cinemaURL: "/Cinema/Toowoomba-Strand"
  },
  {
    cinemaState: "QLD",
    cinemaID: "81",
    cinemaName: "Townsville Central",
    cinemaURL: "/Cinema/Townsville-Central"
  },
  {
    cinemaState: "QLD",
    cinemaID: "40",
    cinemaName: "Townsville City",
    cinemaURL: "/Cinema/Townsville-City"
  }
];

const sessionResults = [ {
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157288",
  "sessionDateTime": "2018-11-24T10:10",
  "seatsLeft": "368",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157288&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9153842",
  "sessionDateTime": "2018-11-24T10:30",
  "seatsLeft": "28",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153842&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157548",
  "sessionDateTime": "2018-11-24T11:10",
  "seatsLeft": "293",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157548&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157550",
  "sessionDateTime": "2018-11-24T11:40",
  "seatsLeft": "99",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157550&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9153844",
  "sessionDateTime": "2018-11-24T12:30",
  "seatsLeft": "10",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153844&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157558",
  "sessionDateTime": "2018-11-24T12:30",
  "seatsLeft": "290",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157558&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157291",
  "sessionDateTime": "2018-11-24T13:00",
  "seatsLeft": "363",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157291&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9153846",
  "sessionDateTime": "2018-11-24T13:20",
  "seatsLeft": "18",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153846&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157292",
  "sessionDateTime": "2018-11-24T14:00",
  "seatsLeft": "365",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157292&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157574",
  "sessionDateTime": "2018-11-24T14:30",
  "seatsLeft": "98",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157574&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157577",
  "sessionDateTime": "2018-11-24T15:10",
  "seatsLeft": "291",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157577&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157293",
  "sessionDateTime": "2018-11-24T15:50",
  "seatsLeft": "362",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157293&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9153848",
  "sessionDateTime": "2018-11-24T16:00",
  "seatsLeft": "1",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153848&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157294",
  "sessionDateTime": "2018-11-24T16:50",
  "seatsLeft": "365",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157294&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157593",
  "sessionDateTime": "2018-11-24T17:20",
  "seatsLeft": "93",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157593&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157599",
  "sessionDateTime": "2018-11-24T18:00",
  "seatsLeft": "291",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157599&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157295",
  "sessionDateTime": "2018-11-24T18:40",
  "seatsLeft": "364",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157295&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9153851",
  "sessionDateTime": "2018-11-24T18:50",
  "seatsLeft": "0",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153851&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157296",
  "sessionDateTime": "2018-11-24T19:40",
  "seatsLeft": "361",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157296&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157612",
  "sessionDateTime": "2018-11-24T20:10",
  "seatsLeft": "93",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157612&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9153852",
  "sessionDateTime": "2018-11-24T20:40",
  "seatsLeft": "0",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153852&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157619",
  "sessionDateTime": "2018-11-24T20:50",
  "seatsLeft": "295",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157619&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9157626",
  "sessionDateTime": "2018-11-24T21:30",
  "seatsLeft": "197",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157626&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "22",
  "sessionID": "9153854",
  "sessionDateTime": "2018-11-24T21:30",
  "seatsLeft": "2",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153854&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "18",
  "sessionID": "9158577",
  "sessionDateTime": "2018-11-24T10:10",
  "seatsLeft": "179",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158577&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "18",
  "sessionID": "9158584",
  "sessionDateTime": "2018-11-24T13:00",
  "seatsLeft": "179",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158584&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "18",
  "sessionID": "9158586",
  "sessionDateTime": "2018-11-24T14:40",
  "seatsLeft": "349",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158586&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "18",
  "sessionID": "9158589",
  "sessionDateTime": "2018-11-24T15:50",
  "seatsLeft": "173",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158589&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "18",
  "sessionID": "9158601",
  "sessionDateTime": "2018-11-24T18:40",
  "seatsLeft": "177",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158601&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "18",
  "sessionID": "9158603",
  "sessionDateTime": "2018-11-24T20:00",
  "seatsLeft": "356",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158603&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "18",
  "sessionID": "9158604",
  "sessionDateTime": "2018-11-24T20:45",
  "seatsLeft": "173",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158604&bookingSource=www|sessions"
},
{
  "movieID": "12334",
  "movieTitle": "Bohemian Rhapsody",
  "cinemaID": "18",
  "sessionID": "9158609",
  "sessionDateTime": "2018-11-24T21:30",
  "seatsLeft": "181",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158609&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "17",
  "sessionID": "9162328",
  "sessionDateTime": "2018-11-24T10:00",
  "seatsLeft": "196",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162328&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "17",
  "sessionID": "9153476",
  "sessionDateTime": "2018-11-24T10:30",
  "seatsLeft": "22",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153476&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "17",
  "sessionID": "9162347",
  "sessionDateTime": "2018-11-24T12:50",
  "seatsLeft": "196",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162347&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "17",
  "sessionID": "9153480",
  "sessionDateTime": "2018-11-24T13:15",
  "seatsLeft": "4",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153480&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "17",
  "sessionID": "9162357",
  "sessionDateTime": "2018-11-24T15:40",
  "seatsLeft": "194",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162357&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "17",
  "sessionID": "9162368",
  "sessionDateTime": "2018-11-24T18:30",
  "seatsLeft": "391",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162368&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "17",
  "sessionID": "9153488",
  "sessionDateTime": "2018-11-24T18:45",
  "seatsLeft": "0",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153488&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "17",
  "sessionID": "9162372",
  "sessionDateTime": "2018-11-24T19:40",
  "seatsLeft": "262",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162372&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "17",
  "sessionID": "9162380",
  "sessionDateTime": "2018-11-24T21:20",
  "seatsLeft": "406",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162380&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "17",
  "sessionID": "9153492",
  "sessionDateTime": "2018-11-24T21:30",
  "seatsLeft": "16",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153492&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9157541",
  "sessionDateTime": "2018-11-24T10:10",
  "seatsLeft": "98",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157541&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9157561",
  "sessionDateTime": "2018-11-24T13:00",
  "seatsLeft": "95",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157561&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9157568",
  "sessionDateTime": "2018-11-24T14:00",
  "seatsLeft": "97",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157568&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9157575",
  "sessionDateTime": "2018-11-24T15:00",
  "seatsLeft": "101",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157575&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9153847",
  "sessionDateTime": "2018-11-24T15:30",
  "seatsLeft": "0",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153847&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9157582",
  "sessionDateTime": "2018-11-24T15:50",
  "seatsLeft": "97",
  "sessionSeatsAuditedOn": 1542955886279,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157582&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9157590",
  "sessionDateTime": "2018-11-24T16:50",
  "seatsLeft": "94",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157590&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9157594",
  "sessionDateTime": "2018-11-24T17:45",
  "seatsLeft": "99",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157594&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9153850",
  "sessionDateTime": "2018-11-24T18:25",
  "seatsLeft": "0",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9153850&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9157602",
  "sessionDateTime": "2018-11-24T18:40",
  "seatsLeft": "91",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157602&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9157610",
  "sessionDateTime": "2018-11-24T19:40",
  "seatsLeft": "89",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157610&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9157618",
  "sessionDateTime": "2018-11-24T20:35",
  "seatsLeft": "99",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157618&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "22",
  "sessionID": "9157625",
  "sessionDateTime": "2018-11-24T21:30",
  "seatsLeft": "101",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157625&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "18",
  "sessionID": "9158576",
  "sessionDateTime": "2018-11-24T10:00",
  "seatsLeft": "338",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158576&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "18",
  "sessionID": "9158583",
  "sessionDateTime": "2018-11-24T12:50",
  "seatsLeft": "337",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158583&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "18",
  "sessionID": "9158588",
  "sessionDateTime": "2018-11-24T15:40",
  "seatsLeft": "331",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158588&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "18",
  "sessionID": "9158600",
  "sessionDateTime": "2018-11-24T18:30",
  "seatsLeft": "326",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158600&bookingSource=www|sessions"
},
{
  "movieID": "12266",
  "movieTitle": "The Nutcracker and the Four Realms",
  "cinemaID": "18",
  "sessionID": "9158608",
  "sessionDateTime": "2018-11-24T21:20",
  "seatsLeft": "338",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9158608&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "17",
  "sessionID": "9162333",
  "sessionDateTime": "2018-11-24T10:00",
  "seatsLeft": "212",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162333&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "17",
  "sessionID": "9162341",
  "sessionDateTime": "2018-11-24T12:15",
  "seatsLeft": "220",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162341&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "17",
  "sessionID": "9162351",
  "sessionDateTime": "2018-11-24T14:30",
  "seatsLeft": "219",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162351&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "17",
  "sessionID": "9162360",
  "sessionDateTime": "2018-11-24T16:45",
  "seatsLeft": "211",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162360&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "17",
  "sessionID": "9162370",
  "sessionDateTime": "2018-11-24T19:00",
  "seatsLeft": "225",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162370&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "17",
  "sessionID": "9162377",
  "sessionDateTime": "2018-11-24T21:15",
  "seatsLeft": "225",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9162377&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "22",
  "sessionID": "9116693",
  "sessionDateTime": "2018-11-24T10:00",
  "seatsLeft": "425",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9116693&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "22",
  "sessionID": "9157549",
  "sessionDateTime": "2018-11-24T11:15",
  "seatsLeft": "415",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157549&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "22",
  "sessionID": "9116694",
  "sessionDateTime": "2018-11-24T12:15",
  "seatsLeft": "427",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9116694&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "22",
  "sessionID": "9157566",
  "sessionDateTime": "2018-11-24T13:30",
  "seatsLeft": "430",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157566&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "22",
  "sessionID": "9116695",
  "sessionDateTime": "2018-11-24T14:30",
  "seatsLeft": "420",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9116695&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "22",
  "sessionID": "9157580",
  "sessionDateTime": "2018-11-24T15:45",
  "seatsLeft": "430",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157580&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "22",
  "sessionID": "9116696",
  "sessionDateTime": "2018-11-24T16:45",
  "seatsLeft": "404",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9116696&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "22",
  "sessionID": "9157597",
  "sessionDateTime": "2018-11-24T18:00",
  "seatsLeft": "430",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157597&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "22",
  "sessionID": "9116697",
  "sessionDateTime": "2018-11-24T19:00",
  "seatsLeft": "422",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9116697&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "22",
  "sessionID": "9157613",
  "sessionDateTime": "2018-11-24T20:15",
  "seatsLeft": "430",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9157613&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "22",
  "sessionID": "9116698",
  "sessionDateTime": "2018-11-24T21:15",
  "seatsLeft": "428",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9116698&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "18",
  "sessionID": "9116580",
  "sessionDateTime": "2018-11-24T10:00",
  "seatsLeft": "184",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9116580&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "18",
  "sessionID": "9116581",
  "sessionDateTime": "2018-11-24T12:15",
  "seatsLeft": "181",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9116581&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "18",
  "sessionID": "9116582",
  "sessionDateTime": "2018-11-24T14:30",
  "seatsLeft": "177",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9116582&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "18",
  "sessionID": "9116583",
  "sessionDateTime": "2018-11-24T16:45",
  "seatsLeft": "178",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9116583&bookingSource=www|sessions"
},
{
  "movieID": "12436",
  "movieTitle": "Robin Hood",
  "cinemaID": "18",
  "sessionID": "9116584",
  "sessionDateTime": "2018-11-24T19:00",
  "seatsLeft": "181",
  "sessionSeatsAuditedOn": 1542955886280,
  "sessionBookingURL": "https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9116584&bookingSource=www|sessions"
}
]
export { urlStub, moviesStub, sessionsStub, moviesList, cinemaList, sessionResults };

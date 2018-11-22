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

export { urlStub, moviesStub, sessionsStub, moviesList, cinemaList };

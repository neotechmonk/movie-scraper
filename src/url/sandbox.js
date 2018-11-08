const url = require(".")

const movies = [1220, 1223];
const cinemas = [
  {
    cinemaState: "ACT",
    cinemaIndex: 0,
    cinemaId: "13",
    cinemaName: "Manuka",
    cinemaURL: "/Cinema/Manuka"
  },
  {
    cinemaState: "VIC",
    cinemaIndex: 0,
    cinemaId: "73",
    cinemaName: "Moonlight Cinema Melbourne",
    cinemaURL: "/Cinema/Moonlight-Cinema-Melbourne"
  },
  {
    cinemaState: "SA",
    cinemaIndex: 0,
    cinemaId: "88",
    cinemaName: "Adelaide",
    cinemaURL: "/Cinema/Adelaide"
  },
  {
    cinemaState: "NSW",
    cinemaIndex: 10,
    cinemaId: "62",
    cinemaName: "Hornsby",
    cinemaURL: "/Cinema/Hornsby"
  }
];

url(new Date(2018, 10, 30), [1,2], {
  cinemas: cinemas,
  start: 2,
  limit: 5
});

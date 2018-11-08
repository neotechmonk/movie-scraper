const url = require(".");

const movies = [1220, 1223];
const cinemas = [14, 88, 23, 90, 34, 22, 45, 12, 32, 34,21];

console.log(
  url(new Date(2018, 10, 30), [1, 2], {
    cinemaIDs: cinemas,
    start: 0,
    limit: 5
  })
);

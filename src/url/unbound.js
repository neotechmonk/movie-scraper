//composes a URL for the pupetteer to use on the cinema site
function url(date, movieIDs, { cinemaIDs = [], start = 0, limit = 5 }) {
  // //if (!(date || movies || cinemas.length > 0))
  if (!movieIDs || !movieIDs.every(val => typeof val === "number"))
    throw Error("Movie IDs should be passed as numbers");

  if (!cinemaIDs || cinemaIDs.length == 0)
    throw Error("Array of cinema ID with property cinemaId should be passed");

  if (!date || !date instanceof Date)
    throw Error("Valid date should be passed");

  const BASE_URL = "https://www.eventcinemas.com.au/Sessions#";

  // Convert date to string to pass as query string
  const dateString =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);

  //String a subset of CinemaIDs to use in the current request
  let cinemaIDString = cinemaIDs
    .filter(
      function(cinemaId, index) {
        return index >= this.si && index < this.si + this.lim;
      },
      {
        si: start,
        lim: limit
      }
    )
    .join();

  //String the movie ID array
  const movieString = movieIDs.join();

  return `${BASE_URL}date=${dateString}&cinemas=${cinemaIDString}&movies=${movieString}`;
}

export default url;

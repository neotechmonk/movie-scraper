//composes a URL for the pupetteer to use on the cinema site
function url(date, movies, { cinemas = [], start = 0, limit = 5 }) {
  // //if (!(date || movies || cinemas.length > 0))
  if (!movies || movies.every(val => typeof val !== "number"))
    throw Error("Movie IDs should be passed as numbers");

  if (cinemas.length == 0)
    throw Error(
      "Array of cinema objects with property cinemaId should be passed"
    );
  const baseURL = "https://www.eventcinemas.com.au/Sessions#";

  // Convert date to string to pass as query string
  const dateString =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);

  //String a subset of CinemaIDs to use in the current request
  let cinemaIDString = cinemas
    .filter(
      function(cin, index) {
        return index >= this.si && index < this.si + this.lim;
      },
      {
        si: start,
        lim: limit
      }
    )
    .map(function(cin) {
      return cin.cinemaId;
    })
    .join();

  //String the movie ID array
  console.log("movies " + movies);
  const movieString = movies.join();

  return `${baseURL}date=${dateString}&cinemas=${cinemaIDString}&movies=${movieString}`;
}

export default url;

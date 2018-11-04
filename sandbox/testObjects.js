import { Movie, Cinema } from "../domain-objects";

let movie = new Movie({ name: "Enthiran", id: 12 });

console.log(movie.stats());

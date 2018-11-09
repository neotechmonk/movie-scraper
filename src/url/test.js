const url = require("./unbound").default;

describe("url", () => {
  it("happy path - URL to use cinemaIDs from beginning", () => {
    expect(url(date, movies, { cinemaIDs: cinemas, start: 0, limit: 5 })).toBe(
      "https://www.eventcinemas.com.au/Sessions#date=2018-11-30&cinemas=14,88,23,90,34&movies=1220,1223"
    );
  });

  test("happy path - URL to use cinemaIDs from midway ", () => {
    expect(url(date, movies, { cinemaIDs: cinemas, start: 4, limit: 2 })).toBe(
      "https://www.eventcinemas.com.au/Sessions#date=2018-11-30&cinemas=34,22&movies=1220,1223"
    );
  });

  test("arg @movies as null will throw error", () => {
    expect(() => {
      url(date, null, { cinemaIDs: cinemas, start: 0, limit: 2 });
    }).toThrow();
  });
  test("arg @movies with non numbers will throw error", () => {
    expect(() => {
      url(date, [1, "sdf"], {
        cinemaIDs: ["cinema paradiso", 1220, 1224],
        start: 0,
        limit: 2
      });
    }).toThrow();
  });

  it("arg @cinemas as empty array will throw error", () => {
    expect(() => {
      url(date, movies, { cinemaIDs: [], start: 0, limit: 2 });
    }).toThrow();
  });

  test("arg @cinemas as null will throw error", () => {
    expect(() => {
      url(date, movies, { cinemaIDs: null, start: 0, limit: 2 });
    }).toThrow();
  });

  test("arg @cinemas with non numbers will throw error", () => {
    expect(() => {
      url(date, movies, { cinemaIDs: ["cinema name", 123, 1232], start: 0, limit: 2 });
    }).toThrow();
  });

  test("arg date should be valid", () => {
    expect(() => {
      url(null, movies, { cinemaIDs: cinemas, start: 0, limit: 2 });
    }).toThrow("Valid date should be passed");
  });
});

const date = new Date(2018, 10, 30); //months are indexed from 0 in JS
const movies = [1220, 1223];
const cinemas = [14, 88, 23, 90, 34, 22, 45, 12, 32, 34, 21];

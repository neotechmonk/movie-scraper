const url = require("./unbound").default;

describe("url", () => {
  it("happy path - start cinemaIDs from beginning", () => {
    expect(url(date, movies, { cinemaIDs: cinemas, start: 0, limit: 5 })).toBe(
      "https://www.eventcinemas.com.au/Sessions#date=2018-11-30&cinemas=14,88,23,90,34&movies=1220,1223"
    );
  });

  test("happy path - start cinemaIDs from midway ", () => {
    expect(url(date, movies, { cinemaIDs: cinemas, start: 4, limit: 2 })).toBe(
      "https://www.eventcinemas.com.au/Sessions#date=2018-11-30&cinemas=34,22&movies=1220,1223"
    );
  });

  test("no valid movies should error - null", () => {
    expect(() => {
      url(date, null, { cinemaIDs: cinemas, start: 0, limit: 2 });
    }).toThrow();
  });
  test("no valid movies should error - Movie IDs are not numbers ", () => {
    expect(() => {
      url(date, [1, "sdf"], { cinemaIDs: cinemas, start: 0, limit: 2 });
    }).toThrow();
  });

  it("no cinema throws error - empty array", () => {
    expect(() => {
      url(date, movies, { cinemaIDs: [], start: 0, limit: 2 });
    }).toThrow();
  });

  test("no cinema throws error -null", () => {
    expect(() => {
      url(date, movies, { cinemaIDs: null, start: 0, limit: 2 });
    }).toThrow();
  });

  test("date shoul be valid", () => {
    expect(() => {
      url(null, movies, { cinemaIDs: cinemas, start: 0, limit: 2 });
    }).toThrow("Valid date should be passed");
  });
});

const date = new Date(2018, 10, 30); //months are indexed from 0 in JS
const movies = [1220, 1223];
const cinemas = [14, 88, 23, 90, 34, 22, 45, 12, 32, 34, 21];

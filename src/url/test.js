const url = require("./unbound").default;

describe("url", () => {
  it("happy path", () => {
    expect(url(date, movies, { cinemas: cinemas, start: 0, limit: 2 })).toBe(
      "https://www.eventcinemas.com.au/Sessions#date=2018-11-30&cinemas=13,73&movies=1220,1223"
    );
  });

  test("no valid movies should error - null", () => {
    expect(() => {
      url(date, null, { cinemas: cinemas, start: 0, limit: 2 });
    }).toThrow();
  });
  test("no valid movies should error - Movie IDs are not numbers ", () => {
    expect(() => {
      url(date, [1, "sdf"], { cinemas: cinemas, start: 0, limit: 2 });
    }).toThrow();
  });

  it("no cinema throws error - empty array", () => {
    expect(() => {
      url(date, movies, { cinemas: [], start: 0, limit: 2 });
    }).toThrow();
  });

  test("no cinema throws error -null", () => {
    expect(() => {
      url(date, movies, { cinemas: null, start: 0, limit: 2 });
    }).toThrow();
  });

  test("date shoul be valid", () => {
    expect(() => {
      url(null, movies, { cinemas: cinemas, start: 0, limit: 2 });
    }).toThrow("Valid date should be passed");
  });
});

const date = new Date(2018, 10, 30); //months are indexed from 0 in JS
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

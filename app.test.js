import * as app from "./app";

describe("Helper functions", () => {
  it("Add new cinema IDs to the URL ", () => {
    const oldtURL =
      "https://www.eventcinemas.com.au/Sessions?movies=12334,12326&date=2018-11-04&cinemas=43,32,55,666";
    const cinemasArray = [
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

    let newURL = app.preparedURL({
      URL: oldtURL,
      startIndex: 1,
      limit: 3,
      cinemas: cinemasArray
    });

    expect(newURL).toBe(
      "https://www.eventcinemas.com.au/Sessions?movies=12334,12326&date=2018-11-04&cinemas=73,88,62"
    );
  });
});

import { default as allCinemas } from "./allCinemas";
import { puppeteer } from "puppetteer";

describe("allCinemas", () => {
  const STATES = ["ACT", "NSW"];

  test("happy path", async () => {
    const cinemasfromStateStub = jest.fn(async (page, state) => {
      const stateSpecificCinema = (function(state) {
        switch (state) {
          case "NSW":
            return {
              cinemaState: "NSW",
              cinemaId: "75",
              cinemaName: "Moonlight Cinema Sydney",
              cinemaURL: "/Cinema/Moonlight-Cinema-Sydney"
            };
          case "ACT":
            return {
              cinemaState: "ACT",
              cinemaId: "13",
              cinemaName: "Manuka",
              cinemaURL: "/Cinema/Manuka"
            };
          default:
            return {};
        }
      })(state);

      return Promise.resolve([stateSpecificCinema]);
    });

    const results = await allCinemas({
      puppeteer: puppeteer,
      cinemasfromState: cinemasfromStateStub
    });
  });
});

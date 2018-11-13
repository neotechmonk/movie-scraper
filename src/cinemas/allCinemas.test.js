import { default as allCinemas } from "./allCinemas";
import { puppeteer } from "puppetteer";

describe("allCinemas", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const STATES = ["ACT", "NSW"];
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
  const expectedResults = [
    {
      cinemaState: "ACT",
      cinemaId: "13",
      cinemaName: "Manuka",
      cinemaURL: "/Cinema/Manuka"
    },
    {
      cinemaState: "NSW",
      cinemaId: "75",
      cinemaName: "Moonlight Cinema Sydney",
      cinemaURL: "/Cinema/Moonlight-Cinema-Sydney"
    }
  ];

  test("happy path", async () => {
    const results = await allCinemas({
      puppeteer: puppeteer,
      cinemasfromState: cinemasfromStateStub,
      states: STATES
    });

    expect(results).toEqual(expectedResults);
  });

  test("fail path - different states", async () => {
    const results = await allCinemas({
      puppeteer: puppeteer,
      cinemasfromState: cinemasfromStateStub,
      states: ["QLD", "NT"]
    });

    expect(results).not.toEqual(expectedResults);
  });
  test("Cinema name is correct", async () => {
    const results = await allCinemas({
      puppeteer: puppeteer,
      cinemasfromState: cinemasfromStateStub,
      states: STATES
    });
    expect(puppeteer.page.goto).toBeCalledWith(
      "https://www.eventcinemas.com.au"
    );
  });
  test("called puppetteer functions waitFor(), $eval(), close()", async () => {
    const results = await allCinemas({
      puppeteer: puppeteer,
      cinemasfromState: cinemasfromStateStub,
      states: STATES
    });
    expect(puppeteer.page.waitFor).toBeCalledWith(1000);
    expect(puppeteer.page.$eval).toBeCalled();
    expect(puppeteer.page.close).toBeCalled();
  });
});

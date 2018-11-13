import { default as allCinemas } from "./all-cinemas";
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

  test("Happy path", async () => {
    const results = await allCinemas({
      puppeteer: puppeteer,
      cinemasfromState: cinemasfromStateStub,
      states: STATES
    });

    expect(results).toEqual(expectedResults);
  });

  test("Fail path - pass incorrect state/s ", async () => {
    const results = await allCinemas({
      puppeteer: puppeteer,
      cinemasfromState: cinemasfromStateStub,
      states: ["QLD", "NT"] // expects "ACT", "NSW"
    });

    expect(results).not.toEqual(expectedResults);
  });
  test("Cinema URL is correct", async () => {
    const results = await allCinemas({
      puppeteer: puppeteer,
      cinemasfromState: cinemasfromStateStub,
      states: STATES
    });
    expect(puppeteer.page.goto).toBeCalledWith(
      "https://www.eventcinemas.com.au"
    );
  });
  test("should correctly call peripheral puppetteer functions", async () => {
    const results = await allCinemas({
      puppeteer: puppeteer,
      cinemasfromState: cinemasfromStateStub,
      states: STATES
    });
    expect(puppeteer.page.close).toBeCalled();
    expect(puppeteer.page.setRequestInterception).toBeCalledWith(true);
    expect(puppeteer.page.on).toBeCalled();
  });
});

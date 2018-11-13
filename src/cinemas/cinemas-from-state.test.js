// this might be mandy too https://stackoverflow.com/questions/47953305/jest-passing-an-object-to-expect-tobecalledwith

import { default as cinemasfromState } from "./cinemas-from-state";
import { puppeteer } from "puppetteer";

//override page.evaluate of the mock to return specific values

const page = puppeteer.page;
page.evaluate = jest.fn((selector, state) =>
  Promise.resolve([
    {
      cinemaState: "NSW",
      cinemaId: "75",
      cinemaName: "Moonlight Cinema Sydney",
      cinemaURL: "/Cinema/Moonlight-Cinema-Sydney"
    },
    {
      cinemaState: "NSW",
      cinemaId: "10",
      cinemaName: "Newcastle",
      cinemaURL: "/Cinema/Newcastle"
    },
    {
      cinemaState: "NSW",
      cinemaId: "66",
      cinemaName: "Parramatta",
      cinemaURL: "/Cinema/Parramatta"
    },
    {
      cinemaState: "NSW",
      cinemaId: "63",
      cinemaName: "Shellharbour",
      cinemaURL: "/Cinema/Shellharbour"
    },
    {
      cinemaState: "NSW",
      cinemaId: "69",
      cinemaName: "Top Ryde City",
      cinemaURL: "/Cinema/Top-Ryde-City"
    },
    {
      cinemaState: "NSW",
      cinemaId: "9",
      cinemaName: "Tuggerah",
      cinemaURL: "/Cinema/Tuggerah"
    },
    {
      cinemaState: "NSW",
      cinemaId: "11",
      cinemaName: "Wollongong",
      cinemaURL: "/Cinema/Wollongong"
    }
  ])
);
describe("cinemas-from-state", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Happy path", async () => {
    const sampleResult = {
      cinemaState: "NSW",
      cinemaId: "69",
      cinemaName: "Top Ryde City",
      cinemaURL: "/Cinema/Top-Ryde-City"
    };

    const cinemas = await cinemasfromState(page, "NSW");
    expect(cinemas).toContainEqual(sampleResult);
  });

  test("page.evaluate() called correctly", async () => {
    await cinemasfromState(page, "NSW");
    expect(page.evaluate).toBeCalledTimes(1);
    expect(page.evaluate).toBeCalledWith(
      expect.any(Function),
      "div[data-state=NSW] div.top-select-option a.eccheckbox",
      "NSW"
    );
  });
});

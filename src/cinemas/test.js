// this might be mandy too https://stackoverflow.com/questions/47953305/jest-passing-an-object-to-expect-tobecalledwith

import { cinemasfromState, allCinemas } from "./unbound";
import { puppeteer } from "puppetteer";

describe("cinemasfromState", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns expected value", async () => {
    //expected result from page.evaluate
    const expectedResultList = [
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
    ];

    const sampleResult = {
      cinemaState: "NSW",
      cinemaId: "69",
      cinemaName: "Top Ryde City",
      cinemaURL: "/Cinema/Top-Ryde-City"
    };
    //override the return value of the evaluate  function
    puppeteer.page.evaluate = jest.fn((selector, state) =>
      Promise.resolve(expectedResultList)
    );

    const cinemas = await cinemasfromState(puppeteer.page, "ACT");

    //expect(cinemas).toEqual(expectedResult);
    expect(cinemas).toContainEqual(sampleResult);
  });

  test.skip("page.click() called once", async () => {
    const cinemas = await cinemasfromState(puppeteer.page, null);
    expect(puppeteer.page.click).toBeCalledTimes(1);
  });

  test("page.evaluate() called correctly", async () => {
    //override the return value of the evaluate  function
    puppeteer.page = {
      click: jest.fn(() => Promise.resolve()),
      evaluate: jest.fn((selector, state) => Promise.resolve())
    };

    await cinemasfromState(puppeteer.page, "ACT");
    expect(puppeteer.page.evaluate).toBeCalledTimes(1);
    expect(puppeteer.page.evaluate).toBeCalledWith(
      expect.any(Function),
      "div[data-state=ACT] div.top-select-option a.eccheckbox",
      "ACT"
    );
  });
});

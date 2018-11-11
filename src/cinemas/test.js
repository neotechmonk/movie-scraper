// this might be mandy too https://stackoverflow.com/questions/47953305/jest-passing-an-object-to-expect-tobecalledwith

import { cinemasfromState, allCinemas } from "./unbound";
import { puppeteer } from "./__mocks__/puppetteer";

describe("cinemasfromState", () => {
  //setup mock for page.evaluate with generic return

  beforeEach(() => {
    puppeteer.page = {
      click: jest.fn(() => Promise.resolve()),
      evaluate: jest.fn(() => Promise.resolve())
    };
    puppeteer.page = puppeteer.page;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns expected value", async () => {
    //expected result from page.evaluate
    let expectedResult = [
      {
        cinemaState: "ACT",
        cinemaId: "13",
        cinemaName: "Manuka",
        cinemaURL: "/Cinema/Manuka"
      }
    ];
    //override the return value of the evaluate  function
    puppeteer.page.evaluate = jest.fn((selector, state) =>
      Promise.resolve(expectedResult)
    );

    //WORK
    const cinemas = await cinemasfromState(puppeteer.page, "ACT");

    //TEST
    expect(cinemas).toEqual(expectedResult);
  });

  it("page.click called once", async () => {
    const cinemas = await cinemasfromState(puppeteer.page, null);
    expect(puppeteer.page.click).toBeCalledTimes(1);
  });

  test.skip("page.evaluate called correctly ", async () => {
    //override the return value of the evaluate  function
    puppeteer.page = {
      click: jest.fn(() => Promise.resolve()),
      evaluate: jest.fn((selector, state) => Promise.resolve())
    };

    await cinemasfromState(puppeteer.page, "ACT");
    expect(puppeteer.page.evaluate).toBeCalledTimes(1);
    expect(puppeteer.page.evaluate).toBeCalledWith(
      "div[data-state=ACT] div.top-select-option a.eccheckbox",
      "ACT"
    );
  });
});

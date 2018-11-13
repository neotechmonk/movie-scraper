// this might be mandy too https://stackoverflow.com/questions/47953305/jest-passing-an-object-to-expect-tobecalledwith

import {default as  cinemasfromState } from "./cinemas-from-state";
import { puppeteer } from "puppetteer";

const page = puppeteer.page;

describe("cinemasfromState", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("happy path", async () => {
    const sampleResult = {
      cinemaState: "NSW",
      cinemaId: "69",
      cinemaName: "Top Ryde City",
      cinemaURL: "/Cinema/Top-Ryde-City"
    };

    const cinemas = await cinemasfromState(page, "NSW");

    //expect(cinemas).toEqual(expectedResult);
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

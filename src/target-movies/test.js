const scrape = require("./unbound");

import {
  urlStub,
  moviesStub,
  sessionsStub,
  moviesList,
  cinemaList,
  sessionResults
} from "./testData";

const puppeteer = require("../__mocks__/puppeteer");

describe("movies", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test.skip("happy path - taking too long ", async () => {
    const maxCinemasPerCycle = 5;

    const expectedcalls = cinemaList.length / maxCinemasPerCycle; //number of while loops to get through all the cinemas in the list
    const response = await scrape(
      {
        page: puppeteer.page,
        moviesFn: moviesStub,
        sessionsFn: sessionsStub,
        urlFn: urlStub
      },
      new Date(2018, 10, 24),
      //_cinemas.map(cin => cin.cinemaID),
      moviesList.map(({ movieID }) => movieID),
      cinemaList.map(({ cinemaID }) => cinemaID)
    );

    //test the movie Stube
    expect(moviesStub).toBeCalledTimes(1);
    // expect(response).toContainEqual(sessionResults);
  });
  test.skip("number of times cinemas are looped", () => {});
  test.skip("sessionsFn called with + number of times  ", () => {});
  test.skip("moviesFn called with + number of times   ", () => {});
  test.skip("url being called and with    ", () => {});
});

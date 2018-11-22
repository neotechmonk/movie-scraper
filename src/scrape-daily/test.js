const scrape = require("./unbound");

import {
  urlStub,
  moviesStub,
  sessionsStub,
  moviesList,
  cinemaList
} from "./testData";

const puppeteer = require("../__mocks__/puppeteer");

describe("movies", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("happy path", async () => {
    const maxCinemasPerCycle = 5;

    const expectedcalls = cinemaList.length / maxCinemasPerCycle; //number of while loops to get through all the cinemas in the list
    const response = await scrape(
      {
        page: puppeteer.page,
        movies: moviesStub,
        sessions: sessionsStub,
        url: urlStub
      },
      new Date(2018, 10, 22),
      //_cinemas.map(cin => cin.cinemaID),
      moviesList.map(({ movieID }) => movieID),
      cinemaList.map(({ cinemaID }) => cinemaID)
    );

    //test the movie Stube
    expect(moviesStub).toBeCalledTimes(1);
    expect(response).toEqual([]);
  });
});

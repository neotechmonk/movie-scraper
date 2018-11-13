//setup mock for page.evaluate with generic return
const page = {
  click: jest.fn(() => Promise.resolve()),
  evaluate: jest.fn((selector, state) =>
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
  ),
  setViewPort: jest.fn(() => Promise.resolve()),
  goto: jest.fn(() => Promise.resolve()),
  waitFor: jest.fn(() => Promise.resolve()),
  $eval: jest.fn(() => Promise.resolve()),
  close: jest.fn(() => Promise.resolve())
};

const puppeteer = {
  page: page,

  launch: jest.fn(() =>
    Promise.resolve({ newPage: jest.fn(() => Promise.resolve(page)) })
  )
};

export { puppeteer };

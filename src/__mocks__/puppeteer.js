//setup mock for page.evaluate with generic return
const page = {
  click: jest.fn(() => Promise.resolve()),
  evaluate: jest.fn((selector, state) => Promise.resolve()),
  setViewPort: jest.fn(() => Promise.resolve()),
  goto: jest.fn(() => Promise.resolve()),
  waitFor: jest.fn(() => Promise.resolve()),
  $eval: jest.fn(() => Promise.resolve()),
  close: jest.fn(() => Promise.resolve()),
  setRequestInterception: jest.fn(() => Promise.resolve()),
  on: jest.fn(() => Promise.resolve())
};

module.exports = {
  page: page,

  launch: jest.fn(() =>
    Promise.resolve({ newPage: jest.fn(() => Promise.resolve(page)) })
  )
};

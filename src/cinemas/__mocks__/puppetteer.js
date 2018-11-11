//setup mock for page.evaluate with generic return
const puppeteer = {
  page: {
    click: jest.fn(() => Promise.resolve()),
    evaluate: jest.fn(() => Promise.resolve())
  }
};

export { puppeteer };

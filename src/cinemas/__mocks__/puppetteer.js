const puppeteer = {
  page: {
    click: jest.fn(() => Promise.resolve()),
    evaluate: jest.fn(() => Promise.resolve())
  }
};
module.exports = {
  puppeteer
};

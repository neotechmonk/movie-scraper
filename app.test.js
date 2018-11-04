const app = require("./app");

describe("Helper functions", () => {
  it("Create Base URL for the Cinema site with Date in the URL", () => {
    let testSessionDate = new Date();
    const testURL = `https://www.eventcinemas.com.au/Sessions#movies=12334,12326&date=2018-11-04`;

    expect(app.createURL(testSessionDate)).toBe(testURL);
  });
});

//refactor
it("calls the cinema site correctly", () => {
  let isfakeCallMade = false;
  const makeFakeCall = url => {
    expect(url).toBe(
      "https://www.eventcinemas.com.au/Sessions#movies=12334,12326&date=DATE"
    );
    isfakeCallMade = true;
  };
  //app.default();
});

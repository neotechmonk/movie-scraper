import { cinemasfromState, allCinemas } from "./unbound";

describe("cinemasfromState", () => {
  //setup mock for page.evaluate with generic return
  let page_mock = {
    click: jest.fn(() => Promise.resolve()),
    evaluate: jest.fn(() => Promise.resolve(t))
  };

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
    page_mock.evaluate = jest.fn((selector, state) =>
      Promise.resolve(expectedResult)
    );

    //WORK
    const cinemas = await cinemasfromState(page_mock, "ACT");

    //TEST
    expect(cinemas).toEqual(expectedResult);
  });

  it("page.click called once", async () => {
    const cinemas = await cinemasfromState(page_mock, null);
    expect(page_mock.click).toBeCalledTimes(1);
  })

  it("page.evaluate called correctly ", async () => {
    
    //override the return value of the evaluate  function
    page_mock.evaluate = jest.fn((selector, state) =>
    
      Promise.resolve( {})
    );

    //WORK
    const cinemas = await cinemasfromState(page_mock, null);
        expect(page_mock.evaluate).toBeCalledTimes(1);
        
     expect(page_mock.evaluate).toBeCalledWith(
      "div[data-state=ACT] div.top-select-option a.eccheckbox",
      "ACT"
    );
  });
});

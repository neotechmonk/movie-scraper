// ! https://stackoverflow.com/questions/11318972/stubbing-a-mongoose-model-with-sinon

const Cinema = require("./Cinema");
const testResults = require("./Cinema.test.data");
const sinon = require("sinon");

describe("Cinema", function() {
  it("should be invalid if required fields are empty", function(done) {
    let cinema = new Cinema();
    cinema.validate(function(err) {
      expect(err.errors.ID).toBeTruthy;
      expect(err.errors.state).toBeTruthy;
      expect(err.errors.name).toBeTruthy;
      done();
    });
  });
  test.skip("instantiating a new Model object", () => {});
  test.skip("save non dupe ", () => {});
  test.skip("save dupe", () => {});
  test.skip("findOne", () => {});
  test.skip("find", () => {});
  test.skip("update", () => {});

  //   it("cinemas - findOne() with name", function() {
  //     // Cinema.findOne = jest.fn(async () =>
  //     //   Promise.resolve(
  //     //     {
  //     //       cinemaState: "ACT",
  //     //       cinemaId: "13",
  //     //       cinemaName: "Manuka",
  //     //       cinemaURL: "/Cinema/Manuka"
  //     //     }
  //     //     //testResults.validCinemas().filter(val => {val.cinemaName === "Manuka";})
  //     //   )
  //     // );
  // //https://stackoverflow.com/questions/27847377/using-sinon-to-stub-chained-mongoose-calls?answertab=active#tab-top
  //     Cinema.findOne = jest.fn(()=> {return {
  //       where: function() {
  //         return this;
  //       },
  //       equals: function() {
  //         return this;
  //       },
  //       exec: function(callback) {
  //         callback(null, "Fake expected value");
  //       }
  //     });
  //     const res = Cinema.findOne({ name: "Manuka" });
  //     expect(res).toEqual({
  //       cinemaState: "ACT",
  //       cinemaId: "13",
  //       cinemaName: "Manuka",
  //       cinemaURL: "/Cinema/Manuka"
  //     });
  //   });

  // it(
  //   "should check for cinemas with same name",
  //   sinon.test(function() {
  //     this.stub(Cinema, "findOne");
  //     const expectedName = "Manuka";
  //     let c = new Cinema({ name: expectedName });

  //     c.checkForReposts(function() {});

  //     sinon.assert.calledWith(Cinema.findOne, {
  //       name: expectedName
  //     });
  //   })
  // );
});

import * as cinemas from "./unbound";

const sinon = require("sinon");

describe("cinemasfromState", () => {
  //is.skip("Response doesnt have duplicate cinemas ", () => {});
  it(
    "should test something",
    sinon.test(function() {
      var successResults = [
        {
          cinemaState: "ACT",
          cinemaId: "13",
          cinemaName: "Manuka",
          cinemaURL: "/Cinema/Manuka"
        }
       ];
      
      //item #1
      var cinemaResults = {
        //item #2
        evaluate: this.stub()
      };
      //item #3
      cinemaResults.evaluate.resolves(successResults);
      //now we just stub out Profile.findOne
      this.stub(Profile, "findOne").returns(findOneResult);
    })
  );
});

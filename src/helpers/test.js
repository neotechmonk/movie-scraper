import * as helper from "./helpers";
import { isBoolean } from "util";

describe("helpers", () => {
  test("getEnvironmentSetting()", async () => {
    const res = helper.getEnvironmentSetting("NODE_ENV");
    expect(res).toBeTruthy;
    expect(typeof res).toBe("string");
  });
  test("isDevelopmentMode()", async () => {
    const res = helper.isDevelopmentMode();
    expect(typeof res).toBe("boolean");
  });

  test("selectorBuilder() - Substitute one value", async () => {
    const res = helper.selectorBuilder({
      template: "prefix>(MOVIE_INDEX)>suffix",
      parameters: [{ key: "MOVIE_INDEX", value: 3 }]
    });
    expect(res).toBe("prefix>(3)>suffix");
  });
  test("selectorBuilder() - Substitute multi value", async () => {
    const res = helper.selectorBuilder({
      template: "prefix>(MOVIE_INDEX):CINEMA_INDEX>suffix",
      parameters: [
        { key: "MOVIE_INDEX", value: 3 },
        { key: "CINEMA_INDEX", value: 31 }
      ]
    });
    expect(res).toBe("prefix>(3):31>suffix");
  });
});

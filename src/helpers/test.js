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
});

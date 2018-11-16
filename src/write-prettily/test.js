import { default as writePretty } from "./unbound";
import { REFUSED } from "dns";

describe("write-prettily", () => {
  const fakeFS = {
    writeFileSync: jest.fn(() => true),
    existsSync: jest.fn(() => true),
    mkdirSync: jest.fn(() => true)
  };

  const inputObject = {
    outerProp: "outerProp",
    innerObj: { innnerProp: "innnerProp" }
  };

  const isJSON = str => {
    try {
      const json = JSON.parse(str);
      if (Object.prototype.toString.call(json).slice(8, -1) !== "Object") {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  };

  test("happy parth", async () => {
    const expectedResult = {
      filePath: "jsonObject",
      json: "{}"
    };

    const path = "output";
    const res = writePretty({ fs: fakeFS }, path, "jsonObject", inputObject);
    expect(res).toHaveProperty("filePath");
    expect(res.filePath).toBeDefined;
    expect(res).toHaveProperty("json");
    expect(typeof res.json).toEqual("string");
    expect(isJSON(res.json)).toEqual(true);
  });
});

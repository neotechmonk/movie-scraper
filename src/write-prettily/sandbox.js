import { default as writePretty } from "./unbound";
const inputObject = {
  outerProp: "outerProp",
  innerObj: { innnerProp: "innnerProp" }
};

console.log(
  writePretty({ fs: require("fs"), R: require("ramda") }, "output\\", "jsonFile.json", inputObject)
);

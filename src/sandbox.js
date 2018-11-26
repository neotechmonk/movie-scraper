import { default as writePretty } from "./write-prettily";
const inputObject = {
  outerProp: "outerProp",
  innerObj: { innnerProp: "innnerProp" }
};

console.log(writePretty("output\\", "jsonFile.json", inputObject));

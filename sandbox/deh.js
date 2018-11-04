var list = ["h", "e", "l", "l", "o"];
const shit = "shit";
list.map(async (currElement, index) => {
  console.log("The current iteration is: " + index);
  console.log("The current element is: " + currElement + shit);
  console.log("\n");
  return "X";
});

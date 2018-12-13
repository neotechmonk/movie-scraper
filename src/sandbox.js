const {
  map,
  mergeAll,
  groupWith,
  eqBy,
  prop,
  concat,
  sortBy,
  pipe
} = require("ramda");

const metaObjects = [
  { id: 1, metaProp: "metaProp1" },
  { id: 2, metaProp: "metaProp2" }
];

const justObjects = [
  { id: 1, justProp: "justProp1" },
  { id: 2, justProp: "justProp2" }
];

const process = pipe(
  concat,
  sortBy(prop("id")),
  groupWith(eqBy(prop("id"))),
  map(mergeAll)
);

console.log(process(metaObjects, justObjects));

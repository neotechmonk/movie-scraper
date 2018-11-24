import { default as normalise } from "./unbound";

(async () => {

  const res  = normalise()
  console.log(`Result is ${JSON.stringify(res, null, 2)}`);
   
  // require("../write-prettily")({ fs: require("fs") }, "output", "jsonFile.json", res)

})();

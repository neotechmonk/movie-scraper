import * as R from "ramda";

export default function writeJSONToDisk({ fs }, path = "", fileName, obj) {
  const json = JSON.stringify(obj, null, 2);

  fileName = R.endsWith(".json", fileName)
    ? fileName
    : R.concat(".json", fileName);

  //TODO implement saving in the root of the app
  //const rootPath = require("path").dirname(require.main.filename);
  let root = global.__basedir ? global.__basedir + "\\" : __dirname + "\\";

  path =
    path.length > 0 && R.endsWith("\\", path)
      ? R.concat(root, path)
      : R.concat(root, "\\", path);

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  fs.writeFileSync(R.concat(path, fileName), json, "utf8");

  return {
    filePath: R.concat(path, fileName),
    json: json
  };
}

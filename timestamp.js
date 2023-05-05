var fs = require("fs");
const d = new Date();

const obj = { timestamp: d };
var json = JSON.stringify(obj);
let callback = (err, data) => {};
fs.writeFile("./dist/assets/timestamp.json", json, "utf8", callback);

// synchronous work => f1 read next

let fs = require("fs");
console.log("Started Reading f1.mkv");
console.log("CPU is stuck till file is read");
let data = fs.readFileSync("../../f1.mkv");
console.log("File1");
console.log(data.byteLength);
let data1 = fs.readFileSync("../../f2.mkv");
console.log("File2");
console.log(data1.byteLength);
console.log("CPU is now free");
console.log("Now i can do some other work.");

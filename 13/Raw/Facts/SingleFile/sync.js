// synchronous work => f1 read next

let fs = require("fs");
console.log("Started Reading f1.mkv");
console.log("CPU is stuck till file is read");
let data = fs.readFileSync("../f1.mkv");
// let data1 = fs.readFileSync("../f2.mkv");
console.log(data.byteLength);
// console.log(data1.byteLength);
console.log("CPU is now free");
console.log("Now i can do some other work.");

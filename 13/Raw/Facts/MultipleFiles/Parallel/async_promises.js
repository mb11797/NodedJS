let fs = require("fs");
console.log("Started reading f1.mkv");
console.log("CPU is stuck till file is read");

fs.promises.readFile("../../f1.txt").then(function(data){
    console.log("File1");
    console.log(data.byteLength);
}).catch(function(err){
    console.log(err);
})

fs.promises.readFile("../../f2.txt").then(function(data){
    console.log("File2");
    console.log(data.byteLength);
}).catch(function(err){
    console.log(err);
})

console.log("CPU is now free");
console.log("Now i can do some other work.");
console.log("Hello");
console.log("After");
console.log("*****************************");

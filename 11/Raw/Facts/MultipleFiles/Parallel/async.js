let fs = require("fs");
console.log("Started reading f1.mkv");
console.log("CPU is stuck till file is read");

fs.readFile("../../f1.mkv", function(err, data){
    console.log("File1");
    console.log(data.byteLength);
})

fs.readFile("../../f1.mkv", function(err, data){
    console.log("File2");
    console.log(data.byteLength);
})

console.log("CPU is now free");
console.log("Now i can do some other work.");
delayFor5();

function delayFor5(){
    let newTime = Date.now() + 1000*5;
    while(Date.now() < newTime);
}
console.log("Hello");
console.log("After");
console.log("*****************************");

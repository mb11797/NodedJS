let fs = require("fs");

// Normal Sync prog
// console.log("starting file read");
// let file = fs.readFileSync("index.html", "utf-8");
// console.log(file);
// console.log("stuck till file read");

// Async prog - divides work into multiple threads
//we dont need to handle threading, nodejs will hande it
console.log("starting file read");
//start
fs.readFile("index.html", function(err, data){
    console.log(data + "");
});
//jab reading khatam ho jaye toh ye function call kardena
//move to next work
console.log("stuck till file is read");
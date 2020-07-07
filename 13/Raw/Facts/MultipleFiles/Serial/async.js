let fs = require("fs");
// before
console.log("Started reading f1.mkv");
console.log("CPU is stuck till file is read");


//***********************background node APIs***********************
//callback hell
fs.readFile("../../f1.mkv", function(err, data){
    console.log("File1");
    console.log(data.byteLength);
    fs.readFile("../../f2.mkv", function(err, data){
        console.log("File2");
        console.log(data.byteLength);
        fs.readFile("f1.txt", function(err, data){
            console.log("f1.txt");
            fs.readFile("f2.txt", function(err, data){
                console.log("f2.txt");
                fs.readFile("f3.txt", function(err, data){
                    console.log("f3.txt");
                })
            });
        })
    })    
    console.log("File2 fn was async thats why i was printed first bcz file2 fn transferred to node api");
})

// after
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

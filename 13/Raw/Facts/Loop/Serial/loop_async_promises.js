let fs = require("fs");

let files = ["../../f1.txt", "../../f2.txt", "../../f3.txt", "../../f4.txt", "../../f5.txt"];

let gi;         //global i
let fileReadPromise = fs.promises.readFile(files[0]);
function fileReader(){
    for(let i=1; i<files.length; i++){
        fileReadPromise = fileReadPromise.then(function(data){
            // console.log(`File ${i+1}`);
            // console.log(data.byteLength);
            console.log(`File ${i} : ${data.byteLength}`);
            return fs.promises.readFile(files[i]);
        })
        gi = i;
    }
    return fileReadPromise;
}

fileReader().then(function(data){
    console.log("Outside for");
    // console.log(data.byteLength);
    console.log(`File ${gi+1} : ${data.byteLength}`);
})
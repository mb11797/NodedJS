let fs = require('fs');

//async prog used to readFile
// fs.readFile("index.html", function(err, data){
//     console.log(data + "");
// });

// alternate to async function fs.readFile()
//fs.promises.readFile() returns you a promise as soon as the work is complete
//promise
// let fileWillBeReadPromise = fs.promises.readFile("index.html");
let fileWillBeReadPromise = fs.promises.readFile("index1.html");


//if promised work done / promise fulfilled, then do some work/run some function
//fulfill
fileWillBeReadPromise.then(function(data){
    console.log(data);
});

//if promised work is not done/fulfilled, a catch is encountered then for which some work is done/err is shown/some function is run
//reject
fileWillBeReadPromise.catch(function(err){
    console.log(err);
});

console.log("Extra Work");
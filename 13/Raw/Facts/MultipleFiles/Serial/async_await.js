let fs = require("fs");

// Library => callback => promise
function promisify_fs(fname) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fname, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

//Sequential
console.log("Before");
async function myFn() {
    console.log(await promisify_fs("../../f1.txt"));
    console.log(await promisify_fs("../../f2.txt"));
    console.log(await promisify_fs("../../f3.txt"));
    console.log(await promisify_fs("../../f4.txt"));
}
myFn();
console.log("After");

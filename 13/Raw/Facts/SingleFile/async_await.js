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

// async function myFn(){
//     try{
//         let ans = await promisify_fs("../f1.txt");
//         console.log(ans.byteLength);
//     }catch(err){
//         console.log(err);
//     }
// }

// myFn();


console.log("Before");
async function myFn() {
    let ans = await promisify_fs("../f1.txt");
    console.log(ans.byteLength);
}
myFn();
console.log("After");

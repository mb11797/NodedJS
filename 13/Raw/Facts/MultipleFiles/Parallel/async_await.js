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

//Parallely
console.log("Before");
async function myFn() {
    // pofF1 => promiseOfFile1
    let pofF1 = promisify_fs("../../f1.txt");
    let pofF2 = promisify_fs("../../f2.txt");
    console.log(pofF1);             // will give pending promise
    let bofP1 = await pofF1;        // jab tak pofF1 resolve nhn hoga tab tak aage ka code nhn chalega, 
                                    // ya aise bhi keh sakte hain ki await ki agli line se saara code then ke andar aa gaya hai
    console.log("Length of File1 : " + bofP1.byteLength);
    let pofF3 = promisify_fs("../../f3.txt");
    let pofF4 = promisify_fs("../../f4.txt");
    let pofF5 = promisify_fs("../../f5.txt");
    let bofP3 = await pofF3;        // jab tak pofF3 resolve nhn hoga tab tak aage ka code nhn chalega, 
                                    // ya aise bhi keh sakte hain ki await ki agli line se saara code then ke andar aa gaya hai
    console.log("Length of File3 : " + bofP3.byteLength);
    let bofP4 = await pofF4;        // jab tak pofF4 resolve nhn hoga tab tak aage ka code nhn chalega, 
                                    // ya aise bhi keh sakte hain ki await ki agli line se saara code then ke andar aa gaya hai
    console.log("Length of File4 : " + bofP4.byteLength);
}
myFn();
console.log("After");
// await => then sweeter
// await => async
// async fn => await => no sync code will not wait

// async fn => promise creation easier syntax
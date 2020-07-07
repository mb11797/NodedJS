let fs = require('fs');

// Library => callback => promise
function promisify_fs(fname){
    return new Promise(function(resolve, reject){
        fs.readFile(fname, function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}

// // Method 1
// // User
// //promise
// let readFilePromise = promisify_fs("../f1.txt");
// // resolve, fulfil
// readFilePromise.then(function(data){
//     console.log(data.byteLength);
// })

// // reject
// readFilePromise.catch(function(err){
//     console.log(err);
// })


// // Method 2
// // User
// //promise
// //then with fcb on first then
// let readFilePromise = promisify_fs("./f1.txt");
// // resolve, fulfil
// readFilePromise.then(function scb(data){
//     console.log(data.byteLength);
// }, function fcb(err){
//     console.log("error catched by fcb of first then");
//     console.log(err);
// }).then(function(){

// })


// // Method 3
// // User
// //promise
// // fcb on 2nd then
// let readFilePromise = promisify_fs("./f1.txt");
// // resolve, fulfil
// readFilePromise.then(function scb(data){
//     console.log(data.byteLength);
// }).then(function scb(){

// }, function fcb(err){
//     console.log("error Catched by fcb of 2nd then")
//     console.log(err);
// })

// // Method 4
// // User
// //promise
// // // with catch on 2nd then
// let readFilePromise = promisify_fs("./f1.txt");
// // resolve, fulfil
// readFilePromise.then(function scb(data){
//     console.log(data.byteLength);
// }).then(function scb(){

// }).catch(function fcb(err){
//     console.log("error Catched by catch of 2nd then")
//     console.log(err);
// })


// // Method 5
// // User
// //promise
// let readFilePromise = promisify_fs("./f1.txt");
// // resolve, fulfil
// readFilePromise.then(function scb(data){
//     console.log(data.byteLength);
//     // return Promise.reject("ansjskd");
//     return undefined;
//     // return 4;
//     // return null;
// }).then(function(value){
//     console.log("inside then");
//     console.log(value);
// }).catch(function(err){
//     console.log("inside catch");
//     console.log(err);
// })

// Method 6
// library
function promisify_SetTimeout(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("Now promise has resolved");
        }, 5000);
    })
}

// User
//promise
let readFilePromise = promisify_fs("../f1.txt");
// resolve, fulfil
readFilePromise.then(function scb(data){
    console.log(data.byteLength);
    // return Promise.reject("ansjskd");
    // return undefined;
    // return 4;
    // return null;
    console.log("Ran scb");
    let pendingPromise = promisify_SetTimeout();
    return pendingPromise;
}).then(function(value){
    console.log("inside then");
    console.log(value);
}).catch(function(err){
    console.log("inside catch");
    console.log(err);
})


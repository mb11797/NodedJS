let fs = require("fs").promises;

let f1ReadPromise = fs.readFile("../f1.txt");
f1ReadPromise.then(function(data){
    if(data.byteLength > 10){
        return fs.promises.readFile("../f2.txt").then(function(data){
            let flag = false;
            if(data.byteLength > 30){
                flag = true;
            }
            return {
                cFileRead: 1,
                flag: flag
            }
        })
    }
    else{
        return fs.promises.readFile("../f3.txt").then(function(data){
            let flag = false;
            if(data.byteLength < 20){
                flag = true;
            }
            return {
                cFileRead: 2,
                flag: flag
            }
        })
    }
}).then(function(){
    //read 4 more files

    
})


// function f7cb(data){
//     console.log(`File7 : ${data.byteLength}`);
// }

// function f6cb(data){
//     console.log(`File6 : ${data.byteLength}`);
// }

// function f5cb(data){
//     console.log(`File5 : ${data.byteLength}`);
// }

// function f4cb(data){
//     console.log(`File4 : ${data.byteLength}`);
// }

// function f3cb(data){
//     console.log(`File3 : ${data.byteLength}`);
//     if(data.byteLength > 20){
//         fs.readFile("../f6.txt").then(f6cb);
//     }
//     else{
//         fs.readFile("../f7.txt").then(f7cb);
//     }
// }

// function f2cb(data){
//     console.log(`File2 : ${data.byteLength}`);
//     if(data.byteLength < 30){
//         fs.readFile("../f4.txt").then(f4cb);
//     }
//     else{
//         fs.readFile("../f5.txt").then(f5cb);
//     }
// }

// function f1cb(data){
//     console.log(`File1 : ${data.byteLength}`);
//     if(data.byteLength > 10){
//         fs.readFile("../f2.txt").then(f2cb);
//     }
//     else{
//         fs.readFile("../f3.txt").then(f3cb);
//     }
// }

// fs.readFile("../f1.txt").then(f1cb);
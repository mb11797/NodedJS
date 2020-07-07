let fs = require("fs");

function f7cb(err, data){
    console.log(`File7 : ${data.byteLength}`);
}

function f6cb(err, data){
    console.log(`File6 : ${data.byteLength}`);
}

function f5cb(err, data){
    console.log(`File5 : ${data.byteLength}`);
}

function f4cb(err, data){
    console.log(`File4 : ${data.byteLength}`);
}

function f3cb(err, data){
    console.log(`File3 : ${data.byteLength}`);
    if(data.byteLength > 20){
        fs.readFile("../f6.txt", f6cb);
    }
    else{
        fs.readFile("../f7.txt", f7cb);
    }
}

function f2cb(err, data){
    console.log(`File2 : ${data.byteLength}`);
    if(data.byteLength < 30){
        fs.readFile("../f4.txt", f4cb);
    }
    else{
        fs.readFile("../f5.txt", f5cb);
    }
}

function f1cb(err, data){
    console.log(`File1 : ${data.byteLength}`);
    if(data.byteLength > 10){
        fs.readFile("../f2.txt", f2cb);
    }
    else{
        fs.readFile("../f3.txt", f3cb);
    }
}

fs.readFile("../f1.txt", f1cb);
let fs = require("fs");
fs.readFile("../f1.txt", function(err, data){
    // console.log(data.byteLength);
    let l1 = data.byteLength;
    console.log(`File1 : ${l1}`);
    if(l1>10){
        fs.readFile("../f2.txt", function(err, data){
            let l2 = data.byteLength;
            console.log(`File2 : ${l2}`);
            if(l2<30){
                fs.readFile("../f4.txt", function(err, data){
                    console.log(`File4 : ${data.byteLength}`);
                });
            }
            else{
                fs.readFile("../f5.txt", function(err, data){
                    console.log(`File5 : ${data.byteLength}`);
                });
            }
        });
    }
    else{
        fs.readFile("../f3.txt", function(err, data){
            let l3 = data.byteLength;
            console.log(`File3 : ${l3}`);
            if(l3>20){
                fs.readFile("../f6.txt", function(err, data){
                    console.log(`File6 : ${data.byteLength}`);
                });
            }
            else{
                fs.readFile("../f7.txt", function(err, data){
                    console.log(`File7 : ${data.byteLength}`);
                });
            }
        });
    }
});


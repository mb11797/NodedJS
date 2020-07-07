let fs = require("fs");
let files = ["../../f1.txt", "../../f2.txt", "../../f3.txt", "../../f4.txt", "../../f5.txt"];

printParallely(files, 0);

function printParallely(files, i){
    if(i == files.length)
        return;
    
    fs.readFile(files[i], function(err, data){
        console.log(`data of file ${files[i]} :  ${data.length}`);
    })
    printParallely(files, i+1);
}


let fs = require("fs");
let files = ["../../f1.mkv", "../../f2.mkv", "f1.txt", "f2.txt", "f3.txt"];
for(let i=0; i<files.length; i++){
    let data = fs.readFileSync(files[i]);
    console.log(`data of file ${files[i]} :  ${data.length}`);
}

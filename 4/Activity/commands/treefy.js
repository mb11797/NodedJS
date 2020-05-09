let fs = require("fs");
let path = require("path");

//actual arguments jo hain vo function ke formal parametersme nhn aate JS me, rather arguments array me aate hain
module.exports.treefy = function(){
    let src = arguments[0] 
    let dest = arguments[1]
    // console.log("Treefy Command is implemented");
    let buffer = fs.readFileSync(path.join(src, "metadata.json"));
    // console.log(buffer);            //hexadecimal values of binary data
    // data hamesha binary format me store hota hai, jiski wajah se read bhi vo binary format me hota hai, aur user ko dikhane ke liye system usko hexadecimal me convert kardeta hai...
    // so in order for us to use it in some specific application, we need to parse it accordingly to the respective parser...

    let json = JSON.parse(buffer);      
    // console.log(json);
    treefyHandler(src, dest, json);
}

function treefyHandler(src, dest, node){
    let isFile = node.isFile;
    if(isFile == true){
        //file create using original name
        //then, data copy
        let srcFilePath = path.join(src, node.newName);
        let destFilePath = path.join(dest, node.originalName);
        fs.copyFileSync(srcFilePath, destFilePath);
        console.log(`File copied from ${srcFilePath} to ${destFilePath}`);
    }
    else{
        //create directory
        let dirName = node.name;
        // console.log(dirName);
        let createdDirPath = path.join(dest, dirName);
        if(!fs.existsSync(createdDirPath)){
            fs.mkdirSync(createdDirPath);
        }
        console.log(`Directory created at ${createdDirPath}`);
        //visit children
        for(let i=0; i<node.children.length; i++){
            let child = node.children[i];
            let child_dest = createdDirPath;
            treefyHandler(src, child_dest, child);
        }
    }
}
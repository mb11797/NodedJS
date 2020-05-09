let fs = require("fs");
let path = require("path");
var uniqid = require('uniqid');

//actual arguments jo hain vo function ke formal parametersme nhn aate JS me, rather arguments array me aate hain
module.exports.untreefy = function(){
    let src = arguments[0] 
    let dest = arguments[1]
    let root = {};
    untreefyHandler(src, dest, root);
    // console.log("Untreefy Command is implemented");
    // console.log(root);
    fs.writeFileSync(`${dest}/metadata.json`, JSON.stringify(root));
}

//f1.txt
//d10
//d10/d20/f1.txt

//1. copy work
function untreefyHandler(src, dest, node){
    let isFile = fs.lstatSync(src).isFile();
    if(isFile){
        //Data copy:
        //copy: src=>dest
        // console.log(uniqid());
        //copy each file from d10 files in dest with unique names
        let newFileName = uniqid();
        let destPath = path.join(dest, newFileName);
        fs.copyFileSync(src, destPath);
        // console.log("Data coped from " + src + " to " + destPath);
        //new and easy way to write on console with variables: using backticks from keyboard instead of single or double quotes
        console.log(`Data copied from ${src} to ${destPath}`);          //backticks
        //it works in multiple lines also
        // console.log(`Data copied 
        // from ${src} to ${destPath}`);
        // But normal double quote string does not work i multiple lines:
        // console.log("Data coped 
        // from " + src + " to " + destPath);       //wrong way, not allowed
        //Information store:
        node.isFile = true;
        node.originalName = path.basename(src);
        node.newName = newFileName;
    }
    else{
        //Information store:
        node.isFile = false;
        node.children = [];
        node.name = path.basename(src);

        //content read
        let content = fs.readdirSync(src);

        //recursion
        for(let i=0; i<content.length; i++){
            let child = content[i];
            let child_obj = {};
            let cPath = path.join(src, child);
            untreefyHandler(cPath, dest, child_obj);
            node.children.push(child_obj);
        }
    }
}

//2. store file structure infromation in metadata.json


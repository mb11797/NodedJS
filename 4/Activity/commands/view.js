let fs = require("fs");
let path = require("path");

//actual arguments jo hain vo function ke formal parametersme nhn aate JS me, rather arguments array me aate hain
module.exports.view = function(){
    let src = arguments[0] 
    let args = arguments[1]
    // console.log("View Command is implemented");
    if(args=="-t"){
        viewAsTree(src, "");
    }else if(args == "-f"){
        viewAsFlatFile(src);
    }
    else {
        console.log("Wrong Argument");
    }
}

function viewAsTree(src, psf){
    // console.log("viewAsTree is implemented.");
    let isFile = fs.lstatSync(src).isFile();
    let name = path.basename(src);
    if(isFile == true){
        console.log(psf + "/" + name + "*");
    }
    else{
        console.log(psf + "/" + name);
        // read content src
        // further call fslist
        let content = fs.readdirSync(src);
        for(let i=0; i<content.length; i++){
            let child = content[i];
            // let cPath = src + "/" + child;          //not standard way, bcz linux, windows, mac use diff. ways for "/"
            let cPath = path.join(src, child);         //standard way
            viewAsTree(cPath, psf + "|---");
        }
    }
}

function viewAsFlatFile(src){
    let isFile = fs.lstatSync(src).isFile();
    if(isFile == true){
        console.log(src + "*");
    }
    else{
        console.log(src);
        // read content src
        // further call fslist
        let content = fs.readdirSync(src);
        for(let i=0; i<content.length; i++){
            let child = content[i];
            // let cPath = src + "/" + child;          //not standard way, bcz linux, windows, mac use diff. ways for "/"
            let cPath = path.join(src, child);         //standard way
            viewAsFlatFile(cPath);
        }
    }
}


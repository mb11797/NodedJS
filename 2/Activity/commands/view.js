//actual arguments jo hain vo function ke formal parametersme nhn aate JS me, rather arguments array me aate hain
module.exports.view = function(){
    let src = arguments[0] 
    let args = arguments[1]
    console.log("View Command is implemented");
    if(args=="-t"){
        viewAsTree();
    }else if(args == "-f"){
        viewAsFlatFile();
    }
    else {
        console.log("Wrong Argument");
    }
}

function viewAsTree(){
    console.log("viewAsTree is implemented.");
}

function viewAsFlatFile(){
    console.log("viewAsFlatFile is implemented.");
}


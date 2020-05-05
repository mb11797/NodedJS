//Callbacks - calling resp fns based on your ans


//server
//=> use nodejs
let  {exec} = require("child_process")

function server(data, scb, fcb){
    if(data%2==1){
        scb();
    }
    else{
        fcb();
    }
}

//client
function successcb(){
    console.log("Number is odd");
    exec('google-chrome').unref()
}

function failurecb(){
    console.log("Number is even");
    exec('gnome-calculator').unref()
}

server(10, successcb, failurecb)
server(11, successcb, failurecb)


//How to open external programs through nodejs



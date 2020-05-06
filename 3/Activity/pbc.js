//actual arguments jo hain vo function ke formal parametersme nhn aate JS me, rather arguments array me aate hain
//actual source of truth is arguments array
let {help} = require("./commands/help");
let {untreefy} = require("./commands/untreefy");
let {treefy} = require("./commands/treefy");
let {view} = require("./commands/view");

let cmd = process.argv[2];

//node pbc view src -t
//node pbc view src -f

switch(cmd){
    case "view": 
        view(process.argv[3], process.argv[4]);
        break;

    case "treefy":
        treefy(process.argv[3], process.argv[4]); 
        break;
    case "untreefy":
        untreefy(process.argv[3], process.argv[4]); 
        break;
    case "help": 
        help();
        break;
    default: 
        console.log("Wrong Command");
        break;
}
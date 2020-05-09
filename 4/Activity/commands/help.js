//code export
//actual arguments jo hain vo function ke formal parametersme nhn aate JS me, rather arguments array me aate hain
module.exports.help = function(){
    let src = arguments[0] 
    let dest = arguments[1]
    // console.log("Help Command is implemented");
    
    // for multiple line string => use backticks (prints string in actual written form)
    console.log(`Help is utility to all commands:
    1. View as Tree => node pbc view src -t
    2. View as List => node pbc view src -f
    3. untreefy => node pbc unreefy src dest
    4. treefy => node pbc treefy src dest
    `);
};
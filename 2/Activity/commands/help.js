//actual arguments jo hain vo function ke formal parametersme nhn aate JS me, rather arguments array me aate hain
module.exports.help = function(){
    let src = arguments[0] 
    let dest = arguments[1]
    console.log("Help Command is implemented");
}
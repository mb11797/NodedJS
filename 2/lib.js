//client use karega
//lib.js provide karegi cheezon ko

//to accept lib.js code in client.js :
//module.exports - inbulit object
module.exports.exportedfn = function(){
    console.log("I was exported from lib file");
};

module.exports.anotherfn = function(){
    console.log("I was also exported");
};

module.exports.myprop = "i have a great value";

//only properties or functions or values or variables with module.exports will be exported

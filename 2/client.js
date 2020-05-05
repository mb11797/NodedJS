//client use karega
//lib.js provide karegi cheezon ko

// //1 level up
// require("../lib")

// //2 levels up
// require(".../lib")

//Method 1
//0 level up
let library = require("./lib");         
//only properties or functions or values or variables with module.exports will be exported

library.exportedfn();
library.exportedfn();
console.log(library.myprop);

//Method 2
let {exportedfn, anotherfn, myprop} = require("./lib");         
//only properties or functions or values or variables with module.exports will be exported

exportedfn();
exportedfn();
console.log(myprop);

// function statement
function sayHi(whatToSay){
    console.log(whatToSay);
    return "some value from fn";
}

// no need to give type of whatToSay (Dyn.T.L)
// let whatToSay - x
// when no return - then return undefined by default
// JS - automatically inserts semicolon (;)

function sayHi(whatToSay){
    console.log(whatToSay);
    return                   //JS auto inserts (;) here
    "some value from fn"     //ignored
}

console.log(sayHi("Hello All"));
// return "some value of fn";
process.stdout.write("4")          //no extra space or line needed


//function code
function greeter(){
    console.log("Hello Universe, Greetings to all.");
    return "some value";
}

// function call
// let ans = greeter();
// console.log(ans);

console.log(greeter);
console.log(greeter + "");          //typecast function defn in string


//function expression
let myfn = function greeter(){
    console.log("Hello Universe, Greetings to all.");
    return "some value";
}

console.log(myfn);
console.log(myfn + "");
console.log(myfn());

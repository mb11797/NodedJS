//function are first class citizens

//1.  assign => 1 variable => 2nd variable
let a = 10;
let b=a;
console.log(b);

console.log("'''''''''''''''''''''''''''''''''");

//2.  pass variable as a parameter
function sayHi(whatToSay){
    console.log(whatToSay);
}
sayHi("Hello Universe!");
sayHi(10);
sayHi(null);
sayHi(undefined);
sayHi([1,2,3,4,5]);
//array - also similar

//Both these works can also be done with function also just like variables

console.log("'''''''''''''''''''''''''''''''''");

//3.  variable can be returned from a function
function greeter(){
    let innerVar = "variable returned from a fn";
    return innerVar;
}
let ans = greeter();
console.log(ans);
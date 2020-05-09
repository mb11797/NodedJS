// function outer(){
//     function inner(){
//         console.log("Inner function has executed");
//     }
//     console.log("Outer function has executed");
//     return inner;
// }

// // outer();
// // Outer function has executed

// // outer()();      
// // Outer function has executed
// // Inner function has executed

// // inner();   //wont work

// let innerfn = outer();
// innerfn();
// // Outer function has executed
// // Inner function has executed


// console.log(outer() + "");          //type conversion


//closure => JS feature(inner fn has access of outerfn var, even if outerfn has been removed from the execution stack) 
function powerCreator(exp){
    function powerfn(base){
        return Math.pow(base, exp);
    }
    return powerfn;
}

let squarer = powerCreator(2);
let five_pow_two = squarer(5);
console.log(five_pow_two);

console.log(powerCreator(powerCreator(5)(3))(2));



// //Note(closure property):
// function getFirstName(firstName){
//     function getLastName(lastName){
//         function greeter(){
//             console.log(`Hello ${firstName} ${lastName}`);
//         }
//         return greeter;
//     }
//     return getLastName;
// }

// let lastFn = getFirstName("Steve");
// let greeterFn = lastFn("Rogers");
// greeterFn();
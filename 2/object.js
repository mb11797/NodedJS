/// {key: value } pair

let cap = {
    name: "Steve",
    lastName: "Rgers",
    address:{
        state: "New York",
        city: "Manhatten"
    },
    age: 45,
    movies: ["Infinity Wars", "Avengers"],
    isAvenger: true
}

//get
console.log(cap.name);
console.log(cap.isAvenger);


//set,update -- Brahmastra
cap.friends = ["Tony", "Peter", "Bruce"];
console.log(cap);

//Another very cool method
let variable = "age";
function getValue(variable){
    confirm.log(cap[variable]);
}
getValue("age");
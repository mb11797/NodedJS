//server
function myMap(arr, call_back_fn){
    let new_arr = [];
    for(let i=0; i<arr.length; i++){
        let ans = call_back_fn(arr[i]);
        new_arr.push(ans);
    }
    return new_arr;
}

//client
function squarer(num){
    return num*num;
}

console.log("''''''''''''''''''''''");
let arr = [4,14,17,23,48,66];
let squared_arr = myMap(arr, squarer);
console.log(squared_arr);
console.log("'''''''''''''''''''''");
console.log(arr);

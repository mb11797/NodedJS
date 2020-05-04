//server
function myFilter(arr, call_back_fn){
    let new_arr = [];
    for(let i=0; i<arr.length; i++){
        if(call_back_fn(arr[i])){
            new_arr.push(arr[i]);
        }
    }
    return new_arr;
}


//client 
function is_prime(num){
    for(let div=2; div*div<=num; div++){
        if(num%div == 0)
            return false;
    }
    return true;
}

let arr = [2,3,5,8,13,21,25];
let filtered_arr = myFilter(arr, is_prime);

console.log("''''''''''''''''''''''''");

console.log(arr);

console.log("''''''''''''''''''''''''");

console.log(filtered_arr);

console.log("''''''''''''''''''''''''");
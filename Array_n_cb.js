let arr = [4,14,17,23,48,66]

console.log(arr);
console.log("'''''''''''''''''''''''''''''''''");


function check_odd_even(num){
    if(num%2 == 1)
        return num+1;
    else
        return num-1;
}

let new_arr = arr.map(check_odd_even);


function check_prime(num){
    for(let div=2; div*div<=num; div++)
        if(num%div == 0)
            return false;
    return true;
}

let filtered_new_arr = new_arr.filter(check_prime);

console.log(arr);

console.log("'''''''''''''''''''''''''''''''''");

console.log(new_arr);

console.log("'''''''''''''''''''''''''''''''''");

console.log(filtered_new_arr);

console.log("'''''''''''''''''''''''''''''''''");


# dynamically typed language
# no semicolon and backets necessity
# everything here is an object
# puts("Hello Ruby"); or puts "Hello Ruby" => both are same

# notation not required => let, const or var

def is_prime(num)
    div=2
    while(div*div<=num)
        if(num%div == 0)
            return false
        end
        # no ++ or -- => incr or decr operator
        div = div+1
    end
    return true
end

a = is_prime(6)
# puts a

# No implicit type conversion of string
# error
# puts "Number 11 is " + a
puts "Number 11 is " + a.to_s
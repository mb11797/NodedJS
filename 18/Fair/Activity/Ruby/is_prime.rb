# dynamically typed language
# no semicolon and backets necessity, i.e, optional
# everything here is an object
# puts("Hello Ruby"); or puts "Hello Ruby" => both are same and correct

# notation not required => let, const or var

def is_prime(num)
    if(num < 2)
        return false

    div=2
    while(div*div<=num)
        if(num%div == 0)
            return false
        end
        # no i++ or i-- => incr or decr operator not supported
        div = div+1      # or div += 1
    end
    return true
end

a = is_prime(6)
# puts a

# No implicit type conversion of string
# error in following:
# puts "Number 11 is " + a
puts "Number 11 is " + a.to_s
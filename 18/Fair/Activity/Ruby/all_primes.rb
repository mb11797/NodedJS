def is_prime(num)
    if(num < 2)
        return false
    
    div=2
    while(div*div<=num)
        if(num%div == 0)
            return false
        end
        div = div+1
    end
    return true
end

def all_primes(num)
    if num < 2
        return
    end

    i=2
    while i<=num do
        if is_prime i
            puts i
        end
        i += 1
    end
end

def print_all_primes(num)
    # for(int i=2; i<num; i++) => wrong
    for i in (2..num)
        is_status = is_prime(i)
        if(is_status)
            puts i
        end
    end
end


# def print_all_primes(num)
#     # for(int i=2; i<num; i++) => wrong
#     for i in (2..num).step(2)
#         is_status = is_prime(i)
#         if(is_status)
#             puts i
#         end
#     end
# end



# all_primes(100)

print_all_primes(10)

# How to do step count in ruby in a for loop
# (2..num).step(2)
# (range).step(2)
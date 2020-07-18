arr = [2,5,3,7,1]

max = arr.max();

# string, number, boolean, symbol, map, arr
# for conversion use first letter only => to_s

# for i in (max).downto(1)
#     puts i
# end


# for floor in (1..max).to_a()
#     puts floor
# end
# [1,2,3,4,5,6,7]

# for floor in (1..max).to_a().reverse()
#     puts floor
# end
# [7,6,5,4,3,2,1]

# puts => diff line
# print => same line
for floor in (1..max).to_a().reverse()
    for i in (0..arr.length-1)
        if(floor <= arr[i])
            print "*\t"
        else
            print " \t"
        end
    end
    puts
end
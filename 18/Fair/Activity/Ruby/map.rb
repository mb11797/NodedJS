# map = {"India" => 100, "USA" : 120}
map = {"India" => 100, "USA" => 120}

map["India"] = 120      #update

map["China"] = 140      #insert

# ruby me check karne vale functions ke aage '?' laga hota hai
puts map

puts map.key?("India")
puts map.key?("Europe")


# WRONG:
# #loop 
# for key in map
#     puts key + "->" + map.key.to_s
# end

#loop
map.each do|key,value|
    puts key + " -> " + value.to_s
end

#delete
map.delete("China")
puts map


#jacjbcejdfkjjkfj => find highest frequency character


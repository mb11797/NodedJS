def find_hfc(str)
    map = {}
    for i in (0..str.length-1)
        ch = str[i]
        if(map.key?(ch))
            map[ch] += 1
        else
            map[ch] = 1
        end
    end

    max_freq = 0
    hfc = " "
    map.each do|key,value|
        puts key + " " + value.to_s
        if(value >= max_freq)
            max_freq = value
            hfc = key
        end
    end
    puts
    puts "Highest Freq Character:"
    puts hfc + " " + max_freq.to_s
end


find_hfc("cwkjesebksvb,,k.sdkjf")
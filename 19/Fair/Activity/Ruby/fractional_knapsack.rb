# val, weight, to_String

class Item
    attr_accessor :val,:wt,:ratio
    def initialize(val, wt)
        @val=val
        @wt=wt
        @ratio=val.to_f/wt
    end

    def to_s
        return @val.to_s + " - " + @wt.to_s + " - " + @ratio.to_s
    end

    def <=> (other)
        # increasing order
        if(@ratio > other.ratio)
            return +1
        elsif(@ratio < other.ratio)
            return -1
        else
            return 0
        end
    end
end


vals = [15,14,10,45,30]
weights = [2,5,1,3,4]

# Item => val, weight, ratio
# sort

# puts => can print anything on console => you need to tell what to print
# puts Item

items = []
for i in (0..vals.length-1)
    item = Item.new(vals[i],weights[i])
    items.push(item)
end

# for i in (0..vals.length-1)
#     puts items[i]
# end

# puts => it can print anything on console => you just need to tel what to print => to_s
# sort => it can sort anything => you just need to tell how to compare two things

sorted_arr = items.sort();

for i in (0..items.length-1)
    puts sorted_arr[i]
end

# Internal call structure of sort function to the comparator:
# items[i]<=>(items[i+1])


rc = 7          #remaining capacity
idx = items.length-1
vib = 0         # value in the box
while(idx>=0)
    if(rc>=items[idx].wt)
        vib = vib+items[idx].val
        rc = rc - items[idx].wt
    else
        vib = vib+rc*items[idx].ratio
        rc=0
        break
    end
    idx = idx-1
end

puts vib

# gem 'chromedriver-helper', '~> 1.0'
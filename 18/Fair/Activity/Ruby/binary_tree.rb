# Name of class always starts with capital letters
# variable are words with all letters capital
# no constructor in ruby, here it is initialize
# instance variable ke aage '@' lagana hota hai => 'this' ki jagah '@' lagana hota h
# puts => prints string by default => class to_string is made to print any object of type Node (here) => we will overwrite to_string function in ruby (as shown below)


class Node
    # by default private => to make public, use following:
    attr_accessor :left, :right, :data

    #constructor
    def initialize(data, left, right)
        @data = data
        @left = left
        @right = right
    end
    #this => node
    def to_s
        s = @left.nil?() ? "." : @left.data.to_s
        # s += "<- #{data.to_s} ->"         # correct
        s += "<- " + @data.to_s + " ->"     # correct
        s += @right.nil?() ? "." : @right.data.to_s
        return s
    end
end

def display(node)
    if(node == nil)
        return
    end

    puts node
    display(node.left)
    display(node.right)
end

nodes=[]

left = Node.new(25, nil, nil)
right = Node.new(75, nil, nil)
# root => left address, right address
root = Node.new(50, left, right)

#display(nodes[0])

display(root)

#puts => print => language => class to_string => to_string overwrite
# "i am string"
# `i am string`
# 'i am string ${data}'
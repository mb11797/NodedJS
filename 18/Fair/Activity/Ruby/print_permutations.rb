def permutation(qsf, asf)
    if(qsf.empty?)
        puts asf
        return
    end
    ch = qsf[0]
    roq = qsf[1, qsf.length()-1]
    for i in (0..asf.length)
        left = asf[0, i]
        right = asf[i, asf.length()-i]
        permutation(roq, left+ch+right)
        # permutation(roq, right+ch+left)
    end
end

permutation("abc", "")
# permutation("abcd", "")
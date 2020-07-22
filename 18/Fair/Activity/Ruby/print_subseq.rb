# string => substrings
def get_ss(qsf, asf)
    if(qsf.length() == 0)
        puts asf
        return
    end
    ch = qsf[0, 1]      #0 idx ke aage 1 char utha lo
    res = qsf[1, qsf.length()-1]
    get_ss(res, asf)
    get_ss(res, asf+ch)
end

get_ss("abc", "")
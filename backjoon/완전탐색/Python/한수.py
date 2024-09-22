def solve() :

    hansuCount = 0

    for i in range(1, N+1) :
        ## 숫자를 문자열로 분리한 후에 다시 숫자로 변환
        num_list = list(map(int, str(i)))
        if(i < 100) :
            hansuCount += 1
        elif num_list[0] - num_list[1] == num_list[1] - num_list[2] :
            hansuCount += 1    

    print(hansuCount)

if __name__ == "__main__":
    N = int(input()) #110
    solve()
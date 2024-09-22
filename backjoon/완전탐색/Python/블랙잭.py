def solve(N, K, Array) :

    sum = 0

    for i in range(0, N) :
        for j in range(i+1, N) :
            for k in range(j+1, N) :
                if(Array[i] + Array[j] + Array[k] > K) :
                    continue
                else :
                    sum = max(sum, Array[i] + Array[j] + Array[k])

    print(sum)



if __name__ == "__main__":
    N, K = list(map(int, input().split()))
    Array = list(map(int, input().split()))
    solve(N, K, Array)  
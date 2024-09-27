def solve(N, A, B):
   
    result = 0

    for i in range(N) :
        result += (A[i] * B[i])


    print(result)

if __name__ == "__main__":
    
    N = int(input())
    A = sorted(list(map(int, input().split())))
    B = sorted(list(map(int, input().split())), reverse=True)

    solve(N, A, B)  # N과
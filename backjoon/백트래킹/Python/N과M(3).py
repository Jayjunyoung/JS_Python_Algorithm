def solve(N, K):
  
    result = []

    def dfs():
        if(len(result) == K) :
            print(' '.join(map(str, result)))
            return
        
        for i in range(1, N+1):
            result.append(i)
            dfs()
            result.pop()

    dfs()

# 메인 함수
if __name__ == "__main__":
    N, K = map(int, input().split())
    solve(N, K)
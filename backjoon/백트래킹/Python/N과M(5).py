def solve(N, K, array):
  
    result = []

    def dfs():
        if(len(result) == K) :
            print(' '.join(map(str, result)))
            return
        
        for i in range(N):#result에 array의 요소가 없다면 넣어라
            if array[i] not in result:
                result.append(array[i])
                dfs()
                result.pop()

    dfs()

# 메인 함수
if __name__ == "__main__":
    N, K = map(int, input().split())
    array = sorted(list(map(int, input().split())))
    
    solve(N, K, array)
def solve(N, K):
    answer = 0
    
    coins = []

    for _ in range(N) :
        coins.append(int(input()))
    
    #reverse True 함으로써 내림차순 정렬
    coins.sort(reverse=True)

    answer = 0

    for coin in coins :
        if K >= coin : #몫 만큼 더해주기
            answer += K // coin 
            K %= coin # 나머지 할당
            if K <= 0 :
                break

    print(answer)

if __name__ == "__main__":
    N, K = list(map(int, input().split()))
    solve(N, K)  
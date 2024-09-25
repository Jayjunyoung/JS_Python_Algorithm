def solve(N, K):
    # 수열을 저장할 리스트
    seq = [0] * K  # K개의 숫자를 저장할 리스트

    result = ""

    # DFS 함수 정의
    def dfs(depth, start):
        
        nonlocal result

        if depth == K:  # K개의 숫자를 선택했으면
            result += " ".join(map(str, seq)) + "\n"  # 수열을 문자열로 만들어서 결과에 추가
            return
        
        for i in range(start, N + 1):
            seq[depth] = i  # 현재 위치에 i를 넣고
            
            dfs(depth + 1, i)  # 다음 자리 탐색

    dfs(0, 1)  # 0번째 자리부터 탐색 시작
    print(result)  # 최종 결과 출력

# 메인 함수
if __name__ == "__main__":
    N, K = map(int, input().split())
    solve(N, K)
def solve(N, K):
    # 수열을 저장할 리스트
    seq = [0] * K  # K개의 숫자를 저장할 리스트
    visited = [False] * (N + 1)  # 1부터 N까지의 방문 여부를 저장할 리스트
    result = ""

    # DFS 함수 정의
    def dfs(depth, start):
        
        nonlocal result

        if depth == K:  # K개의 숫자를 선택했으면
            result += " ".join(map(str, seq)) + "\n"  # 수열을 문자열로 만들어서 결과에 추가
            return
        
        for i in range(start, N + 1):
            if not visited[i]:  # i번째 숫자가 아직 선택되지 않았다면
                seq[depth] = i  # 현재 위치에 i를 넣고
                visited[i] = True  # i번째 숫자를 방문했다고 표시
                dfs(depth + 1, i + 1)  # 다음 자리 탐색
                visited[i] = False  # 백트래킹: 다시 방문 표시를 해제

    dfs(0, 1)  # 0번째 자리부터 탐색 시작
    print(result)  # 최종 결과 출력

# 메인 함수
if __name__ == "__main__":
    N, K = map(int, input().split())
    solve(N, K)
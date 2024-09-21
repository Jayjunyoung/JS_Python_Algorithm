def solve(N, Array):
    answer = 0
    # 인출시간을 짧게하기 위해 오름차순 정렬
    Array.sort()

    # 누적합 계산을 위한 변수
    cumulative_sum = 0

    for i in range(N):  # 0부터 N-1까지 반복
        cumulative_sum += Array[i]  # 현재까지의 합을 누적
        answer += cumulative_sum  # 각 단계에서 누적합을 더함

    print(answer)

if __name__ == "__main__":
    N = int(input())  # 첫 번째 입력값
    Array = list(map(int, input().split()))  # 두 번째 입력값 (리스트)
    solve(N, Array)  # N과 Array를 solve 함수에 전달
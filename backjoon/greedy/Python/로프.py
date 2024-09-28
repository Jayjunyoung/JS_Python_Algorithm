import sys

def solve(N, Array):
    # maxWeight를 저장할 필요가 없습니다. 바로 최대값을 찾으면 됩니다.
    max_weight = 0

    # 이미 Array는 정렬되어 있으므로, 가장 약한 로프부터 계산
    for i in range(N):
        # (N - i)개의 로프를 사용할 때 가능한 최대 중량을 계산
        max_weight = max(max_weight, (N - i) * Array[i])

    # 최대 중량 출력
    print(max_weight)

if __name__ == "__main__":
    input = sys.stdin.read  # 여러 줄 입력을 받기 위한 처리
    input = sys.stdin.read

    data = input().strip().split()  # 공백으로 입력을 나누기
    
    N = int(data[0])  # 첫 번째 입력값
    Array = sorted(list(map(int, data[1:])))  # 두 번째 입력값 (리스트)
    
    solve(N, Array)  # N과 Array를 solve 함수에 전달
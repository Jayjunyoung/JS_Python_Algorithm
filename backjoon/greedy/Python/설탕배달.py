def solve():
    answer = -1
    
    five_pack = N // 5  # 5로 나눈 몫을 구함
    
    while five_pack >= 0:
        remaining = N - five_pack * 5  # 남은 설탕의 양 계산
        
        if remaining % 3 == 0:  # 3으로 나누어 떨어지면
            answer = remaining // 3 + five_pack  # 3kg 봉지 개수 + 5kg 봉지 개수
            break  # 답을 찾으면 루프 종료
        else:
            five_pack -= 1  # 5kg 봉지 개수를 줄여서 다시 계산

    print(answer)

if __name__ == "__main__":
    N = int(input())  # 첫 번째 입력값, 설탕의 총량
    solve()  # 문제 해결 함수 호출
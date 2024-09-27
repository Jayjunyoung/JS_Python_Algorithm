def solve(N):
   
    sum = 0
    count = 0
    num = 1

    while(sum + num <= N) :
       sum += num
       count += 1
       num += 1


    print(count)

if __name__ == "__main__":
    
    N = int(input())
    
    solve(N)  # N과 Array를 solve 함수에 전달
from itertools import permutations

# 에라스토테네스의 체
def checkPrime(n) :
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5)+1):
        if n % i == 0:
            return False
    return True

def solution(numbers):
    answer = []
    numbers = list(numbers)
    temp = []
    
    for i in range(1, len(numbers) + 1) :
        # numbers 배열에서 i 갯수 만큼 골라 순열을 만들겠다
        temp += list(permutations(numbers, i))
    num = [int(''.join(t)) for t in temp]
        
    for i in num : #num까지 반복문 돌려
        if checkPrime(i) :
            answer.append(i)
            
    return len(set(answer)) #중복 제거하고 최종 배열 길이 출력       
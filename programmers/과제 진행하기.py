from itertools import permutations

def timeToMin(times) :
    hh, mm = map(int, times.split(":"))
    return hh * 60 + mm
    
def solution(plans):
    stack = []
    
    sortedPlans = sorted([[subject, timeToMin(time), int(count)] for subject, time, count in plans],
    key = lambda x: x[1],#늦게시작하는 순으로 내림차순
    reverse=True) #내림차순
        
    while sortedPlans : 
        subject, time, count = sortedPlans.pop()
        for idx, val in enumerate(stack) :
            if time < val[1] :
                stack[idx][1] += count
               
        stack.append([subject, time + count])
                         
    answer = [val[0] for val in sorted(stack, key=lambda x: x[1]) ]
    return answer
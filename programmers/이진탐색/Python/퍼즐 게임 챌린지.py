def puzzle(diffs, times, limit, level) :
    clearTime = 0
    for idx in range(len(diffs)) :
        if diffs[idx] <= level : clearTime += times[idx]
        if diffs[idx] > level : clearTime += (diffs[idx]-level) * (times[idx-1] + times[idx]) + times[idx]
        if clearTime > limit : return False
    return True
    
def solution(diffs, times, limit):#diffs는 100000이 나올거야
    start, mid, end = 1, 0, max(diffs)
    
    while(start <= end) :
        mid = (start + end) // 2
        
        if puzzle(diffs, times, limit, mid) : end = mid - 1
        else : start = mid + 1
    
    if puzzle(diffs, times, limit, mid): return mid
    if puzzle(diffs, times, limit, mid + 1): return mid+1
    return mid-1
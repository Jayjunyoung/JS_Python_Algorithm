function solution(n, times) {
    const sorted = times.sort((a, b) => a - b);
    // 오름차순 정렬
    let start = 1; 
    // 최소 1분 
    let end = sorted[sorted.length - 1] * n;
    // 가장 오래 걸리는 심사관 * 인원 수

    while(start <= end) {
        const mid = Math.floor((start + end ) / 2);
        const sum = times.reduce((acc, cur) => acc + Math.floor(mid / cur), 0);

        if(sum < n) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return start;

}
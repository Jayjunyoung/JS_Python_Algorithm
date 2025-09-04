function solution(n, m, x, y, queries) {
    
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];
    
    // 범위를 계산하는 함수 정의
    
    function nextRange(s, e, move, max) {
        
        const nextS = (s === 0 && move > 0) ? 0 : s + move;
        const nextE = (e === max - 1 && move < 0) ? max - 1 : e + move;
        
        // 시작점과 종료점이 모두 범위를 벗어난 경우
        if ((nextS < 0 || nextS >= max) && (nextE < 0 || nextE >= max)) {
            return [-1, -1];
        }
        // 시작점만 범위를 벗어난 경우
        if (nextS < 0 && nextE >= 0 && nextE < max) {
            return [0, nextE];
        }
        // 종료점만 범위를 벗어난 경우
        if (nextE >= max && nextS >= 0 && nextS < max) {
            return [nextS, max - 1];
        }
        // 시작점과 종료점이 모두 범위 내에 있는 경우
        return [nextS, nextE];    
    }
    
    let [sx, ex, sy , ey] = [x, x, y, y];
    
    for(let i = queries.length - 1; i >= 0; i--) {
        const [dir, cnt] = queries[i];
        
        if(dir === 0 || dir === 1) {
            const res = nextRange(sy, ey, cnt * dy[dir], m);
            if(res[0] === -1) return 0;
            [sy, ey] = res;
        }
        
        else {
            const res = nextRange(sx,ex, cnt * dx[dir], n);
            if(res[0] === -1) return 0;
            [sx, ex] = res;
        }
        
    }
    
    return BigInt(ex - sx + 1) * BigInt(ey - sy + 1);
}
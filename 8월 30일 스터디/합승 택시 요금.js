function solution(n, s, a, b, fares) {
    
    const board = Array.from({length: n + 1}, () => Array(n + 1).fill(Infinity));
    
    // 자기 자신 거리는 0으로 세팅
    for(let i = 1; i <= n; i++) {
        board[i][i] = 0;
    }
    
    // 지점 간의 요금 즉, 간선 가중치를 양 쪽에 세팅
    fares.forEach((fare) => {
        const [x, y, fee] = fare;
        board[x][y] = fee;
        board[y][x] = fee;
    })
    
    for(let k = 1; k <= n; k++) {
        for(let i = 1; i <= n; i++) {
          for(let j = 1; j <= n; j++) {
            if(board[i][j] > board[i][k] + board[k][j])
              board[i][j] = board[i][k] + board[k][j];
          }
        }
    }
    
    let answer = board[s][a] + board[s][b];
    for(let i = 1; i <= n; i++) {
        const shortest = board[s][i] + board[i][a] + board[i][b];
        answer = Math.min(answer, shortest);
    }
    
    return answer;
}
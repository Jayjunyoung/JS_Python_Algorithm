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
    
    // 플로이드 워셜 알고리즘
    for(let k = 1; k <= n; k++) {
        for(let i = 1; i <= n; i++) {
          for(let j = 1; j <= n; j++) {
            if(board[i][j] > board[i][k] + board[k][j])
              board[i][j] = board[i][k] + board[k][j];
          }
        }
    }
    
    // 두 사람이 합승을 안하고 각자 따로 가는 경우 세팅
    // 이렇게 해놔야 두 사람이 합승을 하는 경우와 비교하여 갱신 가능
    let answer = board[s][a] + board[s][b];
    for(let i = 1; i <= n; i++) {
		    // 출발점에서 합승 지점 + 마지막 합승 지점에서 a까지 + 마지막 합승 지점에서 b까지
        const shortest = board[s][i] + board[i][a] + board[i][b];
        answer = Math.min(answer, shortest);
    }
    
    return answer;
}
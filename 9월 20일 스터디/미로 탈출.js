function solution(maps) {
    let answer = 0;
    const row = maps.length;
    const col = maps[0].length;
    
    const dir = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1]
    ]
    
    const Bfs = (startNode) => {
        const [sx, sy, goal] = startNode;
        //[0, 0]
        let queue = [[sx, sy, 0]];
        let visited = Array.from({length: row}, () => Array(col).fill(false));
        visited[sx][sy] = true;
        
        while(queue.length > 0) {
            const [cx, cy, time] = queue.shift();
            
            if(maps[cx][cy] === goal) return time;
            
            for(let [dx, dy] of dir) {
                const [nx, ny] = [cx + dx, cy + dy];
                if(nx >= 0 && nx < row && ny >= 0 && ny < col && 
                   !visited[nx][ny] && maps[nx][ny] !== 'X') {
                    visited[nx][ny] = true;
                    queue.push([nx, ny, time+1])
                }
            }
        }
        
    }
    
    
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            if(maps[i][j] === 'S') {
                answer += Bfs([i,j, 'L']);
            }
            
            if(maps[i][j] === 'L') {
                answer += Bfs([i, j, 'E']);
            }
        }
    }
    
    if(answer > 0) {
        return answer
    } else {
        return -1;
    }
}
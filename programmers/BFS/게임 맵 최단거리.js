function solution(maps) {
    let answer = 0;
    
    let n = maps.length;
    let m = maps[0].length;
    
    const visited = Array.from({length: n}, () => Array(m).fill(false));
    
    const dir = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ]
    
    const bfs = (x, y, count) => {
        const queue = [[x, y, count]];
        visited[x][y] = true;
        
        while(queue.length > 0) {
            const [cx, cy, cnt] = queue.shift();
            
            if(cx === n - 1 && cy === m - 1) {
                return cnt;
            }
            
            for(let [dx, dy] of dir) {
                const nx = cx + dx;
                const ny = cy + dy;
                
                if(nx < 0 || nx >= n || ny < 0 || ny >= m || visited[nx][ny] || maps[nx][ny] === 0) {
                    continue;
                }
                
                queue.push([nx, ny, cnt + 1]);
                visited[nx][ny] = true;
            }
        
        }
        
        return -1
    }
    
    //시작점에서 호출
    answer = bfs(0, 0, 1)
    
    return answer
}
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
            const [cx, cy, count] = queue.shift();
            
            if(cx === n - 1 && cy === m-1) {
	            return count;
		        }
            
            for(let [dx, dy] of dir) {
                const [nx, ny] = [cx + dx, cy + dy];
                
                if(nx < 0 || nx > n - 1 || ny < 0 || ny > m - 1 || visited[nx][ny] || maps[nx][ny] === 0) continue;
                
                visited[nx][ny] = true;
                queue.push([nx, ny, count+1]);
            }
        }
        
        return -1
    }
    
    //시작점에서 호출
    answer = bfs(0, 0, 1)
    
    return answer
}
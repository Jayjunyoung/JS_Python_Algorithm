const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const [m, n, h] = input.shift().split(" ").map(Number);

// 3차원 배열을 올바르게 생성
const map = [];
for(let i = 0; i < h; i++) {
    const layer = [];
    for(let j = 0; j < n; j++) {
        const row = input[i * n + j].split(" ").map(Number);
        layer.push(row);
    }
    map.push(layer);
}

let startNode = []

map.forEach((height, h) => {
    height.forEach((row, y) => {
        row.forEach((cell, x) => {
            if(cell === 1) {
                startNode.push([x, y, h, 0]);
            }
        })
    })
})

const dir = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
]

const Bfs = (startNode) => {
    const queue = [...startNode];
    let front = 0;
    let minDay = 0;
    
    while(front < queue.length) {
        const [cx, cy, cz, day] = queue[front++];
        minDay = Math.max(minDay, day);
        
        for(let [dx, dy, dz] of dir) {
            const [nx, ny, nz] = [cx + dx, cy + dy, cz + dz];
            
            if(nx < 0 || nx >= m || ny < 0 || ny >= n || nz < 0 || nz >= h) continue;
            
            if(map[nz][ny][nx] === 0) {
                map[nz][ny][nx] = 1;
                queue.push([nx, ny, nz, day+1]);
            }
        }
        
    }
    
    for(let i = 0; i < h; i++) {
        for(let j = 0; j < n; j++) {
            for(let k = 0; k < m; k++) {
                if(map[i][j][k] === 0) return -1
            } 
        }
    }
    
    return minDay
}

console.log(Bfs(startNode))

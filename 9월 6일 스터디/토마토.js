const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const [m, n] = input.shift().split(" ").map(Number);
const map = input.map((v) => v.split(" ").map(Number));

let startNode = [];

map.forEach((v, i) => {
    v.forEach((tomato, j) => {
        if(tomato === 1) {
            startNode.push([i, j, 0]);
        }
    });
});

// 방향성 배열
const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
];

const Bfs = (startNode) => {
    const queue = [...startNode];
    let minDay = 0;
    let front = 0;

    while(front < queue.length) {
        const [cx, cy, day] = queue[front++];
        minDay = Math.max(minDay, day);

        for(let i = 0; i < 4; i++) {
            const nx = cx + dir[i][0];
            const ny = cy + dir[i][1];
            
            if(nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            if(map[nx][ny] === 0) {  // 익지 않은 토마토만
                map[nx][ny] = 1;     // 토마토를 익게 만들기
                queue.push([nx, ny, day + 1]);
            }
        }
    }

    // 모든 토마토가 익었는지 확인
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(map[i][j] === 0) return -1;
        }
    }

    return minDay;
};

console.log(Bfs(startNode));
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

let startNode = [];

// 3차원 배열 순회: [높이][행][열]
map.forEach((height, z) => {
    height.forEach((row, y) => {
        row.forEach((cell, x) => {
            if(cell === 1) {
                startNode.push([x, y, z, 0]); // [열, 행, 높이, day]
            }
        });
    });
});

const dir = [
    [-1, 0, 0],  // 왼쪽
    [1, 0, 0],   // 오른쪽
    [0, -1, 0],  // 위
    [0, 1, 0],   // 아래
    [0, 0, -1],  // 앞 (공백 제거!)
    [0, 0, 1],   // 뒤
];

const Bfs = (startNode) => {
    const queue = [...startNode];
    let front = 0;
    let minDay = 0;

    while(front < queue.length) {
        const [cx, cy, cz, day] = queue[front++];  // [열, 행, 높이, day]
        minDay = Math.max(minDay, day);

        for(let i = 0; i < 6; i++) {
            const [nx, ny, nz] = [cx + dir[i][0], cy + dir[i][1], cz + dir[i][2]];

            // 경계 검사: x는 열(m), y는 행(n), z는 높이(h)
            if(nx < 0 || nx >= m || ny < 0 || ny >= n || nz < 0 || nz >= h) continue;

            // 3차원 배열 접근: map[높이][행][열]
            if(map[nz][ny][nx] === 0) {
                map[nz][ny][nx] = 1;
                queue.push([nx, ny, nz, day + 1]);
            }
        }
    }

    // 모든 토마토가 익었는지 확인
    for(let i = 0; i < h; i++) {
        for(let j = 0; j < n; j++) {
            for(let k = 0; k < m; k++) {
                if(map[i][j][k] === 0) return -1;
            }
        }   
    }

    return minDay;
};

console.log(Bfs(startNode));
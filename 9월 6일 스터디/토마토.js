const input = require("fs").readFileSync("./dev/stdin").toString().trim().split("\n");


const [m, n] = input.shift().split(" ").map(Number);
const map = input.map((v) => v.split(" ").map(Number));

let startNode = [];

map.forEach((v, i) => {
    v.forEach((tomato, j) => {
        if(tomato === 1) {
            startNode.push([i, j, 0]);
        }
    })
})

// 방향성 배열
const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
]

const Bfs = (startNode) => {
    const queue = [...startNode];
    const visited = Array.from({length: n}, () => Array(m).fill(false));
    let maxDay = 0;

    startNode.forEach(([cx, cy, _day]) => {
        visited[cx][cy] = true;
    })

    while(queue.length > 0) {
        const [cx, cy, day] = queue.shift();
        maxDay = Math.max(maxDay, day);

        for(let i = 0; i < 4; i++) {
            const [nx, ny] = [cx + dir[i][0], cy + dir[i][1]];

            if(nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            
            if(!visited[nx][ny] && map[nx][ny] === 0) {
                visited[nx][ny] = true;
                map[nx][ny] = 1; // 토마토를 익게 만들기
                queue.push([nx, ny, day + 1]);
            }
        }
    }

    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(map[i][j] === 0) return -1;
        }
    }

    return maxDay;
}

console.log(Bfs(startNode));
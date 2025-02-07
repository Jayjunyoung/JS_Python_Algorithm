const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

//bfs 기반으로 재 풀이

const [n, m] = input.shift().split(" ").map(Number);

let peopleCount = 0;

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const map = input.map((v) => v.trim().split(""));
let visited = Array.from({ length: n }, () => Array(m).fill(false));

const bfs = (startX, startY) => {
  const queue = [[startX, startY]];
  visited[startX][startY] = true;

  while (queue.length > 0) {
    const [cx, cy] = queue.shift();

    for (let [dx, dy] of dir) {
      const [nx, ny] = [cx + dx, cy + dy];

      if (
        nx >= 0 &&
        nx < n &&
        ny >= 0 &&
        ny < m &&
        !visited[nx][ny] &&
        map[nx][ny] !== "X"
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);

        if (map[nx][ny] === "P") {
          peopleCount++;
        }
      }
    }
  }
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === "I") {
      bfs(i, j);
    }
  }
}

console.log(peopleCount === 0 ? "TT" : peopleCount);

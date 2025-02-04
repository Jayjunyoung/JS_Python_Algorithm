const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

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

const dfs = (startX, startY) => {
  visited[startX][startY] = true;

  if (map[startX][startY] === "P") {
    peopleCount++;
  }

  for (let [dx, dy] of dir) {
    const [nx, ny] = [startX + dx, startY + dy];

    if (
      nx >= 0 &&
      nx < n &&
      ny >= 0 &&
      ny < m &&
      !visited[nx][ny] &&
      map[nx][ny] !== "X"
    ) {
      visited[nx][ny] = true;
      dfs(nx, ny); //재귀함수를 활용한 dfs 구현
    }
  }
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === "I") {
      dfs(i, j);
      break;
    }
  }
}

console.log(peopleCount === 0 ? "TT" : peopleCount);

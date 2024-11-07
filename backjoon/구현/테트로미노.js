const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const paper = input.map((row) => row.split(" ").map(Number));

const maxValue = paper.reduce(
  (acc, row) =>
    Math.max(
      acc,
      row.reduce((acc, v) => Math.max(acc, v), 0)
    ),
  0
);

const offset = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const visited = Array.from({ length: n }, () => Array(m).fill(false));
let maxSum = 0;

const dfs = (x, y, count, sum) => {
  if (sum + (4 - count) * maxValue <= maxSum) return;

  if (count === 4) {
    maxSum = Math.max(maxSum, sum);
    return;
  }

  for (const [dx, dy] of offset) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < n && ny >= 0 && ny < m && !visited[nx][ny]) {
      if (count === 2) {
        visited[nx][ny] = true;
        dfs(x, y, count + 1, paper[nx][ny]);
        visited[nx][ny] = false;
      }

      visited[nx][ny] = true;
      dfs(nx, ny, count + 1, sum + paper[nx][ny]);
      visited[nx][ny] = false;
    }
  }
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    visited[i][j] = true;
    dfs(i, j, 1, paper[i][j]);
    visited[i][j] = false;
  }
}

console.log(maxSum);

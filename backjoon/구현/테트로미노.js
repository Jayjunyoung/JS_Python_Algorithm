const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const paper = input.map((row) => row.split(" ").map(Number));

//각 행마다 최대값을 구해서 그 중에 가장 큰걸 구하는건가
//맞네 ㅇㅇㅇㅇ
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
      //ㅗ 모양일 때 dfs를 별개로 적용하는 거임
      //이유: dfs 탐색으로서는 불 가능한 경로이기때문
      if (count === 2) {
        visited[nx][ny] = true;
        dfs(x, y, count + 1, sum + paper[nx][ny]);
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
    //1은 테트로미노의 초기갯수를 의미
    dfs(i, j, 1, paper[i][j]);
    visited[i][j] = false;
  }
}

console.log(maxSum);

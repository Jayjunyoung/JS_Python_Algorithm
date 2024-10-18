const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const queens = [];
let answer = 0;

function possible(x, y) {
  for (let [a, b] of queens) {
    //같은 행 또는 열에 있으면 false
    if (a === x || b === y) return false;
    //서로 대각선에 있어도 return false
    if (Math.abs(a - x) === Math.abs(b - y)) return false;
  }
  return true;
}

const dfs = (row) => {
  if (row === n) {
    answer++;
    return;
  }

  for (let i = 0; i < n; i++) {
    if (!possible(row, i)) continue;
    queens.push([row, i]);
    dfs(row + 1);
    queens.pop();
  }
};

dfs(0);
console.log(answer);

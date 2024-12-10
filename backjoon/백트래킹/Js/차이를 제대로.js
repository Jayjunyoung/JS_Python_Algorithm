const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift(); //배열 갯수
const arr = input[0].split(" ").map(Number);
let maxResult = 0;
const currentPermutation = [];
let visited = new Array(n).fill(false);

const dfs = (depth) => {
  if (depth === n) {
    const result = calculate(currentPermutation);
    maxResult = Math.max(maxResult, result);
    return;
  } else {
    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        visited[i] = true;
        currentPermutation.push(arr[i]);
        dfs(depth + 1);
        currentPermutation.pop();
        visited[i] = false;
      }
    }
  }
};

const calculate = (per) => {
  let sum = 0;
  for (let i = 0; i < per.length - 1; i++) {
    sum += Math.abs(per[i] - per[i + 1]);
  }
  return sum;
};

dfs(0);

console.log(maxResult);

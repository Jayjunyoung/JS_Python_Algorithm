const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

// n = 5, k = 3
const n = +input.shift();
const k = +input.shift();
const inputLine = input.map(Number);
let arr = [];

for (let i = 0; i < n; i++) {
  arr.push(inputLine[i]);
}

let answer = new Set();

let visited = Array.from({ length: n }, () => false);

const dfs = (num, cnt) => {
  if (cnt === k) {
    answer.add(num);
    return;
  }

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    dfs(num + arr[i], cnt + 1);
    visited[i] = false;
  }
};

dfs("", 0);

console.log(answer.size);

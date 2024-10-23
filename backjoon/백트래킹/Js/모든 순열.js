const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
let visited = Array.from({ length: n }, () => false);
let selecedNumber = Array.from({ length: n }, () => 0);
let answer = "";

const dfs = (depth) => {
  if (depth === n) {
    let result = [];

    for (let i = 0; i < n; i++) {
      result.push(selecedNumber[i]);
    }

    answer += result.join(" ") + "\n";
  }

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    selecedNumber[depth] = i + 1;
    visited[i] = true;
    dfs(depth + 1);
    visited[i] = false;
  }
};

dfs(0);

console.log(answer);

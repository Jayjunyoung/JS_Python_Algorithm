const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
let result = "";

function solution(n, m) {
  let seq = Array(m).fill(0);

  const dfs = (k) => {
    if (k === m) {
      const arr = [];
      for (let i = 0; i < m; i++) {
        arr.push(seq[i]);
      }

      return (result += `${arr.join(" ")}\n`);
    }

    for (let i = 1; i <= n; i++) {
      seq[k] = i;
      dfs(k + 1);
    }
  };

  dfs(0);
  return result;
}

console.log(solution(n, m));

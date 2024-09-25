const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
let result = "";

function solution(n, m) {
  const seq = [...Array(m)].fill(0); //[0]
  const visited = [...Array(n + 1)].fill(false); //[false, false, false, false]
  const dfs = (k) => {
    if (k === m) {
      const arr = [];
      for (let i = 0; i < m; i++) {
        arr.push(seq[i]);
      }
      return (result += `${arr.join(" ")}\n`);
    }

    for (let i = 1; i <= N; i++) {
      if (!visited[i]) {
        seq[k] = i;
        visited[i] = true;
        dfs(k + 1);
        visited[i] = false;
      }
    }
  };

  dfs(0); //0부터 호출해야함
  return result;
}

console.log(solution(N, M));

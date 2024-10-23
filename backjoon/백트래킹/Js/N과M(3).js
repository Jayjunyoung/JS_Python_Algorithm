const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
let array = input[0]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
let result = "";

function solution(n, m) {
  let seq = Array(m).fill(0);
  let visited = Array(n).fill(false);

  const dfs = (k, start) => {
    if (k === m) {
      const arr = [];
      for (let i = 0; i < m; i++) {
        arr.push(seq[i]);
      }

      return (result += `${arr.join(" ")}\n`);
    }

    for (let i = 0; i < array.length; i++) {
      if (visited[i]) continue;
      seq[k] = array[i];
      visited[i] = true;
      dfs(k + 1, array[i + 1]);
      visited[i] = false;
    }
  };

  dfs(0, array[0]);
  return result;
}

console.log(solution(n, m));

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .split("\n");

const [n, k] = input.shift().split(" ").map(Number);

const visited = Array(100001).fill(false);
//인덱스의 범위가 0부터 100000이기 때문에
//100000으로 두면 인덱스가 99999까지 밖에 안됌

const bfs = (node) => {
  const queue = [[node, 0]];
  visited[node] = true;

  while (queue.length) {
    const [curNode, time] = queue.shift();

    if (curNode === k) return time;

    for (let next of [curNode - 1, curNode + 1, curNode * 2]) {
      if (!visited[next] && 0 <= next && next <= 100000) {
        visited[next] = true;
        queue.push([next, time + 1]);
      }
    }
  }
};

console.log(bfs(n));

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input.shift().split(" ").map(Number);

const max = 100000;
const visited = Array(max + 1).fill(Infinity);
const deque = [];

visited[n] = 0;
deque.push(n);

while (deque.length > 0) {
  const x = deque.shift();

  if (x === k) {
    console.log(visited[x]);
    break;
  }

  if (x * 2 <= max && visited[x * 2] > visited[x]) {
    visited[x * 2] = visited[x];
    deque.unshift(x * 2);
  }

  for (let next of [x - 1, x + 1]) {
    if (next >= 0 && next <= max && visited[next] > visited[x] + 1) {
      visited[next] = visited[x] + 1;
      deque.push(next);
    }
  }
}

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input.shift().split(" ").map(Number);

const visited = Array(100001).fill(false);

const bfs = () => {
  const queue = [[n, 0]];
  visited[n] = true;

  while (queue.length > 0) {
    const [position, time] = queue.shift();

    if (position === k) {
      console.log(time);
      return;
    }

    for (let next of [position - 1, position + 1, position * 2]) {
      if (next < 0 || next > 100000 || visited[next]) continue;

      if (next === position * 2) {
        //순간이동은 시간 추가 X
        queue.unshift([next, time]);
      } else {
        queue.push([next, time + 1]);
      }

      visited[next] = true;
    }
  }
};

bfs();

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let tc = +input.shift();
let index = 0;

while (tc--) {
  const [V, E] = input[index++].split(" ").map(Number);
  const graph = Array.from({ length: V + 1 }, () => []);
  const visited = Array.from({ length: V + 1 }, () => 0);

  for (let i = 0; i < E; i++) {
    const [from, to] = input[index + i].split(" ").map(Number);
    graph[from].push(to);
    graph[to].push(from);
  }

  const bfs = (start) => {
    let queue = [start];
    let check = 1;

    visited[start] = check;

    while (queue.length) {
      let cur = queue.shift();

      if (visited[cur] === 1) check = 2;
      else if (visited[cur] === 2) check = 1;

      for (let i = 0; i < graph[cur].length; i++) {
        let next = graph[cur][i];
        if (!visited[next]) {
          visited[next] = check;
          queue.push(next);
        } else if (visited[cur] === visited[next]) {
          return;
        }
      }
    }
  };

  for (let i = 1; i <= V; i++) {
    if (!visited[i]) {
      bfs(i);
    }
  }

  const isAns = () => {
    for (let i = 1; i <= V; i++) {
      for (let j = 0; j < graph[i].length; j++) {
        let next = graph[i][j];
        if (visited[i] === visited[next]) {
          return console.log("NO");
        }
      }
    }
    return console.log("YES");
  };
  isAns();
  index += E;
}

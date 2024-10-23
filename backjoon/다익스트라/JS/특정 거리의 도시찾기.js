const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m, k, x] = input.shift().split(" ").map(Number);

const edges = input.map((val) => val.split(" ").map(Number));
let visited = Array.from({ length: n + 1 }, () => false);
let dist = Array.from({ length: n + 1 }, () => Infinity);
let graph = Array.from({ length: n + 1 }, () => []);

let answer = [];

//forEach를 쓰는 방법도 있음
for (let [a, b] of edges) {
  graph[a].push(b);
}

const dijkstra = (startNode) => {
  const queue = [startNode];
  dist[startNode] = 0;

  while (queue.length) {
    const currentNode = queue.shift();
    if (visited[currentNode]) continue;
    visited[currentNode] = true;

    //거리 k도달 했을때 따져야돼
    if (dist[currentNode] === k) {
      answer.push(currentNode);
      continue;
    }

    for (let nextNode of graph[currentNode]) {
      if (!visited[nextNode] && dist[nextNode] === Infinity) {
        queue.push(nextNode);
        dist[nextNode] = dist[currentNode] + 1;
      }
    }
  }
};

dijkstra(x);

if (answer.length) {
  answer = answer.sort((a, b) => a - b).join("\n");
} else {
  answer = -1;
}

console.log(answer);

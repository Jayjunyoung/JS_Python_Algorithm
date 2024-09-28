const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const edges = input.map((line) => line.split(" ").map(Number));
let graph = Array.from({ length: n + 1 }, () => []);
let dist = Array.from({ length: n + 1 }, () => Infinity);
let visited = Array.from({ length: n + 1 }, () => false);

const startNode = 1;

for (let [a, b, c] of edges) {
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

const dijkstra = (startNode) => {
  let queue = [[0, startNode]];

  dist[startNode] = 0;

  while (queue.length > 0) {
    let minIndex = -1;
    //현재 큐에 남아있는 노드 중에서 짧은 거리를 담기위한 변수
    let minDist = Infinity;

    for (let i = 0; i < queue.length; i++) {
      if (queue[i][0] < minDist) {
        minDist = queue[i][0];
        minIndex = i;
      }
    }

    const [currentDist, currentNode] = queue[minIndex];
    queue.splice(minIndex, 1);

    if (visited[currentNode]) continue;
    visited[currentNode] = true;

    for (let [nextNode, weight] of graph[currentNode]) {
      const newDist = currentDist + weight;

      if (newDist < dist[nextNode]) {
        dist[nextNode] = newDist;
        queue.push([newDist, nextNode]);
      }
    }
  }
};

// 다익스트라 알고리즘 실행, 1부터 시작하겠죠
dijkstra(startNode);

// 최종 결과 출력 (목적지인 N번 노드까지의 최단 거리)
console.log(dist[n]);

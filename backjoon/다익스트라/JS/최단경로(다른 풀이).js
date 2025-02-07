const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [v, e] = input.shift().split(" ").map(Number);
const startNode = Number(input.shift());

const graph = Array.from({ length: v + 1 }, () => []);

const dist = Array(v + 1).fill(Infinity);
let result = 0;

for (let i = 0; i < e; i++) {
  const [a, b, w] = input[i].split(" ").map(Number);

  graph[a].push([b, w]);
}

class MinHeap {
  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  push(item) {
    this.items.push(item);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.items.pop();

    const min = this.items[0];
    this.items[0] = this.items.pop();
    this.bubbleDown();
    return min;
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }

  bubbleUp() {
    let index = this.size() - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.items[parentIndex][0] <= this.items[index][0]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    while (index * 2 + 1 < this.size()) {
      let leftChild = index * 2 + 1;
      let rightChild = index * 2 + 2;

      let smallerChild =
        rightChild < this.size() &&
        this.items[rightChild][0] < this.items[leftChild][0]
          ? rightChild
          : leftChild;

      if (this.items[index][0] <= this.items[smallerChild][0]) break;

      this.swap(index, smallerChild);
      index = smallerChild;
    }
  }
}

const dijkstra = (startNode) => {
  const pq = new MinHeap();
  dist[startNode] = 0;

  pq.push([0, startNode]);

  while (pq.size() > 0) {
    const [currentDist, currentNode] = pq.pop();

    if (currentDist > dist[currentNode]) continue;

    graph[currentNode].forEach(([nextNode, weight]) => {
      const newDist = currentDist + weight;
      if (newDist < dist[nextNode]) {
        dist[nextNode] = newDist;
        pq.push([newDist, nextNode]);
      }
    });
  }
};

dijkstra(startNode);

for (let i = 1; i <= v; i++) {
  console.log(dist[i] === Infinity ? "INF" : dist[i]);
}

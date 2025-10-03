class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  poll() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return value;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    let parentIdx = Math.floor((index - 1) / 2);
    while (
      this.heap[parentIdx] &&
      this.heap[index][1] < this.heap[parentIdx][1]
    ) {
      this.swap(index, parentIdx);
      index = parentIdx;
      parentIdx = Math.floor((index - 1) / 2);
    }
  }

  bubbleDown() {
    let index = 0;
    let leftIdx = index * 2 + 1;
    let rightIdx = index * 2 + 2;

    while (
      (this.heap[leftIdx] && this.heap[leftIdx][1] < this.heap[index][1]) ||
      (this.heap[rightIdx] && this.heap[rightIdx][1] < this.heap[index][1])
    ) {
      let smallerIdx = leftIdx;
      if (
        this.heap[rightIdx] &&
        this.heap[rightIdx][1] < this.heap[smallerIdx][1]
      ) {
        smallerIdx = rightIdx;
      }

      this.swap(index, smallerIdx);
      index = smallerIdx;
      leftIdx = index * 2 + 1;
      rightIdx = index * 2 + 2;
    }
  }
}

function solution(n, paths, gates, summits) {
  const isSummit = new Set(summits);
  // {1, 3, 5}

  // 양방향 그래프를 구성한다
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b, c] of paths) {
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }

  // 최소 힙을 구축하고 Infinity를 구축한다.
  const queue = new MinHeap();
  const intensity = Array(n + 1).fill(Infinity);

  // 출입구에 대해 큐에 삽입한다.
  for (const gate of gates) {
    queue.add([gate, 0]);
    intensity[gate] = 0;
  }

  // 우선순위 큐 사이즈 확인 뒤 하나하나 빼서 확인
  while (queue.size()) {
    const [curNode, curWeight] = queue.poll();

    if (isSummit.has(curNode) || intensity[curNode] < curWeight) continue;

    for (const [nextNode, nextWeight] of graph[curNode]) {
      const newWeight = Math.max(curWeight, nextWeight);
      if (newWeight < intensity[nextNode]) {
        intensity[nextNode] = newWeight;
        queue.add([nextNode, newWeight]);
      }
    }
  }

  let answer = [0, Infinity];
  summits.sort((a, b) => a - b);
  for (const summit of summits) {
    if (intensity[summit] < answer[1]) answer = [summit, intensity[summit]];
  }

  return answer;
}

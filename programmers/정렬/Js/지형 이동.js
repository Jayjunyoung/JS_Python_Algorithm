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
    if (this.size() === 0) {
      return null;
    }

    const min = this.items[0];
    this.items[0] = this.items[this.size() - 1];
    this.items.pop();
    this.bubbleDown();
    return min;
  }

  swap(a, b) {
    return ([this.items[a], this.items[b]] = [this.items[b], this.items[a]]);
  }

  bubbleUp() {
    let index = this.size() - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.items[parentIndex][0] <= this.items[index][0]) {
        break;
      }
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

      if (this.items[index][0] <= this.items[smallerChild][0]) {
        break;
      }

      this.swap(index, smallerChild);
      index = smallerChild;
    }
  }
}

function solution(land, height) {
  let answer = 0;
  const n = land.length;

  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const visited = Array.from({ length: n }, () => Array(n).fill(false));

  const q = new MinHeap();

  q.push([0, 0, 0]); //비용, i, j

  while (q.size() > 0) {
    //우선순위 큐와 bfs 탐색을 이용
    const [cost, i, j] = q.pop();
    //이게 만약 최대힙이었다면 최대비용인 거 부터 나옴

    //방문 안한거 탐색
    if (!visited[i][j]) {
      visited[i][j] = true;

      answer += cost;

      for (let [di, dj] of dir) {
        const ni = di + i;
        const nj = dj + j;

        if (ni >= 0 && ni < n && nj >= 0 && nj < n) {
          //visited 배열에다 true 설정 안하는 이유
          //방문 처리는 큐에서 간선을 꺼내어 실제로 이동할 때 이루어짐

          const tempCost = Math.abs(land[i][j] - land[ni][nj]);
          const newCost = tempCost > height ? tempCost : 0;

          q.push([newCost, ni, nj]);
        }
      }
    }
  }
  return answer;
}

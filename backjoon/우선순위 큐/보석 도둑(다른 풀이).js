const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

class MaxHeap {
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

  bubbleUp() {
    let index = this.size() - 1;

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);

      if (this.items[parentIndex] >= this.items[index]) {
        break;
      }

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
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

  bubbleDown() {
    let index = 0;

    while (index * 2 + 1 < this.size()) {
      let leftChild = index * 2 + 1;
      let rightChild = index * 2 + 2;

      let largerChild =
        rightChild < this.size() &&
        this.items[rightChild] > this.items[leftChild]
          ? rightChild
          : leftChild;

      if (this.items[index] >= this.items[largerChild]) {
        break;
      }

      this.swap(index, largerChild);
      index = largerChild;
    }
  }
}

const [N, K] = input[0].split(" ").map(Number);
let answer = 0;

const maxHeap = new MaxHeap();

let jewel = input
  .slice(1, N + 1)
  //각 라인 별로 배열 분리 및 숫자 처리
  .map((line) => line.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);

let bag = input
  .slice(N + 1, N + K + 1)
  .map(Number)
  .sort((a, b) => a - b);

let j = 0;
for (let i = 0; i < K; i++) {
  while (j < N && jewel[j][0] <= bag[i]) {
    maxHeap.push(jewel[j][1]); //마찬가지로 최대 가치의 보석을 뽑을 수 있도록 push
    j++;
  }

  if (maxHeap.size()) {
    answer += maxHeap.pop();
  }
}

console.log(answer);

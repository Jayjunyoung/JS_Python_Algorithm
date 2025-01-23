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

const [n, k] = input.shift().split(" ").map(Number);

// 보석 정보와 가방 정보 분리
const jewels = [];
const bags = [];

for (let i = 0; i < n; i++) {
  const [m, v] = input[i].split(" ").map(Number);
  jewels.push({ weight: m, value: v });
}

for (let i = n; i < n + k; i++) {
  bags.push(Number(input[i]));
}

// 보석과 가방 정렬
jewels.sort((a, b) => a.weight - b.weight); // 무게 기준 오름차순 정렬
bags.sort((a, b) => a - b); // 가방 용량 기준 오름차순 정렬

const maxHeap = new MaxHeap();
let totalValue = 0;
let jewelIndex = 0;

// 각 가방에 대해 처리
for (const bag of bags) {
  // 가방의 무게 제한에 맞는 보석을 최대 힙에 추가
  while (jewelIndex < jewels.length && jewels[jewelIndex].weight <= bag) {
    maxHeap.push(jewels[jewelIndex].value);
    jewelIndex++;
  }

  // 현재 가방에 가장 가치가 높은 보석을 담음
  if (maxHeap.size() > 0) {
    totalValue += maxHeap.pop();
  }
}

console.log(totalValue);

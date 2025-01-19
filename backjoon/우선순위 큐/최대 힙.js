const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

//최소힙 구현
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
      return 0;
    }

    const max = this.items[0];
    this.items[0] = this.items[this.size() - 1];
    this.items.pop();
    this.bubbleDown();
    return max;
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
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

  bubbleDown() {
    let index = 0;
    while (index * 2 + 1 < this.size()) {
      let leftChild = index * 2 + 1;
      let rightChild = index * 2 + 2;

      let smallerChild =
        rightChild < this.size() &&
        this.items[rightChild] > this.items[leftChild]
          ? rightChild
          : leftChild;

      if (this.items[index] >= this.items[smallerChild]) {
        break;
      }

      this.swap(index, smallerChild);
      index = smallerChild;
    }
  }
}

const n = +input.shift();
const minHeap = new MinHeap();
const results = [];

for (let i = 0; i < n; i++) {
  const number = +input[i];

  if (number > 0) {
    minHeap.push(number);
  } else if (number === 0) {
    results.push(minHeap.pop());
  }
}

console.log(results.join("\n"));

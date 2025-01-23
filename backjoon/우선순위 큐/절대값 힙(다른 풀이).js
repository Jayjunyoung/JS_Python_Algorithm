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

    const min = this.items[0];
    this.items[0] = this.items[this.size() - 1];
    this.items.pop();
    this.bubbleDown();
    //절대값이 아닌 두번째 요소인 원래값을 반환한다.
    return min[1];
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }

  bubbleUp() {
    let index = this.size() - 1;

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);

      if (
        this.items[parentIndex][0] < this.items[index][0] ||
        (this.items[parentIndex][0] === this.items[index][0] &&
          this.items[parentIndex][1] <= this.items[index][1])
      ) {
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
        (this.items[rightChild][0] < this.items[leftChild][0] ||
          (this.items[rightChild][0] === this.items[leftChild][0] &&
            this.items[rightChild][1] < this.items[leftChild][1]))
          ? rightChild
          : leftChild;

      if (
        this.items[index][0] < this.items[smallerChild][0] ||
        (this.items[index][0] === this.items[smallerChild][0] &&
          this.items[index][1] <= this.items[smallerChild][1])
      ) {
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

  if (number !== 0) {
    //절대값은 음수도 삽입 가능해야 하므로 조건문 로직 변경
    minHeap.push([Math.abs(number), number]);
  } else {
    results.push(minHeap.pop());
  }
}

console.log(results.join("\n"));

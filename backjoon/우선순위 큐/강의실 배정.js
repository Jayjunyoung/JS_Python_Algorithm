const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

class MinHeap {
  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  push(item) {
    this.items.push(item);
    this.bubbleUp(); //힙 위치 재정렬 시켜줌
  }

  pop() {
    if (this.size() === 0) {
      return null;
    }

    const min = this.items[0];
    this.items[0] = this.items[this.size() - 1];
    this.items.pop(); //기본 자바스크립트의 pop()를 의미한다
    this.bubbleDown(); //힙 위치 재정렬 시켜줌
    return min;
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }

  bubbleUp() {
    let index = this.size() - 1;

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);

      if (this.items[parentIndex] <= this.items[index]) {
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
        this.items[rightChild] < this.items[leftChild]
          ? rightChild
          : leftChild;

      if (this.items[index] <= this.items[smallerChild]) {
        break;
      }

      this.swap(index, smallerChild);
      index = smallerChild;
    }
  }
}

const n = +input.shift();
const mh = new MinHeap();

const lecture = [];

for (let i = 0; i < n; i++) {
  const l = input[i].split(" ").map(Number);
  lecture.push(l);
}

lecture.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

//첫번째 강의실은 우선 배정(가장 종료시간이 작은 것이므로)
mh.push(lecture[0][1]);

for (let i = 1; i < n; i++) {
  const [start, finish] = lecture[i];

  // 현재 강의 시작 시간보다 더 일찍 끝나는 강의가 있다면, 해당 강의실 재활용
  if (mh.items[0] <= start) {
    console.log(mh.items[0]); //console 찍어보니 3이 나옴
    //mh.items[0]은 가장 작은 종료시간인 3이 담겨있고 즉 start보다 작으므로 재활용 가능
    //3 제거되고 5가 추가 -> 클래스에 작성한 pop 메소드를 의미한다
    mh.pop();
  }
  mh.push(finish);
}

console.log(mh.size());

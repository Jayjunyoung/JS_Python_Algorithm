let input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, c] = input.shift().split(" ").map(Number);

//[1, 1]
input = input[0].split(" ").map(Number);

//두 개의 부분집합으로 나눔
const A = input.splice(0, parseInt(input.length / 2));
const B = input;

let sumA = [];
let sumB = [];

//부분집합의 합을 찾는 함수
const SumSubSet = (Arr, targetArr, index, sum) => {
  if (index === Arr.length) {
    targetArr.push(sum);
    return;
  }

  //재귀 알고리즘 적용
  SumSubSet(Arr, targetArr, index + 1, sum); // 현재 요소 포함 안하는 경우
  SumSubSet(Arr, targetArr, index + 1, sum + Arr[index]); // 현재 요소 포함 하는 경우
};

const BinarySearch = (Arr, T) => {
  let Start = 0;
  let End = Arr.length;

  while (Start < End) {
    const mid = Math.floor((Start + End) / 2);
    if (Arr[mid] <= T) {
      Start = mid + 1;
    } else {
      End = mid;
    }
  }

  return End;
};

// 2개의 부분집합의 합을 찾아줌.
SumSubSet(A, sumA, 0, 0);
SumSubSet(B, sumB, 0, 0);
// 이분 탐색을 위해 정렬.
sumA.sort((a, b) => a - b);

let result = 0;

for (const num of sumB) {
  if (num > c) continue;

  result += BinarySearch(sumA, c - num);
}

console.log(result);

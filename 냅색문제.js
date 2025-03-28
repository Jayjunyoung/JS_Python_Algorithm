const fs = require("fs");

let input = fs
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, c] = input.shift().split(" ").map(Number);
input = input[0].split(" ").map(Number);

const A = input.splice(0, parseInt(input.length / 2));
const B = input;
let result = 0;

const sumA = [];
const sumB = [];

const SumSubSet = (arr, targetArr, index, sum) => {
  if (index === arr.length) {
    targetArr.push(sum);
    return;
  }

  SumSubSet(arr, targetArr, index + 1, sum);
  SumSubSet(arr, targetArr, index + 1, sum + arr[index]);
};

SumSubSet(A, sumA, 0, 0);
SumSubSet(B, sumB, 0, 0);

//이분탐색을 위한 오름차순 정렬
sumA.sort((a, b) => a - b);

const BinarySearch = (arr, t) => {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[mid] <= t) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }

  return end;
};

for (let number of sumB) {
  if (c - number < 0) {
    continue;
  }

  result += BinarySearch(sumA, c - number);
}

console.log(result);

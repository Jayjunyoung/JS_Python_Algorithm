const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const numberArray = input[0].split(" ").map(Number);

numberArray.sort((a, b) => a - b); // 배열 정렬
let count = 0;

for (let i = 0; i < n; i++) {
  let left = 0;
  let right = n - 1;

  while (left < right) {
    if (left === i) {
      left++;
      continue;
    }

    if (right === i) {
      right--;
      continue;
    }

    const sum = numberArray[left] + numberArray[right];

    if (sum === numberArray[i]) {
      count++;
      break;
    } else if (sum < numberArray[i]) {
      left++;
    } else {
      right--;
    }
  }
}

console.log(count);

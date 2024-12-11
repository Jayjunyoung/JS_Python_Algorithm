const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift(); //n = 5
const array = input[0].split(" ").map(Number); //이미 정렬이 되어있음
let minSum = Infinity;
let left = 0;
let right = n - 1;
let result = [array[left], array[right]];

while (left < right) {
  const sum = array[left] + array[right];

  if (Math.abs(sum) < Math.abs(minSum)) {
    minSum = sum;
    result = [array[left], array[right]];
  }

  if (sum > 0) {
    right--;
  } else {
    left++;
  }
}

console.log(result[0], result[1]);

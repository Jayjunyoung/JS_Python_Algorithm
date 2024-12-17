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
      //i가 2, 즉 left, right 인덱스에 해당하는 값의 합이 3인지를 검사해야하는데 left가 인덱스 2에 위치하면 안됌
      //left자체로 3이 되어버러니까!
      left++;
      continue;
    }

    if (right === i) {
      //위에 주석과 마찬가지 의미
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

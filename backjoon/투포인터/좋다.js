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
  //numberArray 배열을 체크하기 위한 인덱스
  let left = 0;
  let right = n - 1;
  //i가 다음으로 넘어 갈 때 left 0 right는 9 유지

  while (left < right) {
    if (left === i) {
      left++;
      continue;
    } else if (right === i) {
      right--;
      continue;
    }

    const sum = numberArray[left] + numberArray[right];

    if (sum === numberArray[i]) {
      count++;
      break; //for 루프의 다음 반복으로 이동, 즉 다음 타겟 숫자로 이동
    } else if (sum < numberArray[i]) {
      left++;
    } else if (sum > numberArray[i]) {
      right--;
    }
  }
}

console.log(count);

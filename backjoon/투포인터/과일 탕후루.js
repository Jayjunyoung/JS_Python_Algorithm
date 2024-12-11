const { loadEnvFile } = require("process");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const fruits = input[1].split(" ").map(Number);

let left = 0;
let right = 0;
let maxLen = 0;
const fruitCount = new Map();

while (right < n) {
  //n이 5이므로 right가 5보다 작을 동안
  const rightFruit = fruits[right];

  fruitCount.set(rightFruit, (fruitCount.get(rightFruit) || 0) + 1);

  while (fruitCount.size > 2) {
    //과일의 종류가 2개 초과 일때 실행
    const leftFruit = fruits[left];
    fruitCount.set(leftFruit, fruitCount.get(leftFruit) - 1);
    if (fruitCount.get(leftFruit) === 0) {
      fruitCount.delete(leftFruit);
    }
    left++;
  }

  //여기서 left는 위에서 ++로 증가되어 2라도 계산할 때는 1일 것
  maxLen = Math.max(maxLen, right - left + 1);
  right++;
}

console.log(maxLen);

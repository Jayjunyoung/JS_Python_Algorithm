const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input.shift().split(" ").map(Number);

function solution(n, k) {
  let digit = 1; //현재 자릿수
  let count = 9; //현재 자릿수의 포함된 숫자의 갯수
  let length = 0; //누적된 자릿수 길이

  while (k > length + digit * count) {
    length += digit * count;
    digit++;
    count *= 10;
  }

  const offset = k - length - 1;
  const number = Math.floor(offset / digit) + Math.pow(10, digit - 1);
  const index = offset % digit;

  if (number > n) {
    return -1;
  }

  return String(number)[index];
}

console.log(solution(n, k));

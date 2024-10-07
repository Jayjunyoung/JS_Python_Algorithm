const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const m = +input.shift();

//정렬 생각못함
const array = input[0]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let result = 0;

while (array.length > 1) {
  //두 숫자를 더해야하기 때문에 array의 크기가 1보다 크도록 하기위해
  const sum = array[0] + array[array.length - 1];
  if (sum === m) {
    result++;
    array.shift();
    array.pop();
  } else sum < m ? array.shift() : array.pop();
}

console.log(result);

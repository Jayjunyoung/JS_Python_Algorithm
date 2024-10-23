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
  const sum = array[0] + array[array.length - 1];

  if (sum === m) {
    result++;
    array.pop();
    array.shift();
  } else {
    sum >= m ? array.pop() : array.shift();
  }
}

console.log(result);

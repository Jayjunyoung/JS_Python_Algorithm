const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

let answer = -1;

let fiveBox = Math.floor(n / 5);

while (fiveBox >= 0) {
  let remaining = n - fiveBox * 5;

  if (remaining % 3 === 0) {
    answer = remaining / 3 + fiveBox;
    break;
  } else {
    fiveBox -= 1;
  }
}

console.log(answer);

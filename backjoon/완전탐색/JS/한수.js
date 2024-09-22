const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

let hansuCount = 0;

for (let i = 1; i <= n; i++) {
  if (i < 100) {
    hansuCount++;
  } else {
    let array = String(i).split("").map(Number);
    if (array[0] - array[1] === array[1] - array[2]) {
      hansuCount++;
    }
  }
}

console.log(hansuCount);

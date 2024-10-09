const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = input.shift();
let answer = 0;

const times = input
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    else return a[1] - b[1];
  });

let et = 0;

times.forEach((t, i) => {
  if (t[0] >= et) {
    answer++;

    et = t[1];
  }
});

console.log(answer);

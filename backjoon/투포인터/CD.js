const fs = require("fs");

let input = fs
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let result = [];
let index = 0;

while (true) {
  const [n, m] = input[index].split(" ").map(Number);

  if (n === 0 && m === 0) break;

  const sliceA = input.slice(index + 1, index + 1 + n).map(Number);
  const sliceB = input.slice(index + 1 + n, index + 1 + n + m).map(Number);

  let i = 0;
  let j = 0;
  let count = 0;

  while (i < n && j < m) {
    if (sliceA[i] === sliceB[j]) {
      i++;
      j++;
      count++;
    } else if (sliceA[i] < sliceB[j]) {
      i++;
    } else {
      j++;
    }
  }

  result.push(count);
  index += n + m + 1;
}

console.log(result.join("\n"));

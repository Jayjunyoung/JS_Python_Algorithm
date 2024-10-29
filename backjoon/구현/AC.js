const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const t = +input.shift();
let answer = [];

for (let i = 0; i < t; i++) {
  const func = input[i * 3].match(/(.)\1*/g);
  const n = +input[i * 3 + 1];
  let arr = JSON.parse(input[i * 3 + 2]);

  let revFlag = false;
  let startIndex = 0;
  let endIdx = arr.length;

  func.forEach((c) => {
    if (arr === "error") return;

    if (c[0] === "R") {
      if (c.length % 2) revFlag = !revFlag;
    } else {
      if (c.length > arr.length) return (arr = "error");

      revFlag ? (endIdx -= c.length) : (startIndex += c.length);
      if (startIndex > endIdx) arr = "error";
    }
  });

  if (arr !== "error") {
    arr = arr.slice(startIndex, endIdx);
    if (revFlag) arr.reverse();
    arr = JSON.stringify(arr);
  }

  answer.push(arr);
}

console.log(answer.join("\n"));

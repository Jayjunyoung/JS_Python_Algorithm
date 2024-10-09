const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const t = +input.shift(); //테스트케이스 갯수
let answer = []; //여기 2개의 배열을 담아서 길이 출력

for (let i = 0; i < t; i++) {
  const [n, m] = input.shift().split(" ").map(Number);
  const a = input.shift().split(" ").map(Number);
  const b = input
    .shift()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  let cnt = 0;

  a.forEach((v) => {
    let min = 0;
    let max = b.length - 1;

    while (min <= max) {
      let mid = Math.floor((min + max) / 2);

      if (b[mid] < v) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    cnt += min;
  });

  answer.push(cnt);
}

console.log(answer.join("\n"));

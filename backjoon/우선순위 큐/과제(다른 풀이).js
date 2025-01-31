const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const tasks = input.map((v) => v.split(" ").map(Number));

tasks.sort((a, b) => b[1] - a[1]);

let answer = 0;

const maxDeadline = Math.max(...tasks.map(([d]) => d));

//인덱스는 0부터 시작하기에 +1 해주기
const visited = Array(maxDeadline + 1).fill(false);

for (const [deadline, score] of tasks) {
  for (let day = deadline; day >= 1; day--) {
    if (!visited[day]) {
      visited[day] = true;
      answer += score;
      break;
    }
  }
}

console.log(answer);

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

let answer = 0;
let classRoom = 0;
const lecture = [];

for (let i = 0; i < n; i++) {
  const l = input[i].split(" ").map(Number);
  lecture.push({ time: l[0], start: 1 });
  lecture.push({ time: l[1], start: -1 });
}

lecture.sort((a, b) =>
  //동일한 time에 대해 start 값을 기준으로 정렬:
  //끝나는 시간(start: -1)이 시작 시간(start: 1)보다 우선.
  a.time === b.time ? a.start - b.start : a.time - b.time
);

lecture.forEach((schedule) => {
  if (schedule.start === -1) {
    classRoom -= 1;
  } else if (schedule.start === 1) {
    classRoom += 1;
  }

  answer = classRoom > answer ? classRoom : answer;
});

console.log(answer);

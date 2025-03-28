const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = +input.shift();
const k = +input.shift();
const arr = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));

for (let i = 0; i < k; i++) {
  const [row, col] = input[i].split(" ").map(Number);
  arr[row - 1][col - 1] = 2;
}

const record = [];
for (let i = 0; i < +input[k]; i++) {
  const [time, dir] = input[k + 1 + i].trim().split(" ");
  record.push([+time, dir]);
}

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let time = (curDir = 0);
let head = [0, 0];
let tail = [0, 0];
let dirChangeTime = record[0][0];
const path = [];

while (1) {
  const nx = head[0] + dx[curDir];
  const ny = head[1] + dy[curDir];
  if (nx < 0 || nx >= n || ny < 0 || ny >= n) break;
  else if (arr[nx][ny] === 1) break;
  else {
    if (arr[nx][ny] === 2) {
      arr[nx][ny] = 1;
      path.push([nx, ny]);
      head = [nx, ny];
    } else if (arr[nx][ny] === 0) {
      head = [nx, ny];
      arr[nx][ny] = 1;
      path.push([nx, ny]);
      arr[tail[0]][tail[1]] = 0;
      let next = path.shift();
      tail = [next[0], next[1]];
    }
  }
  time++;

  if (time === dirChangeTime) {
    if (record[0][1] === "D") {
      curDir = (curDir + 1) % 4;
    } else if (record[0][1] === "L") {
      if (curDir - 1 < 0) curDir = 3;
      else curDir = (curDir - 1) % 4;
    }
    record.shift();
    if (record.length === 0) dirChangeTime = 0;
    else dirChangeTime = record[0][0];
  }
}

console.log(time + 1);

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const k = +input.shift();
const map = Array.from({ length: n }, () => Array(n).fill(0));

for (let i = 0; i < k; i++) {
  //사과를 map에서 2로 설정하자 + 구조분해할당 하자
  const [row, col] = input[i].split(" ").map(Number);
  map[row - 1][col - 1] = 2;
}

//방향 전환 기록 배열
const record = [];
for (let i = 0; i < +input[k]; i++) {
  const [time, dir] = input[k + 1 + i].trim().split(" ");
  record.push([+time, dir]);
}

const dir = [
  [0, 1], //우
  [1, 0], //하
  [0, -1], //좌
  [-1, 0], //상
];

let time = 0;
let curDir = 0; //초기 방향은 오른쪽 임
let head = [0, 0];
let tail = [0, 0];
let dirChangeTime = record[0][0];
//초기 record[0][0]
const path = []; // 뱀의 이동 경로

while (true) {
  //curDir은 동적으로 계산하기
  const nx = head[0] + dir[curDir][0];
  const ny = head[1] + dir[curDir][1];
  //범위를 벗어나거나
  if (nx < 0 || nx >= n || ny < 0 || ny >= n) break;
  //자기 자신 이라면 반복문 탈출
  else if (map[nx][ny] === 1) break;
  else {
    if (map[nx][ny] === 2) {
      map[nx][ny] = 1;
      path.push([nx, ny]);
      head[0] = nx;
      head[1] = ny;
    } else if (map[nx][ny] === 0) {
      head[0] = nx;
      head[1] = ny;
      map[nx][ny] = 1;
      //빈칸이 뱀의 머리로 채워짐
      path.push([nx, ny]);
      //꼬리가 위치한 칸 비워주기
      map[tail[0]][tail[1]] = 0;
      let next = path.shift();
      //이동경로에서 새로운 경로 가져오기
      tail[0] = next[0];
      tail[1] = next[1];
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

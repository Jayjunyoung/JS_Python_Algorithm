const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
let [x, y, d] = input.shift().split(" ").map(Number);

let ans = 0;
let cnt = 0;

const room = input.map((v) => v.split(" ").map(Number));

//중복 청소를 막기 위해 방문처리 배열을 만듬
const visited = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => false)
);

const dir = [
  [-1, 0], //북
  [0, 1], //동
  [1, 0], //남
  [0, -1], //서
];

//1번 조건
while (1) {
  //반복문이 언제 끝날지 모르기 때문에 일단 인자를 1로 설정
  if (!visited[x][y]) {
    //방문한다는 것은 청소한 것을 의미
    visited[x][y] = true;
    //청소했다는 것 이므로 2로 표시
    room[x][y] = 2;
    //청소횟수 증가
    ans++;
  }

  //반 시계 방향으로 회전
  //3번 조건
  let cleaned = false;
  for (let i = 0; i < 4; i++) {
    d = (d + 3) % 4;
    const [nx, ny] = [x + dir[d][0], y + dir[d][1]];

    if (
      nx >= 0 &&
      nx < n &&
      ny >= 0 &&
      ny < m &&
      room[nx][ny] === 0 &&
      !visited[nx][ny]
    ) {
      x = nx;
      y = ny;
      //새로운 위치로 이동 후 청소 불가능 한 카운트 초기화
      cnt = 0;
      cleaned = true;
      break;
    }
  }

  //2번 조건
  //청소 가능한 곳이 없을 경우 : 후진 또는 종료
  if (!cleaned) {
    cnt++;

    const [backX, backY] = [x - dir[d][0], y - dir[d][1]];
    //후진 했는데 벽이면 반복문 탈출
    if (room[backX][backY] === 1) break;

    x = backX;
    y = backY;
    cnt = 0;
  }
}

console.log(ans);

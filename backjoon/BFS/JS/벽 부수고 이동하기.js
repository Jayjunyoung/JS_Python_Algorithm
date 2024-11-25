let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
input = input.slice(1).map((v) => v.split("").map(Number));

// 방문 상태 배열 초기화
const visited = Array.from(new Array(N), () => new Array());
const dRow = [1, 0, -1, 0]; // 행 방향 이동 (하, 우, 상, 좌)
const dCol = [0, 1, 0, -1]; // 열 방향 이동 (우, 하, 좌, 상)
const queue = [];

// 방문 상태 초기화
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    visited[i][j] = new Array(2).fill(0);
  }
}

queue.push([0, 0, 0]); // [row, col, 벽을 부쉈는지 여부]
visited[0][0][0] = 1; // 시작 지점 거리: 1

function BFS() {
  let idx = 0;

  while (idx !== queue.length) {
    const [row, col, isBreak] = queue[idx];

    // 도착 지점에 도달한 경우
    if (row === N - 1 && col === M - 1) {
      return visited[row][col][isBreak];
    }

    // 4방향 탐색
    for (let i = 0; i < 4; i++) {
      const nextRow = row + dRow[i];
      const nextCol = col + dCol[i];

      // 유효한 맵 범위 내인지 확인
      if (nextRow >= 0 && nextRow < N && nextCol >= 0 && nextCol < M) {
        // 빈 칸(0)이고 아직 방문하지 않은 경우
        if (
          input[nextRow][nextCol] === 0 &&
          visited[nextRow][nextCol][isBreak] === 0
        ) {
          visited[nextRow][nextCol][isBreak] = visited[row][col][isBreak] + 1;
          queue.push([nextRow, nextCol, isBreak]);
        } else if (input[nextRow][nextCol] === 1 && isBreak === 0) {
          visited[nextRow][nextCol][isBreak + 1] =
            visited[row][col][isBreak] + 1;
          queue.push([nextRow, nextCol, isBreak + 1]);
        }
      }
    }
    idx++;
  }

  return -1; // 도달할 수 없는 경우
}

console.log(BFS());

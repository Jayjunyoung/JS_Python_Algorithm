const fs = require("fs");

let input = fs
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const k = +input.shift();

let board = Array.from({ length: n + 2 }, () => Array(n).fill(0));

for (let i = 0; i <= n; i++) {
  // board 벽처리를 먼저해주기
  board[0][i] = 1;
  board[i][0] = 1;
  board[n + 1][i] = 1;
  board[i][n + 1] = 1;
}

for (let i = 0; i < k; i++) {
  //사과 위치 등록
  const [apple_x, apple_y] = input.shift().split(" ").map(Number);
  board[apple_x][apple_y] = 2;
}

const l = +input.shift();

const dir = new Map();
for (let i = 0; i < l; i++) {
  const [dirChangeTime, direction] = input[i].split(" ");
  dir.set(+dirChangeTime, direction);
}

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

let current_dir = 1;
let snake = [];
let second = 0;

snake.push([1, 1]);

let flag = 0;

while (snake.length) {
  let [snake_x, snake_y] = snake[0];
  second++;

  if (dir.has(second - 1)) {
    let change_dir = dir.get(second - 1);

    if (change_dir === "D") {
      //D: 방향 오른쪽으로 변경
      current_dir = (current_dir + 1) % 4;
    } else {
      //L: 방향 왼쪽으로 변경
      current_dir = (current_dir + 3) % 4;
    }
  }

  let currentSnake =
    board[snake_x + dx[current_dir]][snake_y + dy[current_dir]];

  if (currentSnake === 1) break;
  else {
    let move_head_x = snake_x + dx[current_dir];
    let move_head_y = snake_y + dy[current_dir];

    snake.unshift([move_head_x, move_head_y]);

    if (currentSnake === 2) {
      board[move_head_x][move_head_y] = 0;
    }

    if (currentSnake !== 2) {
      for (let i = snake.length - 1; i >= 1; i--) {
        let [tmp_x, tmp_y] = snake[i];
        if (tmp_x === move_head_x && tmp_y === move_head_y) {
          flag = 1;
          break;
        }
      }
      //꼬리 제거 해버리기
      snake.pop();
    }
  }
  //꼬리랑 몸통이 만났다면 while문 탈출
  if (flag) break;
}

console.log(second);

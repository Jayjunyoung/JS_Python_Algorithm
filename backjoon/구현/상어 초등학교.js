const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

const students = input.map((line) => line.split(" ").map(Number));

const board = Array.from({ length: n }, () => Array(n).fill(null));
//likes 배열이 의미하는 것은?
//학생번호를 기준으로 10개의 리스트를 만듬
const likes = Array.from({ length: n * n + 1 }, () => []);

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

//학생이 좋아하는 친구가 인접한 자리에 있을 때 얻는 점수를
//설정하기 위해 만듬
const scores = {
  0: 0,
  1: 1,
  2: 10,
  3: 100,
  4: 1000,
};

//좌표 유효성 판단
function isValid(x, y) {
  return x >= 0 && x < n && y >= 0 && y < n;
}

//이게 핵심 함수
function arrageStudent(student, likeFriends) {
  let maxLikes = -1;
  let maxEmpty = -1;
  let bestPosition = null;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] !== null) continue;

      let likeCount = 0; // 좋아하는 친구가 인접한 자리에 있는 수
      let emptyCount = 0; // 인접한 빈자리 수

      for (const [dr, dc] of dir) {
        const nr = r + dr;
        const nc = c + dc;

        if (!isValid(nr, nc)) continue;
        if (board[nr][nc] === null) emptyCount++;
        if (likeFriends.includes(board[nr][nc])) likeCount++;
      }

      if (
        //이 부분이 1. ~ 3. 부분 조건 로직
        likeCount > maxLikes ||
        (likeCount === maxLikes && emptyCount > maxEmpty)
      ) {
        maxLikes = likeCount;
        maxEmpty = emptyCount;
        bestPosition = [r, c];
      }
    }
  }

  const [bestR, bestC] = bestPosition;
  board[bestR][bestC] = student;
}

//학생이 좋아하는 친구들
for (const [student, ...likeFriends] of students) {
  likes[student] = likeFriends;
  arrageStudent(student, likeFriends);
}

let answer = 0;

for (let r = 0; r < n; r++) {
  for (let c = 0; c < n; c++) {
    const student = board[r][c];
    const likeFriends = likes[student];
    let likeCount = 0;

    for (const [dr, dc] of dir) {
      const nr = r + dr;
      const nc = c + dc;
      if (isValid(nr, nc) && likeFriends.includes(board[nr][nc])) {
        likeCount++;
      }
    }

    answer += scores[likeCount];
  }
}

console.log(answer);

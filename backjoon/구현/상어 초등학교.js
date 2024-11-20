const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

let students = input.map((v) => v.split(" ").map(Number));

let board = Array.from({ length: n }, () => Array(n).fill(null));

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const likes = Array.from({ length: n * n + 1 }, () => []);

const scores = {
  0: 0,
  1: 1,
  2: 10,
  3: 100,
  4: 1000,
};

const isValid = (x, y) => {
  return x >= 0 && x < n && y >= 0 && y < n;
};

const arrageStudents = (student, likeStudents) => {
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
        if (likeStudents.includes(board[nr][nc])) likeCount++;
      }

      if (
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
};

for (const [student, ...likeStudents] of students) {
  likes[student] = likeStudents;
  arrageStudents(student, likeStudents);
}

let answer = 0;

//만족도 구하는거지
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

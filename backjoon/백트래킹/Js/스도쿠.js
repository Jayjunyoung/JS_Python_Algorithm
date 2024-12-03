const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

// 2차원 배열 map 구성
let map = input.map((row) => row.split(" ").map(Number));
const zeroCoords = getZeroCoords(); // 0이 있는 좌표 정보 배열
const count = zeroCoords.length;

// DFS 백트래킹 함수
const dfs = (L) => {
  if (L === count) {
    map.forEach((row) => console.log(row.join(" "))); // 결과 출력
    process.exit(0); // 정답 출력 후 종료
  }

  const [row, col] = zeroCoords[L];

  for (let i = 1; i <= 9; i++) {
    if (check(row, col, i)) {
      map[row][col] = i; // 값 채우기
      dfs(L + 1); // 다음 단계로 이동
      map[row][col] = 0; // 백트래킹
    }
  }
};

// 스도쿠 조건 검사 함수
const check = (row, col, value) => {
  const threeRow = Math.floor(row / 3) * 3;
  const threeCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 9; i++) {
    if (map[row][i] === value || map[i][col] === value) return false;
  }

  for (let i = threeRow; i < threeRow + 3; i++) {
    for (let j = threeCol; j < threeCol + 3; j++) {
      if (map[i][j] === value) return false;
    }
  }
  return true;
};

// 빈 칸 좌표 찾기 함수
function getZeroCoords() {
  const arr = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (map[i][j] === 0) arr.push([i, j]);
    }
  }
  return arr;
}

// DFS 실행
dfs(0);

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [r, c] = input.shift().split(" ").map(Number);

const alphabet = input.map((v) => v.split(""));
//알파벳 26개이므로 방문처리 배열 생성
let visited = Array(26).fill(false);

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let maxPath = 0;

const dfs = (x, y, pathLength) => {
  maxPath = Math.max(maxPath, pathLength);
  let charIdx = alphabet[x][y].charCodeAt(0) - 65;
  visited[charIdx] = true;

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + dir[i][0], y + dir[i][1]];
    if (nx >= 0 && nx < r && ny >= 0 && ny < c) {
      //새로운 인덱스를 구하지않았음
      //11.15일자 복습
      let newCharIdx = alphabet[nx][ny].charCodeAt(0) - 65;
      if (!visited[newCharIdx]) {
        visited[newCharIdx] = true;
        dfs(nx, ny, pathLength + 1);
        visited[newCharIdx] = false;
      }
    }
  }
};

dfs(0, 0, 1);
//밟는 칸부터 갯수 세야하므로 경로 길이 1로 시작
console.log(maxPath);

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");

// 격자 크기 n, m
const [n, m] = input.shift().split(" ").map(Number);

// 격자 정보 입력
let grid = input.slice(0, n).map((line) => line.split(" ").map(Number));

// 두 번의 공격 정보
const attack1 = input[n].split(" ").map(Number);
const attack2 = input[n + 1].split(" ").map(Number);

//attack 함수를 구현하는 것이 핵심

const attack = (L, R) => {
  for (let row = L - 1; row < R; row++) {
    for (let col = 0; col < m; col++) {
      if (grid[row][col] === 1) {
        grid[row][col] = 0;
        break;
      }
    }
  }
};

attack(attack1[0], attack1[1]);
attack(attack2[0], attack2[1]);

const result = grid.flat().filter((cell) => cell === 1).length;
console.log(result);

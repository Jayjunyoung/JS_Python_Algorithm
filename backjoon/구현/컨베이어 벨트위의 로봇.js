const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input.shift().split(" ").map(Number);
const durability = input[0].split(" ").map(Number);
let robots = Array(2 * n).fill(0);
let ans = 0;

//벨트, 로봇 회전 함수
const rotate = () => {
  durability.unshift(durability.pop());
  robots.unshift(robots.pop());
  robots[n - 1] = 0;
};

//로봇 이동 함수
const moveRobots = () => {
  for (let i = n - 2; i >= 0; i--) {
    if (robots[i] && !robots[i + 1] && durability[i + 1] > 0) {
      robots[i] = 0;
      robots[i + 1] = 1;
      durability[i + 1]--;
    }
  }
  robots[n - 1] = 0;
};

const placeRobot = () => {
  if (durability[0] > 0) {
    robots[0] = 1;
    durability[0]--;
  }
};

const checkEnd = () => {
  return durability.filter((v) => v === 0).length >= k;
};

while (!checkEnd()) {
  ans++;
  rotate(); // 1. 벨트 회전
  moveRobots(); // 2. 로봇 이동
  placeRobot(); // 3. 로봇 올리기
}

console.log(ans);

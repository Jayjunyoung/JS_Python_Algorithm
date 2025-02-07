const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [v, m] = input.shift().split(" ").map(Number);
const [xs, ys] = input.shift().split(" ").map(Number);
const [xt, yt] = input.shift().split(" ").map(Number);

const maxDist = v * m * 60; // 최대 이동 가능 거리
const bunkers = input.map((line) => line.split(" ").map(Number));
bunkers.unshift([xs, ys]); // 시작점 추가
bunkers.push([xt, yt]); // 목적지 추가

const n = bunkers.length;
//인접리스트 기반의 그래프 탐색
const graph = Array.from({ length: n }, () => []);

const EPSILON = 1e-9; // 부동소수점 오차 방지용

// 그래프 생성 (거리 maxDist 이하인 경우 간선 추가)
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    const [x1, y1] = bunkers[i];
    const [x2, y2] = bunkers[j];

    const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

    if (dist <= maxDist + EPSILON) {
      graph[i].push(j);
      graph[j].push(i);
    }
  }
}

// BFS 탐색
const bfs = () => {
  const queue = [[0, 0]]; // [현재 노드, 방문한 벙커 개수]
  const visited = new Array(n).fill(false);
  visited[0] = true;

  while (queue.length) {
    const [current, count] = queue.shift();

    // 목적지 도달 확인
    // 시작노드는 제외하기위해 - 1해줌
    if (current === n - 1) {
      console.log(`Yes, visiting ${count - 1} other holes.`);
      return;
    }

    for (const next of graph[current]) {
      if (!visited[next]) {
        visited[next] = true;
        queue.push([next, count + 1]);
      }
    }
  }

  console.log("No.");
};

bfs();

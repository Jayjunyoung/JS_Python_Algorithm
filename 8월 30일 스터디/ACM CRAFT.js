const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const tc = Number(input[0]);
const answer = [];
let line = 1;

for (let i = 0; i < tc; i++) {
  answer.push(solution(line));
}

console.log(answer.join("\n"));

function solution(L) {
  const [N, K] = input[L].split(" ").map(Number);
  line += K + 3;

  const target = Number(input[line - 1]);

  // 각 건물들의 건설 비용 배열.
  const build = input[L + 1].split(" ").map(Number);
  build.unshift(-1);

  // DP: 각 건물의 선행조건이 포함된 총 비용 배열.
  const acc = [...build];

  // 위상정렬을 위해 선행되는 건물의 개수를 저장할 배열.
  const prev_cnt = new Array(N + 1).fill(0);
  const graph = Array.from({ length: N + 1 }, () => []);

  // 선물들의 선행 순서와 선행 개수를 입력.
  input.slice(L + 2, L + 2 + K).forEach((el) => {
    const [prev, next] = el.split(" ").map(Number);

    graph[prev].push(next);
    prev_cnt[next]++;
  });

  // 위상 정렬 시작.
  const q = [];

  // 선행되는 건물이 없는 경우 큐에 삽입. (정렬 시작점)
  for (let i = 1; i <= N; i++) {
    if (prev_cnt[i] === 0) q.push(i);
  }

  while (q.length) {
    const curr = q.shift();

    // 현재 건물을 지은 후,
    // 다음에 지어야 할 건물의 비용을 계산.
    // 비용이 더 큰 경우만 DP 값 업데이트.
    for (let i = 0; i < graph[curr].length; i++) {
      const next = graph[curr][i];

      if (acc[next] < acc[curr] + build[next]) {
        acc[next] = acc[curr] + build[next];
      }

      prev_cnt[next]--;

      if (prev_cnt[next] === 0) q.push(next);
    }
  }

  return acc[target];
}


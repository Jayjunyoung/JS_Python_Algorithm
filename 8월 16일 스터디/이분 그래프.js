const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let tc = +input.shift();
let index = 0;

/*

1. BFS로 그룹을 번갈아가며 칠함
2. 인접한 노드가 같은 그룹이면 이분 그래프가 아님
3. 모든 연결요소를 검사해야 하므로 모든 정점에 대해 BFS 실행
4. 마지막에 YES/NO 출력
*/

while (tc--) {
  const [V, E] = input[index++].split(" ").map(Number);
  const graph = Array.from({ length: V + 1 }, () => []);
  const visited = Array.from({ length: V + 1 }, () => 0);

  for (let i = 0; i < E; i++) {
    const [from, to] = input[index + i].split(" ").map(Number);
    graph[from].push(to);
    graph[to].push(from);
  }

  const bfs = (start) => {
    let queue = [start];
    let check = 1;

    visited[start] = check;

    while (queue.length) {
      let cur = queue.shift();

      if (visited[cur] === 1) check = 2;
      else if (visited[cur] === 2) check = 1;

      for (let i = 0; i < graph[cur].length; i++) {
        let next = graph[cur][i];
        if (!visited[next]) {
          visited[next] = check;
          queue.push(next);
        } else if (visited[cur] === visited[next]) {
          return;
        }
      }
    }
  };

  for (let i = 1; i <= V; i++) {
    if (!visited[i]) {
      // 만약 bfs 실행 중 이분 그래프가 아니라면 다음 메인 루프로 이동
      bfs(i);
    }
  }

  const isAns = () => {
    for (let i = 1; i <= V; i++) {
      for (let j = 0; j < graph[i].length; j++) {
        let next = graph[i][j];
        if (visited[i] === visited[next]) {
          return console.log("NO");
        }
      }
    }
    return console.log("YES");
  };
  isAns();
  index += E;
}

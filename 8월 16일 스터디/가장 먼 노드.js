function solution(n, edge) {
  return bfs(1, edge, n);
}

const bfs = (start, arr, end) => {
  const visited = Array(end + 1).fill(false); // 방문 여부
  const level = Array(end + 1).fill(0); // 각 노드까지의 거리
  const queue = [start]; // BFS 큐
  visited[start] = true;

  while (queue.length) {
    const head = queue.shift(); // 현재 노드
    const lev = level[head] + 1; // 다음 노드의 거리

    for (let node of arr) {
      // 모든 간선에 대해
      // head와 연결된 노드 중 아직 방문하지 않은 노드 찾기
      if (node[0] === head && !visited[node[1]]) {
        queue.push(node[1]);
        visited[node[1]] = true;
        level[node[1]] = lev;
      } else if (node[1] === head && !visited[node[0]]) {
        queue.push(node[0]);
        visited[node[0]] = true;
        level[node[0]] = lev;
      }
    }
  }

  const maxLevel = Math.max.apply(null, level); // 가장 먼 거리
  return level.filter((i) => i === maxLevel).length; // 가장 먼 노드의 개수
};

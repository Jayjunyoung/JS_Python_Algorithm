function solution(n, wires) {
  let answer = Infinity;

  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of wires) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const bfs = (start, blocked) => {
    // visited 배열은 bfs 내부에서 초기화 해야함
    // 이유: 이전 bfs 호출에서 방문한 상태가 영향을 주면 안됌
    let visited = new Array(n + 1).fill(false);
    let queue = [start];
    visited[start] = true;
    let count = 1; // 시작 노드 포함

    while (queue.length > 0) {
      const current = queue.shift();

      // 현재 노드의 모든 인접 노드 탐색
      for (const next of graph[current]) {
        // 방문하지 않았고, 차단된 노드가 아닌 경우
        if (!visited[next] && next !== blocked) {
          visited[next] = true;
          queue.push(next);
          count++;
        }
      }
    }

    return count;
  };

  for (const [a, b] of wires) {
    // a를 시작으로 b를 차단했을 때의 연결된 노드 수
    const countA = bfs(a, b);
    // b를 시작으로 a를 차단했을 때의 연결된 노드 수
    const countB = bfs(b, a);
    // 각각의 영역을 구분 해주는거임
    // 차단 한 기점으로 각각의 영역에서 노드가 몇개인지 확인하기 위해 bfs 각각 실행

    answer = Math.min(answer, Math.abs(countA - countB));
  }

  return answer;
}

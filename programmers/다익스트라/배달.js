function solution(N, road, K) {
  let distance = Array.from({ length: N + 1 }, () => Infinity);
  let graph = Array.from({ length: N + 1 }, () => []);

  // 도로 정보 그래프에 추가
  for (let [a, b, time] of road) {
    graph[a].push({ to: b, time });
    graph[b].push({ to: a, time });
  }

  // 다익스트라 알고리즘
  const dijkstra = (start) => {
    let pq = [{ to: start, time: 0 }];
    distance[start] = 0;

    while (pq.length) {
      let { to: current, time: currentTime } = pq.pop();

      if (distance[current] < currentTime) continue;

      for (let neighbor of graph[current]) {
        let nextTime = currentTime + neighbor.time;

        if (nextTime < distance[neighbor.to]) {
          distance[neighbor.to] = nextTime;
          pq.push({ to: neighbor.to, time: nextTime });
        }
      }

      pq.sort((a, b) => b.time - a.time); // Min-Heap을 위한 정렬
    }
  };

  // 1번 마을에서 시작
  dijkstra(1);

  // K시간 이하로 배달 가능한 마을 수 세기
  return distance.filter((time) => time <= K).length;
}

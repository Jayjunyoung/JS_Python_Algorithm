function find(parent, i) {
  if (parent[i] === i) {
    return i;
  }

  parent[i] = find(parent, parent[i]);
  return parent[i];
}

function union(parent, rank, x, y) {
  const xRoot = find(parent, x);
  const yRoot = find(parent, y);

  if (rank[xRoot] < rank[yRoot]) {
    parent[xRoot] = yRoot;
  } else if (rank[xRoot] > rank[yRoot]) {
    parent[yRoot] = xRoot;
  } else {
    parent[yRoot] = xRoot;
    rank[xRoot] += 1;
  }
}

function solution(n, costs) {
  costs.sort((a, b) => a[2] - b[2]);

  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = Array(n).fill(0);
  let minCost = 0;
  let edges = 0;

  for (const edge of costs) {
    if (edges === n - 1) break;

    const x = find(parent, edge[0]);
    const y = find(parent, edge[1]);

    if (x !== y) {
      // 본인들의 루트 노드가 다르기 때문에 하나로 합치기
      // 즉, 사이클이 생기지 않을 때 cost[2]를 더해준다
      // 최소신장트리 : 사이클이 없는 연결 그래프
      // V개의 노드를 V-1개의 간선으로 연결
      // 크루스칼 알고리즘의 목적은 주어진 그래프에서 모든 노드를 가장 적은 비용으로 연결
      union(parent, rank, x, y);
      minCost += edge[2];
      edges += 1;
    }
  }

  return minCost;
}

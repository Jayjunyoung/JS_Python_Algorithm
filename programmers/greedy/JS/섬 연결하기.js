const getParent = (parent, x) => {
  if (parent[x] === x) return x;
  return (parent[x] = getParent(parent, parent[x]));
};

const unionParent = (parent, a, b) => {
  const n1 = getParent(parent, a);
  const n2 = getParent(parent, b);

  if (n1 < n2) return (parent[n2] = n1);
  else return (parent[n1] = n2);
};

const findParent = (parent, a, b) => {
  const n1 = getParent(parent, a);
  const n2 = getParent(parent, b);

  if (n1 === n2) return true;
  else return false;
};

function solution(n, costs) {
  let answer = 0;
  const parent = [];
  for (let i = 0; i < n; i++) {
    parent.push(i);
  }

  costs.sort((a, b) => a[2] - b[2]);

  for (let cost of costs) {
    //사이클이 생기지 않을 때 cost[2]를 더해준다
    //최소신장트리 : 사이클이 없는 연결 그래프
    //V개의 노드를 V-1개의 간선으로 연결
    //크루스칼 알고리즘의 목적은 주어진 그래프에서 모든 노드를 가장 적은 비용으로 연결
    if (!findParent(parent, cost[0], cost[1])) {
      answer += cost[2];
      unionParent(parent, cost[0], cost[1]);
    }
  }

  return answer;
}

const getInfo = (edges) => {
  const info = edges.reduce((acc, cur) => {
    // cur[0] 처리: 간선을 "준다"
    if (!acc.has(cur[0])) {
      acc.set(cur[0], [1, 0]);
    } else {
      const [give, receive] = acc.get(cur[0]);
      acc.set(cur[0], [give + 1, receive]);
    }
    // cur[1] 처리: 간선을 "받는다"
    if (!acc.has(cur[1])) {
      acc.set(cur[1], [0, 1]);
    } else {
      const [give, receive] = acc.get(cur[1]);
      acc.set(cur[1], [give, receive + 1]);
    }
    return acc;
  }, new Map());
  return info;
};

const checkGraph = (edges) => {
  const res = Array(4).fill(0);
  for (const [key, value] of edges) {
    const [give, receive] = value;

    if (give >= 2 && receive === 0) {
      res[0] = key;
    }

    if (give === 0) {
      res[2]++;
    }

    if (give >= 2 && receive >= 2) {
      res[3]++;
    }
  }

  // 생성 정점의 간선 갯수에서 막대,도넛 8자 모양 빼주기
  res[1] = edges.get(res[0])[0] - res[2] - res[3];

  return res;
};

function solution(edges) {
  const mapInfo = getInfo(edges);
  const answer = checkGraph(mapInfo);
  return answer;
}

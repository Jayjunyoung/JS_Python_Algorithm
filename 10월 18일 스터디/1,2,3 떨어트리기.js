// 1. 리프노드의 번호 알기
// 2. 각 리프노드가 몇 번째로 도착하는지 구하기
// 3. 각 리프노드에 떨어진 갯수 * 1 < 해당 target < 떨어진 갯수 * 3이 만족하는지 확인

function solution(edges, target) {
  let answer = [];
  let maxNode = 0;
  for (let i = 0; i < edges.length; i++) {
    maxNode = Math.max(maxNode, edges[i][0], edges[i][1]);
  }

  const graph = Array.from({ length: maxNode + 1 }, () => []);
  const lastVisited = {};

  // 그래프 초기화
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    graph[a].push(b);
  }

  // 각 노드의 자식들을 정렬
  for (let i = 1; i < graph.length; i++) {
    graph[i].sort((a, b) => a - b);
    lastVisited[i] = -1;
  }

  // 각 요소에 방문하는 순서 저장하기위함
  let leafOrder = {};

  // 시작점 dfs
  for (let i = 0; i < graph[1].length; i++) {
    treeTraverse(graph[1][i]);
  }

  // 리프 노드 찾기
  function treeTraverse(cur) {
    // 리프 라면
    if (!graph[cur] || graph[cur].length === 0) {
      leafOrder[cur] = [];
      return;
    }

    for (let i = 0; i < graph[cur].length; i++) {
      treeTraverse(graph[cur][i]);
    }
  }

  // 리프 방문 횟수
  let count = 0;

  // 정상 종료인지 확인
  let normalEnd = true;

  while (1) {
    let canEnd = false;

    for (let key in leafOrder) {
      // 모두가 범위 안에 들면
      if (
        leafOrder[key].length * 1 <= target[key - 1] &&
        leafOrder[key].length * 3 >= target[key - 1]
      ) {
        canEnd = true;
      }
      // 절대 못함
      else if (leafOrder[key].length * 1 >= target[key - 1]) {
        canEnd = true;
        normalEnd = false;
        break;
      } else {
        canEnd = false;
        break;
      }
    }

    if (canEnd) {
      break;
    }

    // 1번 노드의 자식들 중 다음 방문할 노드 선택 ->즉, 다음 방문할 노드의 인덱스를 구하는거지
    // 1번 노드의 자식 노드는 2일것이고 2번 노드의 인덱스는 0일것이다
    // 정리: 그래서 lastVisited[1] % graph[1].length 를 해주면 다음 방문할 노드의 인덱스를 구할 수 있다

    let next = graph[1][++lastVisited[1] % graph[1].length];

    while (1) {
      // 리프노드라면
      if (graph[next].length === 0) {
        // 방문횟수 증가
        leafOrder[next].push(count + 1);
        count++;
        break;
      }

      // 올바른 자식을 가리킨다면
      else {
        lastVisited[next] += 1;
        next = graph[next][lastVisited[next] % graph[next].length];
      }
    }
  }

  let realOrder = {};

  if (normalEnd) {
    // 정상적으로 종료됐다면
    for (let key in leafOrder) {
      let start = target[key - 1] - leafOrder[key].length;
      let array = new Array(leafOrder[key].length).fill(1);
      let idx = 0;

      while (1) {
        if (start === 0) {
          break;
        }

        if (start >= 2) {
          array[idx] += 2;
          start -= 2;
          idx++;
        } else {
          array[idx] += 1;
          start -= 1;
          idx++;
        }
      }

      realOrder[key] = [...array].sort();
    }

    for (let i = 1; i < count + 1; i++) {
      for (let key in leafOrder) {
        if (leafOrder[key].includes(i)) {
          answer.push(realOrder[key].shift());
        }
      }
    }

    return answer;
  } else {
    return [-1];
  }
}

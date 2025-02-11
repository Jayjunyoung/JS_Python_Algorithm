function solution(points, routes) {
  let visited = new Map();

  // 특정 위치와 시간에서 로봇이 있었는지 기록
  const isCrushed = (sr, sc, cnt) => {
    const locKey = `${sr},${sc},${cnt}`;
    if (visited.has(locKey)) {
      visited.set(locKey, visited.get(locKey) + 1);
    } else {
      visited.set(locKey, 1);
    }
  };

  // 로봇 이동 처리 함수
  const moveFC = (sr, sc, er, ec, tmp, same) => {
    let cnt = tmp;
    if (!same) {
      isCrushed(sr, sc, cnt);
    }

    // 행(row) 이동
    if (sr < er) {
      while (sr < er) {
        cnt++;
        sr++;
        isCrushed(sr, sc, cnt);
      }
    } else {
      while (sr > er) {
        cnt++;
        sr--;
        isCrushed(sr, sc, cnt);
      }
    }

    // 열(column) 이동
    if (sc < ec) {
      while (sc < ec) {
        cnt++;
        sc++;
        isCrushed(sr, sc, cnt);
      }
    } else {
      while (sc > ec) {
        cnt++;
        sc--;
        isCrushed(sr, sc, cnt);
      }
    }

    return cnt;
  };

  // 모든 로봇 경로 처리
  const lenR = routes[0].length;
  for (const route of routes) {
    let same = false;
    let count = 0;

    for (let i = 1; i < lenR; i++) {
      const start = route[i - 1];
      const end = route[i];
      const [sr, sc] = points[start - 1];
      const [er, ec] = points[end - 1];

      count = moveFC(sr, sc, er, ec, count, same);
      same = true;
    }
  }

  // 충돌 개수 계산
  let answer = 0;
  for (const [key, value] of visited) {
    if (value > 1) {
      answer++;
    }
  }

  return answer;
}

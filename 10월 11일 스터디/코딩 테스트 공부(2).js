let targetAlp = 0;
let targetCop = 0;
let visit = []; // visit[alp][cop]

function solution(alp, cop, problems) {
  // const [alp_req, cop_req, alp_rwd, cop_rwd, cost] = problems[i]
  let answer = 0;
  // 단순히 i+1번째 문제를 풀기 위해 i+1번째 문제의 목표치를 target으로 잡는 게 아니라
  // 전체 모든 문제를 풀기 위해 모든 문제들 중에서 가장 최대값을 각각 target으로 잡아야 한다.
  // 그리디로 접근하면 전체 문제 풀이의 최소 시간을 구할 수 없다.
  for (let i = 0; i < problems.length; ++i) {
    targetAlp = Math.max(targetAlp, problems[i][0]);
    targetCop = Math.max(targetCop, problems[i][1]);
  }
  // 0 <= alp_req, cop_req <= 150
  for (let i = 0; i < 151; ++i) {
    let temp = [];
    for (let j = 0; j < 151; ++j) {
      temp.push(Infinity);
    }
    visit.push(temp);
  }
  // 완전탐색이 필요한 문제.
  // 경우의 수를 찾아야 했는데,
  // (처음엔 조합인가? => 중복조합인가? => 부분집합인가? => 그게 아니라 특정 값을 만족하는 모든 경우의 수를 찾아야 하네? DFS구나)
  DFS(alp, cop, 0, problems);
  // 단계별로 접근하면 안 된다.
  // 전체 문제들의 최대 필요 알고력/코딩력을 위한 최소값이 각 배열에 저장되어 있다.
  answer = visit[targetAlp][targetCop];
  return answer;
}
// 최소값을 찾아야 하므로 max값으로 설정 후 업데이트
function DFS(a, c, cnt, problems) {
  // 알고력/코딩력이 최대치를 넘어가면 최대치로 고정 (그래야 더 시간을 쓰지 않으므로)
  if (targetAlp < a) a = targetAlp;
  if (targetCop < c) c = targetCop;

  if (visit[a][c] <= cnt) return;

  visit[a][c] = Math.min(visit[a][c], cnt);

  if (a === targetAlp && c === targetCop) return;

  for (let i = 0; i < problems.length; ++i) {
    if (a >= problems[i][0] && c >= problems[i][1]) {
      let nextAlp = a + problems[i][2];
      let nextCop = c + problems[i][3];
      // 문제를 직접 푸는 모든 경우의 수
      DFS(nextAlp, nextCop, cnt + problems[i][4], problems);
    }
  }
  // 시간으로 알고력/코딩력을 올리는 경우
  DFS(a + 1, c, cnt + 1, problems);
  DFS(a, c + 1, cnt + 1, problems);
}

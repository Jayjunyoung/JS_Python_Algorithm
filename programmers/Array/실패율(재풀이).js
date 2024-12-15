function solution(N, stages) {
  let answer = [];

  let challengers = new Array(N + 2).fill(0);

  for (let stage of stages) {
    challengers[stage]++;
  }

  let fail = {};
  let total = stages.length;

  for (let i = 1; i <= N; i++) {
    if (challengers[i] === 0) {
      fail[i] = 0;
    }

    fail[i] = challengers[i] / total;
    answer.push([i, fail[i]]);
    total -= challengers[i];
  }

  return answer.sort((a, b) => b[1] - a[1]).map((v) => v[0]);
}

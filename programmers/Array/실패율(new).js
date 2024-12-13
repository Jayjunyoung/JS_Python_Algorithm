function solution(N, stages) {
  let challengers = new Array(N + 2).fill(0);
  for (let stage of stages) {
    challengers[stage]++;
  }

  let fail = {};
  let total = stages.length;

  for (let i = 1; i <= N; i++) {
    if (challengers[i] === 0) {
      fail[i] = 0;
      continue;
    }

    fail[i] = challengers[i] / total;
    total -= challengers[i];
  }

  let result = Object.entries(fail).sort((a, b) => b[1] - a[1]);

  return result.map((v) => v[0]).map(Number);
}

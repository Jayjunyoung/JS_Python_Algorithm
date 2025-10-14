function Permutation(arr, choice) {
  let result = [];

  if (choice === 1) return arr.map((v) => [v]);

  arr.forEach((v, _i, arr) => {
    let fixed = v;
    let restArr = arr;
    let permutationArr = Permutation(restArr, choice - 1);
    const combineFix = permutationArr.map((v) => [fixed, ...v]);
    result.push(...combineFix);
  });

  return result;
}

function solution(users, emoticons) {
  const answer = [];
  const permutation = Permutation([10, 20, 30, 40], emoticons.length);

  permutation.forEach((combi, i) => {
    let service = 0; // 이모티콘 플러스 서비스 가입자
    const costs = Array(users.length).fill(0);
    // 각 사용자 별 이모티콘에 사용한 비용

    combi.forEach((c, ci) => {
      users.forEach((user, ui) => {
        if (user[0] <= c) costs[ui] += emoticons[ci] * ((100 - c) / 100);
      });
    });

    let sum = 0;

    for (let i = 0; i < costs.length; i++) {
      if (costs[i] < users[i][1]) {
        // 사용자가 구매한 값이 본인의 기준을 넘어가지 않으면
        // 구매 완료 -> 구매 금액 추가
        sum += costs[i];
      } else {
        // 사용자가 구매한 값이 본인의 기준 이상 넘어가면
        // 구매 취소 -> 서비스 가입
        service++;
      }
    }

    answer.push([service, sum]);
  });

  return answer.sort((a, b) => {
    if (a[0] > b[0]) return b[0] - a[0];
    else if (a[0] === b[0]) return b[1] - a[1];
  })[0];
}

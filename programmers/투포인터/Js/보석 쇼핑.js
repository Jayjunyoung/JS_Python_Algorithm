function solution(gems) {
  const cnt = new Set(gems).size;
  let ans = [1, gems.length];

  let l = 0;
  let r = 0;

  const gemsMap = new Map();
  gemsMap.set(gems[0], 1);

  while (r < gems.length) {
    if (gemsMap.size === cnt) {
      //길이가 짧으므로 갱신해주기
      if (ans[1] - ans[0] > r - l) {
        ans = [l + 1, r + 1];
      }

      gemsMap.set(gems[l], gemsMap.get(gems[l]) - 1);

      if (gemsMap.get(gems[l]) === 0) {
        gemsMap.delete(gems[l]);
      }
      l++;
    } else {
      r++;
      const right = gemsMap.get(gems[r]);
      //right에는 빈도수가 담겨있을 것
      gemsMap.set(gems[r], right ? right + 1 : 1);
    }
  }

  return ans;
}

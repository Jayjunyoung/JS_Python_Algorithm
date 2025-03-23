function solution(strs, t) {
  const n = t.length;
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;

  const sizes = new Set(strs.map((str) => str.length));

  for (let i = 1; i <= n; i++) {
    for (const size of sizes) {
      //부분 문자열을 추출하기 위해 인덱스가 0보다 크거나 같아야함
      if (i - size >= 0 && strs.includes(t.slice(i - size, i))) {
        dp[i] = Math.min(dp[i], dp[i - size] + 1);
      }
    }
  }
  return dp[n] === Infinity ? -1 : dp[n];
}

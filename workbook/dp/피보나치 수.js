function solution(n) {
  const fb = [0, 1];
  for (let i = 2; i <= n; i++) {
    fb[i] = fb[i - 1] + fb[i - 2];
  }

  return fb[n] % 1234567;
}

function solution(N, number) {
  let answer = 0;

  let use = Array.from({ length: 9 }, () => new Set());
  if (N === number) return 1;
  else {
    use.forEach((element, idx) => {
      if (idx !== 0) element.add(Number(String(N).repeat(idx)));
    });

    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j < i; j++) {
        for (let first of use[j]) {
          for (let second of use[i - j]) {
            use[i].add(first + second);
            use[i].add(first - second);
            use[i].add(first * second);
            use[i].add(first / second);
          }
        }
      }

      if (use[i].has(number)) return i;
    }
  }
  return -1;
}

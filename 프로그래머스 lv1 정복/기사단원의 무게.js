function getDivisorCount(n) {
  let count = 0;

  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      count++;
      if (n / i !== i) count++;
    }
  }

  return count;
}

function solution(number, limit, power) {
  let totalIronWeight = 0;

  for (let i = 1; i <= number; i++) {
    const divideNumber = getDivisorCount(i);

    totalIronWeight += divideNumber > limit ? power : divideNumber;
  }

  return totalIronWeight;
}

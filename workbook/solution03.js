function solution(numbers) {
  const n = numbers.length;
  let result = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let sum = numbers[i] + numbers[j];
      result.push(sum);
    }
  }

  return [...new Set(result)].sort((a, b) => a - b);
}

console.log(solution([5, 0, 2, 7]));
console.log(solution([2, 1, 3, 4, 1]));

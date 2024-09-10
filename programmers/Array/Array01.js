function solution(numbers) {
  //시간 복잡도 O(n^2) 이어도 만족
  let answer = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < i; j++) {
      answer.push(numbers[i] + numbers[j]);
    }
  }

  return [...new Set(answer)].sort((a, b) => a - b);
}

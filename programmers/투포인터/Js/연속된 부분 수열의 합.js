function solution(sequence, k) {
  let i = 0;
  let j = 0;
  let sum = 0;
  let sequenceLength = sequence.length;
  //기존 배열 범위를 0부터 4까지로 설정
  //만약 sequenceLength가 5인 경우
  let answer = [i, sequenceLength - 1];

  while (j < sequenceLength) {
    sum += sequence[j];

    while (sum > k && i < j) {
      sum -= sequence[i];
      i++;
    }

    if (sum === k) {
      if (answer === null || answer[1] - answer[0] > j - i) {
        answer = [i, j];
      }
    }

    j++;
  }

  return answer;
}

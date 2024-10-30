function solution(sequence, k) {
  let i = 0;
  let j = 0;
  let sum = 0;
  let sequenceLength = sequence.length;
  let answer = null;

  while (j < sequenceLength) {
    sum += sequence[j];

    //여기 수정해보자 -> while문 으로
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

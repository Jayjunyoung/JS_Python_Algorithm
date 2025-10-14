function solution(queue1, queue2) {
  let answer = 0;
  let queueSum1 = 0;
  let queueSum2 = 0;

  queue1.forEach((v) => (queueSum1 += v));
  queue2.forEach((v2) => (queueSum2 += v2));

  let queueIndex1 = 0;
  let queueIndex2 = 0;

  let totalLen = queue1.length + queue2.length;

  while (queueSum1 !== queueSum2) {
    if (queueSum1 > queueSum2) {
      queueSum1 -= queue1[queueIndex1];
      queue2.push(queue1[queueIndex1]);
      queueSum2 += queue1[queueIndex1++];
    } else {
      queueSum2 -= queue2[queueIndex2];
      queue1.push(queue2[queueIndex2]);
      queueSum1 += queue2[queueIndex2++];
    }

    answer++;

    if (queueIndex1 > totalLen || queueIndex2 > totalLen) return -1;
  }

  return answer;
}

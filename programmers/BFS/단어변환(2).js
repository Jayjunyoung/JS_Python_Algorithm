function solution(begin, target, words) {
  let answer = 0;
  let visited = [];
  let queue = [];

  if (!words.includes(target)) return 0;

  queue.push([begin, answer]);

  while (queue.length) {
    let [v, cnt] = queue.shift();

    if (v === target) {
      return cnt;
    }

    words.forEach((word) => {
      let notEqual = 0;

      //현재 진행 중인 word 건너띄고 다음 word로 진행
      if (visited.includes(word)) return;

      for (let i = 0; i < word.length; i++) {
        if (word[i] !== v[i]) notEqual++;
      }

      if (notEqual === 1) {
        queue.push([word, cnt + 1]);
        visited.push(word);
      }
    });
  }

  return answer;
}

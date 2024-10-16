function solution(begin, target, words) {
  let answer = 0;
  let visited = [];
  let queue = [];

  if (!words.includes(target)) return 0;

  queue.push([begin, answer]);

  while (queue.length) {
    let [v, cnt] = queue.shift();

    if (v === target) {
      //꺼낸값의 v가 맞으면 cnt는 횟수 이므로 cnt를 return한다.
      return cnt;
    }

    words.forEach((word) => {
      let notEqual = 0;

      if (visited.includes(word)) return;

      for (let i = 0; i < word.length; i++) {
        if (word[i] !== v[i]) notEqual++;
      }

      if (notEqual === 1) {
        queue.push([word, ++cnt]);
        visited.push(word);
      }
    });
  }

  return answer;
}

function solution(s) {
  let answer = 0;
  //회전하더라도 올바른 괄호 문자열 못 만드는 경우는 0을 출력
  let isCorrect = false;
  let stack = [];

  //주어진 문자열이 홀수인 경우에는 0으로 return
  if (s.length % 2 === 1) return 0;

  for (let i = 0; i < s.length; i++) {
    let str = s.slice(i) + s.slice(0, i);
    isCorrect = true;

    for (let n of str) {
      if (n === "[" || n === "{" || n === "(") {
        stack.push(n);
      } else {
        let opening = stack.pop();
        if (opening === "{" && n === "}") continue;
        if (opening === "[" && n === "]") continue;
        if (opening === "(" && n === ")") continue;

        isCorrect = false;
        break;
      }
    }

    //str이 올바른 괄호 문자열인지 확인 후 answer 증가
    if (isCorrect) answer++;
  }

  return answer;
}

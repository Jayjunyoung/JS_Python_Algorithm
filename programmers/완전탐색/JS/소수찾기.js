function solution(numbers) {
  return [...new Set(getPer(numbers))].filter((v) => isPrime(v)).length;
}

const getPer = (str) => {
  //str을 기반으로 배열을 만들어라
  const answer = [];
  const n = str.length; //반복문 용도
  const ch = Array.from({ length: n }, () => 0);
  const dfs = (curStr) => {
    //백트래킹 사용
    answer.push(+curStr);
    for (let i = 0; i < n; i++) {
      if (ch[i] === 0) {
        ch[i] = 1;
        dfs(curStr + str[i]);
        ch[i] = 0;
      }
    }
  };

  dfs("");
  answer.shift(); //0은 의미가 없기 때문에 지워버리기
  return answer;
};

//소수 판별하는 함수
const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};
